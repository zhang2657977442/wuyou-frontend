<template>
	<view class="chatInterface">
		<!-- <view class="top" id="top"> -->
		<!-- <view class="navbar" :style="{ height: totalHeight + 'px' }">
			<view class="nabar-body" :style="{ 'margin-top': statusBarHeight + 'px' }">
				<text class="yzb yzb-return"></text>
				<view class="name">
					<text>测试</text>
					<text></text>
				</view>
			</view>
		</view> -->
		<uni-grid ref="grid" v-if="userInfo.memberRole != 1" class="grid" :column="3" :show-border="false" :square="false">
			<uni-grid-item v-for="(item, index) in topList" :index="index" :key="index" @click.native="tapGrid(item)">
				<view class="grid-item-box">
					<text class="yzb" :class="item.icon" :style="{ color: item.color }"></text>
					<text class="text">{{ item.text }}</text>
					<view v-if="item.badge" class="grid-dot"><uni-badge :text="item.badge" :type="item.type" /></view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<!-- </view> -->
		<view class="scroll-view" :class="userInfo.memberRole != 1 ? 'scroll-top' : ''">
			<view class="all-history-loaded">{{ allHistoryLoaded ? '已经没有更多的历史消息' : '下拉获取历史消息' }}</view>
			<!--已经收到的消息-->
			<view v-for="(message, index) in messages" :key="message.messageId">
				<template>
					<!--时间显示，类似于微信，隔5分钟不发言，才显示时间-->
					<view class="time-lag">{{ renderMessageDate(message, index) }}</view>
					<view class="message-item" :class="{ self: message.senderId == (userInfo && userInfo.memberSn) }">
						<view class="avatar" v-if="message.senderId != (userInfo && userInfo.memberSn)"><image :src="friend.avatar"></image></view>
						<view class="avatar" v-else><image :src="userInfo.avatar"></image></view>
						<view class="contents">
							<b class="pending" v-if="message.status == 'sending'"></b>
							<b class="send-fail" v-if="message.status == 'fail'"></b>
							<view v-if="message.type == 'text'" v-html="renderTextMessage(message)"></view>
							<image
								class="image-content"
								v-if="message.type == 'image'"
								:src="message.payload.url"
								:data-url="message.payload.url"
								@click="showImageFullScreen"
								mode="widthFix"
							></image>
							<view class="video-snapshot" v-if="message.type == 'video'" :data-url="message.payload.video.url" @click="playVideo">
								<image :src="message.payload.thumbnail.url" mode="aspectFit"></image>
								<view class="video-play-icon"></view>
							</view>
							<GoEasyAudioPlayer v-if="message.type == 'audio'" :src="message.payload.url" :duration="message.payload.duration" />
							<view class="custom-message" v-if="message.type == 'order'">
								<view class="title">
									<image src="/static/images/dingdan.png"></image>
									<text>自定义消息</text>
								</view>
								<view class="custom-message-item">编号：{{ message.payload.number }}</view>
								<view class="custom-message-item">商品: {{ message.payload.goods }}</view>
								<view class="custom-message-item">金额: {{ message.payload.price }}</view>
							</view>
							<view class="resume-message" v-if="message.type == 'resume'">
								<!-- 附件简历 -->
								<view class="resume" @click="toDetail(message)">
									<text v-if="message.payload.type == 'pdf'" class="yzb yzb-pdf resume-left"></text>
									<text v-else-if="message.payload.type == 'xls'" class="yzb yzb-excel resume-left"></text>
									<text v-else-if="message.payload.type == 'xlsx'" class="yzb yzb-excel resume-left"></text>
									<text v-else-if="message.payload.type == 'word'" class="yzb yzb-word resume-left"></text>
									<text v-else-if="message.payload.type == 'ppt'" class="yzb yzb-ppt resume-left"></text>
									<text v-else class="yzb yzb-pdf resume-left"></text>
									<view class="resume-right">
										<text class="resume-title ellipsis-oneline">{{ message.payload.name }}</text>
										<text class="resume-note">点击可预览简历内容，可下载等</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="action-box" v-if="!video.visible">
			<view class="action-top">
				<view :class="[audio.visible ? 'record-icon record-open' : 'record-icon']" @click.stop="switchAudioKeyboard"></view>
				<view class="record-input" @touchstart="onRecordStart" @touchend="onRecordEnd" v-if="audio.visible">{{ audio.recording ? '松开发送' : '按住录音' }}</view>
				<view class="message-input" v-else>
					<!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
					<input type="text" maxlength="700" placeholder="发送消息" v-model="content" @focus="messageInputFocusin" />
				</view>
				<view class="file-icon emoji-icon" @click.stop="showEmoji"></view>
				<view class="file-icon more-icon" @click.stop="showMore"></view>
				<span class="send-message-btn" @click.stop="sendTextMessage">发送</span>
			</view>
			<!--展示表情列表-->
			<view class="action-bottom" v-if="emoji.show" style="flex-wrap: wrap">
				<image class="emoji-item" v-for="(emojiItem, emojiKey, index) in emoji.map" :key="index" :src="emoji.url + emojiItem" @click.stop="selectEmoji(emojiKey)"></image>
			</view>
			<!--更多-->
			<view class="action-bottom" v-if="more.show">
				<view class="more-item" @click.stop="sendImage">
					<image src="/static/images/tupian.png"></image>
					<text>图片</text>
				</view>
				<view class="more-item" @click.stop="sendVideo">
					<image src="/static/images/shipin.png"></image>
					<text>视频</text>
				</view>
				<!-- <view class="more-item" @click.stop="showCustomMessageForm">
					<image src="/static/images/zidingyi.png"></image>
					<text>自定义消息</text>
				</view> -->
			</view>
		</view>
		<view class="record-loading" v-if="audio.recording"></view>
		<video v-if="video.visible" :src="video.url" id="videoPlayer" @fullscreenchange="onVideoFullScreenChange"></video>

		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="pop-content">
				<view class="pop-top">
					<text class="pop-title">简历选择</text>
					<text class="yzb yzb-shanchu" @click="closePop"></text>
				</view>
				<uni-list>
					<uni-list-item
						:title="item.fileName + '.' + item.fileExt"
						:note="formatNote(item)"
						v-for="(item, index) in resumeFileList"
						:key="index"
						@click.native="selectResume(item)"
					></uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import GoEasyAudioPlayer from '@/components/GoEasyAudioPlayer/GoEasyAudioPlayer';
import EmojiDecoder from '@/lib/EmojiDecoder';
import IMService from '@/lib/imservice';
const recorderManager = uni.getRecorderManager();
export default {
	name: 'privateChat',
	components: {
		GoEasyAudioPlayer
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		let emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
		let emojiMap = {
			'[么么哒]': 'emoji_3@2x.png',
			'[乒乓]': 'emoji_4@2x.png',
			// '[便便]': 'emoji_5@2x.png',
			'[信封]': 'emoji_6@2x.png',
			'[偷笑]': 'emoji_7@2x.png',
			// '[傲慢]': 'emoji_8@2x.png',
			'[拜拜]': 'emoji_9@2x.png',
			'[流汗]': 'emoji_10@2x.png',
			'[花谢了]': 'emoji_11@2x.png',
			// '[过来啊]': 'emoji_14@2x.png',
			// '[流鼻涕]': 'emoji_15@2x.png',
			// '[发抖]': 'emoji_16@2x.png',
			'[可怜]': 'emoji_17@2x.png',
			'[愉快]': 'emoji_18@2x.png',
			'[右哼哼]': 'emoji_19@2x.png'
			// '[吐]': 'emoji_22@2x.png'
		};
		return {
			//聊天文本框
			content: '',
			friend: null,
			//已经接收到的消息
			messages: [],
			allMessages: [{}],
			//已经加载完所有历史消息
			allHistoryLoaded: false,

			//定义表情列表
			emoji: {
				url: emojiUrl,
				map: emojiMap,
				show: false,
				decoder: new EmojiDecoder(emojiUrl, emojiMap)
			},
			more: {
				//更多按钮
				show: false
			},
			audio: {
				//语音录音中
				recording: false,
				//录音按钮展示
				visible: false
			},
			video: {
				visible: false,
				url: '',
				context: null
			},
			positionId: '', //岗位ID
			companyId: '', //公司ID
			memberId: '', //求职者ID
			comMemberId: '', //招聘者ID
			comMemberPhone: '', //招聘者电话
			isCommunicated: false, //是否已有沟通记录
			topList: [
				{
					icon: 'yzb-toudijianli',
					text: '发简历',
					type: '1',
					color: '#333'
				},
				{
					icon: 'yzb-shouji',
					text: '打电话',
					type: '2',
					color: '#333'
				},
				{
					icon: 'yzb-buganxingqu',
					text: '不感兴趣',
					type: '3',
					color: '#ff201f'
				}
			],
			statusBarHeight: 0,
			navigatorHeight: 0,
			menu: {},
			totalHeight: 0,
			doubleSend: false, //是否双向发送消息

			resumeFileList: [{}, {}]
		};
	},
	created() {
		this.system = uni.getSystemInfoSync();
		this.menu = uni.getMenuButtonBoundingClientRect();
		this.statusBarHeight = this.system.statusBarHeight; //状态栏高度
		this.navigatorHeight = (this.menu.top - this.system.statusBarHeight) * 2 + this.menu.height; //导航栏高度
		this.totalHeight = this.statusBarHeight + this.navigatorHeight; //总高度
	},

	onReady() {
		this.video.context = uni.createVideoContext('videoPlayer', this);
		uni.setNavigationBarTitle({
			title: this.friend.name
		});
	},
	onShow() {
		this.more.show = false;
		this.emoji.show = false;
	},

	onLoad(options) {
		if (this.hasLogin) {
			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy);
				getApp().globalData.imService.connect(this.userInfo);
			}
		}
		console.log('options===', options);
		if (options.positionId) {
			//用户端传
			this.positionId = options.positionId;
		}
		if (options.companyId) {
			//用户端传
			this.companyId = options.companyId;
		}
		if (options.resumeId) {
			//企业端传
			this.positionId = options.resumeId;
		}
		let imService = getApp().globalData.imService;
		//聊天对象
		let friendId = options.id;
		//企业
		if (this.userInfo.memberRole == 1) {
			this.comMemberId = this.userInfo.memberSn;
			this.memberId = friendId;
			this.companyId = this.userInfo.companyId;
		} else {
			this.comMemberId = friendId;
			this.memberId = this.userInfo.memberSn;
		}
		this.getComMemberInfo();
		//从服务器获取最新的好友信息
		// this.friend = imService.findFriendById(friendId);
		this.friend = {
			id: friendId,
			avatar: options.avatar,
			name: options.name
		};
		console.log('onLoad friend - ', this.friend);
		this.messages = imService.getPrivateMessages(friendId);
		console.log('消息记录==', this.messages);
		this.judgeHistory();
		this.allMessages.push(this.messages);
		//监听新消息
		imService.onNewPrivateMessageReceive = (friendId, message) => {
			if (friendId === this.friend.id) {
				//聊天时，收到消息标记为已读
				this.markPrivateMessageAsRead(friendId);
				//收到新消息，是滚动到最底部
				this.scrollToBottom();
				this.judgeHistory();
			}
		};
		//每次进入聊天页面，总是滚动到底部
		this.scrollToBottom();
		// 录音监听器
		this.initRecorderListeners();
		//收到的消息设置为已读
		if (this.messages.length !== 0) {
			this.markPrivateMessageAsRead(friendId);
		}
		this.loadMoreHistoryMessage();
		this.getCommunicated();
	},
	onPullDownRefresh(e) {
		this.loadMoreHistoryMessage();
	},
	onUnload() {
		//退出聊天页面之前，清空页面传入的监听器
		let imService = getApp().globalData.imService;
		if (imService) {
			imService.onNewPrivateMessageReceive = (friendId, message) => {};
		}
		console.log('----onUnload---');
		this.$mUtils.stopAudioPlay();
	},
	methods: {
		//查询招聘者电话
		async getComMemberInfo() {
			let param = {
				memberSn: this.comMemberId
			};
			let res = await this.$apis.getMemberBySn(param);
			this.comMemberPhone = res.phone;
			if(this.companyId){
				this.companyId=res.companyId;
			}
			console.log('companyId===', this.companyId);
			console.log('comMemberPhone===', this.comMemberPhone);
		},

		async getCommunicated() {
			let param = {
				memberId: this.memberId,
				comMemberId: this.comMemberId,
				companyId: this.companyId
				
			};
			let res = await this.$apis.getCommDetail(param);
			console.log('getCommunicated====', res);
			if (res.data) {
				this.isCommunicated = true;
			} else {
				this.isCommunicated = false;
			}
			console.log('是否已沟通：', this.isCommunicated);
		},

		/**
		 * 添加沟通记录，第一次发送成功触发
		 */
		async addCommu() {
			console.log('-----addCommu-----');
			if (this.isCommunicated == false) {
				let param = {
					memberId: this.memberId,
					comMemberId: this.comMemberId,
					positionId: this.positionId,
					companyId: this.companyId
				};
				let res = await this.$apis.updateComm(param);
				console.log('addCommu', res);
				this.getCommunicated();
			}
		},

		//渲染文本消息，如果包含表情，替换为图片
		//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
		renderTextMessage(message) {
			// console.log('message==', message);
			if (message.senderId == (this.userInfo && this.userInfo.memberSn)) {
				return '<span class="text-content-self">' + this.emoji.decoder.decode(message.payload.text) + '</span>';
			}
			return '<span class="text-content">' + this.emoji.decoder.decode(message.payload.text) + '</span>';
		},
		//像微信那样显示时间，如果有几分钟没发消息了，才显示时间
		//todo:本不需要该方法，可以在标签里完成，但小程序有兼容性问题，被迫这样实现
		renderMessageDate(message, index) {
			if (index === 0) {
				return this.formatDate(message.timestamp);
			} else {
				if (message.timestamp - this.messages[index - 1].timestamp > 5 * 60 * 1000) {
					return this.formatDate(message.timestamp);
				}
			}
			return '';
		},
		initRecorderListeners() {
			// 监听录音开始
			recorderManager.onStart(() => {
				this.audio.recording = true;
			});
			//录音结束后，发送
			recorderManager.onStop(res => {
				this.audio.recording = false;
				let audioMessage = this.goEasy.im.createAudioMessage({
					to: {
						id: this.friend.id,
						type: this.GoEasy.IM_SCENE.PRIVATE,
						data: {
							name: this.friend.name,
							avatar: this.friend.avatar
						}
					},
					file: res,
					onProgress: function(progress) {
						console.log(progress);
					},
					notification: {
						title: this.userInfo.name + '发来一段语音',
						body: '[语音消息]' // 字段最长 50 字符
					}
				});
				this.sendMessage(audioMessage);
			});
			// 监听录音报错
			recorderManager.onError(function(res) {
				console.log('录音报错：', res);
			});
		},
		sendMessage(message) {
			let _self = this;
			let toId = message.receiverId;
			let imService = getApp().globalData.imService;
			let localHistory = imService.getPrivateMessages(toId);
			localHistory.push(message);
			this.goEasy.im.sendMessage({
				message: message,
				onSuccess: function(message) {
					console.log('发送成功.', message);
					//此时添加沟通记录
					_self.addCommu();
				},
				onFailed: function(error) {
					console.log('发送失败:', error);
				}
			});
		},
		sendTextMessage() {
			//发送消息
			if (this.content.trim() !== '') {
				let body = this.content;
				if (this.content.length >= 50) {
					body = this.content.substring(0, 30) + '...';
				}
				let textMessage = this.goEasy.im.createTextMessage({
					text: this.content,
					to: {
						id: this.friend.id,
						type: this.GoEasy.IM_SCENE.PRIVATE,
						data: {
							name: this.friend.name,
							avatar: this.friend.avatar
						}
					},
					notification: {
						title: this.userInfo.name + '发来一段文字',
						body: body
					}
				});
				this.sendMessage(textMessage);
			}
			this.scrollToBottom();
			this.content = '';
		},

		loadMoreHistoryMessage() {
			//历史消息
			let self = this;
			let lastMessageTimeStamp = Date.now();
			let lastMessage = this.messages[0];
			if (lastMessage) {
				lastMessageTimeStamp = lastMessage.timestamp;
			}
			let currentLength = this.messages.length;
			this.goEasy.im.history({
				userId: self.friend.id,
				lastTimestamp: lastMessageTimeStamp,
				onSuccess: function(result) {
					//获取本地记录
					let imService = getApp().globalData.imService;
					let localHistory = imService.getPrivateMessages(self.friend.id);
					//添加加载的记录到本地记录尾部
					let messages = result.content;
					for (let i = messages.length - 1; i >= 0; i--) {
						localHistory.unshift(messages[i]);
					}
					if (localHistory.length === currentLength) {
						self.allHistoryLoaded = true;
					}
					self.messages = localHistory;
					uni.stopPullDownRefresh();
				},
				onFailed: function(error) {
					//获取失败
					if (error.code === 401) {
						console.log('获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通');
					} else {
						console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
					}
					uni.stopPullDownRefresh();
				}
			});
		},
		//语音录制按钮和键盘输入的切换
		switchAudioKeyboard() {
			this.audio.visible = !this.audio.visible;
			if (uni.authorize) {
				uni.authorize({
					scope: 'scope.record'
				});
			}
		},
		onRecordStart() {
			try {
				recorderManager.start();
			} catch (e) {
				uni.showModal({
					title: '录音错误',
					content: '请在app和小程序端体验录音，Uni官方明确H5不支持getRecorderManager, 详情查看Uni官方文档'
				});
			}
		},
		onRecordEnd() {
			try {
				recorderManager.stop();
			} catch (e) {
				console.log(e);
			}
		},
		sendVideo() {
			//发送文件
			uni.chooseVideo({
				success: res => {
					let videoMessage = this.goEasy.im.createVideoMessage({
						to: {
							id: this.friend.id,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.friend.name,
								avatar: this.friend.avatar
							}
						},
						file: res,
						onProgress: function(progress) {
							console.log(progress);
						},
						notification: {
							title: this.userInfo.name + '发来一个视频',
							body: '[视频消息]' // 字段最长 50 字符
						}
					});
					this.sendMessage(videoMessage);
				}
			});
		},

		sendImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					console.log('chooseImage==', res);
					let imageMessage = this.goEasy.im.createImageMessage({
						to: {
							id: this.friend.id,
							type: this.GoEasy.IM_SCENE.PRIVATE,
							data: {
								name: this.friend.name,
								avatar: this.friend.avatar
							}
						},
						file: res.tempFiles[0],
						onProgress: function(progress) {
							console.log(progress);
						},
						notification: {
							title: this.userInfo.name + '发来一张图片',
							body: '[图片消息]' // 字段最长 50 字符
						}
					});
					console.log('imageMessage===', imageMessage);
					this.sendMessage(imageMessage);
				}
			});
		},

		showImageFullScreen(e) {
			var imagesUrl = [e.currentTarget.dataset.url];
			uni.previewImage({
				urls: imagesUrl
			});
		},
		playVideo(e) {
			this.video.visible = true;
			this.video.url = e.currentTarget.dataset.url;
			this.$nextTick(() => {
				this.video.context.requestFullScreen({
					direction: 0
				});
				this.video.context.play();
			});
		},
		onVideoFullScreenChange(e) {
			//当退出全屏播放时，隐藏播放器
			if (this.video.visible && !e.detail.fullScreen) {
				this.video.visible = false;
				this.video.context.stop();
			}
		},
		messageInputFocusin() {
			this.more.show = false;
			this.emoji.show = false;
		},
		showEmoji() {
			this.emoji.show = !this.emoji.show;
			this.more.show = false;
		},
		showMore() {
			this.more.show = !this.more.show;
			this.emoji.show = false;
		},
		selectEmoji(emojiKey) {
			this.content += emojiKey;
		},
		showCustomMessageForm() {
			let to = {
				id: this.friend.id,
				name: this.friend.name,
				avatar: this.friend.avatar,
				type: this.GoEasy.IM_SCENE.PRIVATE
			};
			uni.navigateTo({
				url: '../customMessage/customMessage?to=' + JSON.stringify(to)
			});
		},
		scrollToBottom() {
			this.$nextTick(function() {
				uni.pageScrollTo({
					scrollTop: 2000000,
					duration: 10
				});
			});
		},
		markPrivateMessageAsRead(friendId) {
			this.goEasy.im.markPrivateMessageAsRead({
				userId: friendId,
				onSuccess: function() {
					console.log('标记为已读成功');
				},
				onFailed: function(error) {
					console.log(error);
				}
			});
		},

		judgeHistory() {
			//判断是否有对话
			if(this.doubleSend){
				console.log('doubleSend===', this.doubleSend);
				return;
			}
			let a = false,
				b = false;
			this.messages.forEach(item => {
				if (item.senderId == this.memberId) {
					a = true;
				} else if (item.senderId == this.comMemberId) {
					b = true;
				}
			});
			if (a && b) {
				this.doubleSend = true;
			} else {
				this.doubleSend = false;
			}
			console.log('是否双向对话', this.doubleSend);
		},

		tapGrid(item) {
			console.log(item);
			if (item.type == 1) {
				//发简历
				if (this.doubleSend == false) {
					uni.showToast({
						icon: 'none',
						title: '双方对话后才能发送简历'
					});
				} else {
					this.sendResume();
				}
			} else if (item.type == 2) {
				//打电话
				if (this.doubleSend == false) {
					uni.showToast({
						icon: 'none',
						title: '双方对话后才能拨打电话'
					});
				} else {
					this.callPhone();
				}
			} else if (item.type == 3) {
				//不感兴趣
				this.unlike();
			}
		},

		//发送简历
		async sendResume() {
			let res = await this.$apis.getResumeFileList();
			this.resumeFileList = res;
			this.$refs.popup.open('bottom');
		},
		
		selectResume(item){
			console.log(item);
			this.closePop();
			this.sendResumeMessage(item);
		},

		sendResumeMessage(resumeFileInfo) {
			//发送消息
			let resumeMessage = this.goEasy.im.createTextMessage({
				text: '简历附件',
				to: {
					id: this.friend.id,
					type: this.GoEasy.IM_SCENE.PRIVATE,
					data: {
						name: this.friend.name,
						avatar: this.friend.avatar
					}
				},
				notification: {
					title: this.userInfo.name + '发来一份简历',
					body:  '[附件简历]'
				}
			});
			resumeMessage.type = 'resume';
			let payload = {
				fileExt: resumeFileInfo.fileExt,
				name: resumeFileInfo.fileName,
				size: resumeFileInfo.size,
				url: resumeFileInfo.fileUrl
			};
			resumeMessage.payload = payload;
			console.log('resumeMessage===', resumeMessage);
			this.sendMessage(resumeMessage);
			this.scrollToBottom();
			this.content = '';
		},
		formatNote(item) {
			return item.fileSize + '  ' + item.createTime + '上传';
		},
		
		toDetail(item) {
			console.log(item);
			wx.downloadFile({
				url: item.payload.url,
				// url:'https://qingkonglan.oss-cn-hangzhou.aliyuncs.com/wp/20220528/05fa11c511d74c78a5e31addd18fdfd3.pdf',
				success: function(res) {
					console.log(res);
					const filePath = res.tempFilePath;
					console.log(filePath);
					wx.openDocument({
						filePath: filePath,
						showMenu:true,
						success: function(res) {
							console.log('打开文档成功');
						}
					});
				}
			});
		},
		change(e) {
			console.log('当前模式：' + e.type + ',状态：' + e.show);
		},
		
		closePop() {
			this.$refs.popup.close();
		},
		callPhone() {
			console.log('comMemberPhone==', this.comMemberPhone);
			uni.makePhoneCall({
				phoneNumber: this.comMemberPhone
			});
		},

		unlike() {
			uni.showModal({
				title: '提示',
				content: '设置后将不会推荐该公司职位等信息，确定操作？',
				success: res => {
					if (res.confirm) {
						console.log("companyId==",this.companyId);
						let param = {
							type: 1,
							companyId: this.companyId
						};
						this.$apis.updateShield(param).then(() => {
							uni.showToast({
								title: '操作成功'
							});
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import url('../../static/style/chatInterface.css');

.chatInterface {
	height: 100vh;
}

.navbar {
	position: fixed;
	top: 0;
	width: 100%;
	background-color: #fff;
	z-index: 99;
	align-items: center;
	display: flex;
	justify-content: center;
	text {
		color: #333;
		font-size: $font-base-more;
	}

	.nabar-body {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		.yzb-return {
			font-size: 40upx;
			padding: 0 20upx;
		}
		.name {
			position: relative;
		}
	}
}
.grid {
	background-color: $bgcolor_white;
	width: 100%;
	// box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
	z-index: 99;
	position: fixed;
	top: 0;
	.image {
		width: 80upx;
		height: 80upx;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 0 10upx 0;
	}

	.text {
		color: #333;
		size: 26upx;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
	.yzb {
		font-size: 40upx;
		color: $main-color;
		height: 65upx;
	}
}

.scroll-top {
	margin-top: 120upx;
}
.resume-message {
	max-width: 600upx;
	display: flex;
	flex-direction: column;
	// justify-content: space-around;
	// align-items: flex-start;
	box-sizing: border-box;
	padding: 10rpx 30rpx;
	border: 1px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
	border-radius: 20rpx;
	background-color: #fff;
}
.resume {
	display: flex;
	flex-direction: row;
	align-items: center;
	.resume-left {
		font-size: 80upx;
		color: #6ab493;
	}
	.resume-right {
		display: flex;
		flex-direction: column;
		margin-left: 20upx;
		.resume-title {
			font-size: $font-base-more;
			text-align: left;
		}
		.resume-note {
			font-size: $font-sm;
			color: $font-color-666;
			text-align: left;
		}
	}
}

.pop-content {
	.pop-top {
		width: 100%;
		position: relative;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 30upx 0;
		background-color: $border-color-light;
		.pop-title {
			margin: 0;
			font-size: 34upx;
		}
		.yzb-shanchu {
			position: absolute;
			right: 20upx;
			font-size: 36upx;
			padding: 15upx;
		}
	}
}
</style>
