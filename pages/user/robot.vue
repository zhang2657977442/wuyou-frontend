<template>
	<view>
		<!-- 空盒子用来防止消息过少时 拉起键盘会遮盖消息 -->
		<view :animation="anData" style="height:0;"></view>
		<!-- 消息体 -->
		<scroll-view scroll-with-animation scroll-y="true" @touchmove="hideKey" style="width: 750rpx;" :style="{ height: srcollHeight }" :scroll-top="go">
			<!-- 用来获取消息体高度 -->
			<view id="okk" scroll-with-animation>
				<!-- 消息 -->
				<view class="flex-column-start" v-for="(x, i) in msgList" :key="i">
					<!-- 用户消息 头像可选加入-->
					<view v-if="x.my" class="flex justify-end padding-right one-show  align-start  padding-top">
						<!-- 	<image v-if="!x.my" class="chat-img" src="../../static/..." mode="aspectFill" ></image> -->
						<view class="flex justify-end" style="width: 400rpx;">
							<view class="margin-left padding-chat bg-cyan" style="border-radius: 35rpx;">
								<text style="word-break: break-all;">{{ x.msg }}</text>
							</view>
						</view>
						<!-- <image class="chat-img margin-left" src="../../static/..." mode="aspectFill" ></image> -->
					</view>
					<!-- 机器人消息 -->
					<view v-if="!x.my" class="flex-row-start margin-left margin-top one-show">
						<view class="chat-img flex-row-center"><image style="height: 75rpx;width: 75rpx;" src="../../../static/img/robt.png" mode="aspectFit"></image></view>
						<view class="flex" style="width: 500rpx;">
							<view class="margin-left padding-chat flex-column-start" style="border-radius: 35rpx;background-color: #f9f9f9;">
								<text style="word-break: break-all;">{{ x.msg }}</text>
								<!-- 消息模板 =>初次问候 -->
								<view class="flex-column-start" v-if="x.type == 1" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">您可以这样问我:</text>
									<text @click="answer(item)" style="margin-top: 10upx;" v-for="(item, index) in x.questionList" :key="index">{{ item.ask }}</text>
									<view class="flex-row-between  padding-top-sm" v-if="totalPage > 1">
										<text class="my-neirong-sm">没有您要的答案?</text>
										<text class="padding-left" style="color: #12ae85;" @click="switchAsks">换一批</text>
									</view>
								</view>
								<!-- 消息模板 =>多个答案 -->
								<view class="flex-column-start" v-if="x.type == 2" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">猜您想问:</text>
									<!-- 连接服务器应该用item.id -->
									<text @click="answer(item)" style="margin-top: 30rpx;" v-for="(item, index) in x.questionList" :key="index">{{ item.ask }}</text>
								</view>
								<!-- 消息模板 => 无法回答-->
								<!-- <view class="flex-column-start" v-if="x.type == 0">
									<text class="padding-top-sm" style="color: #2fa39b;">提交意见与反馈</text>
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">下面是一些常见问题,您可以点击对应的文字快速获取答案:</text>
									<text @click="answer(item)" style="margin-top: 30rpx;color: #2fa39b;" v-for="(item, index) in x.questionList" :key="index">{{ item.ask }}</text>
									<view class="flex-row-between  padding-top-sm" v-if="totalPage>1">
										<text class="my-neirong-sm">没有您要的答案?</text>
										<text class="padding-left" style="color: #1396c5;" @click="switchAsks">换一批</text>
									</view>
								</view> -->
							</view>
						</view>
					</view>
				</view>
				<!-- loading是显示 -->
				<view v-show="msgLoad" class="flex-row-start margin-left margin-top">
					<view class="chat-img flex-row-center"><image style="height: 75rpx;width: 75rpx;" src="../../../static/img/robt.png" mode="aspectFit"></image></view>
					<view class="flex" style="width: 500rpx;">
						<view class="margin-left padding-chat flex-column-start" style="border-radius: 35rpx;background-color: #f9f9f9;">
							<view class="cuIcon-loading turn-load" style="font-size: 35rpx;color: #3e9982;"></view>
						</view>
					</view>
				</view>
				<!-- 防止消息底部被遮 -->
				<view style="height: 120rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部导航栏 -->
		<view class="flex-column-center" style="position: fixed;bottom: -180px;" :animation="animationData">
			<view class="bottom-dh-char flex-row-around" style="font-size: 55rpx;">
				<text @click="contactUs" class="yzb yzb-jiaoseqiehuan"></text>
				<!-- vue无法使用软键盘"发送" -->
				<input
					v-model="msg"
					class="dh-input"
					type="text"
					style="background-color: #f0f0f0;"
					@confirm="sendMsg"
					confirm-type="search"
					placeholder-class="my-neirong-sm"
					placeholder="请用一句话描述您的问题"
				/>
				<view @click="sendMsg" class="cu-tag bg-cyan round">发送</view>
				<!-- <text @click="ckAdd" class="yzb yzb-jia"></text> -->
			</view>
			<!-- 附加栏(自定义) -->
			<view class="box-normal flex-row-around flex-wrap">
				<view class="tb-text">
					<view class="yzb yzb-yijianfankui"></view>
					<text>问题反馈</text>
				</view>
				<view class="tb-text">
					<view class="yzb yzb-kefuguanli"></view>
					<text>人工客服</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// rpx和px的比率
var l;
// 可用窗口高度
var wh;
// 顶部空盒子的高度
var mgUpHeight;

export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			msgLoad: false,
			anData: {},
			animationData: {},
			showTow: false,
			// 消息体,定义机器人初次的消息(或者自定义出现时机)
			// my->谁发的消息 msg->消息文本 type->客服消息模板类型 questionList->快速获取问题答案的问题列表
			msgList: [{ my: false, msg: '请问有什么问题可以帮助您?', type: 1, questionList: [] }],
			msg: '',
			go: 0,
			srcollHeight: 0,
			list: [],
			query: {
				page: 1,
				limit: 5,
				ifCommon: 1
			},
			query2: {
				page: 1,
				limit: 50
			},
			totalPage: 0,
			questionList: []
		};
	},

	onLoad() {
		this.initView();
		this.getChatAskList();
		this.getRobotLogList();
	},

	onPullDownRefresh() {
		console.log('onPullDownRefresh===');
		this.query2.page++;
		this.getRobotLogList();
	},

	methods: {
		/**
		 * 查询常见问题
		 */
		async getChatAskList() {
			let res = await this.$apis.getChatAskList(this.query);
			console.log('getChatAskList===', res);
			if (res.data.length > 0) {
				this.totalPage = Math.ceil(res.count / this.query.limit);
				this.questionList = res.data;
				this.msgList[0].questionList = res.data;
				this.$forceUpdate();
			}
		},

		async getRobotLogList() {
			if(!this.hasLogin){
				return;
			}
			let res = await this.$apis.getRobotLogList(this.query2);
			console.log('getRobotLogList===', res);
			if (res.data.length > 0) {
				let data = res.data;
				data = data.reverse();
				this.msgList = this.msgList.concat(data);
				// 保证消息可见
				this.msgGo();
				this.$forceUpdate();
			}
		},

		/**
		 * 添加聊天记录
		 */
		async addRobotLog(msg) {
			if(this.hasLogin){
				let res = await this.$apis.addRobotLog(msg);
				console.log('addRobotLog==', res);
			}
		},

		switchAsks() {
			if (this.query.page < this.totalPage) {
				this.query.page += 1;
			} else if (this.query.page == this.totalPage) {
				this.query.page = 1;
			}
			this.getChatAskList();
		},

		initView() {
			// 如果需要缓存消息缓存msgList即可
			// 监听键盘拉起
			// 因为无法控制键盘拉起的速度,所以这里尽量以慢速处理
			uni.onKeyboardHeightChange(res => {
				const query = uni.createSelectorQuery();
				query
					.select('#okk')
					.boundingClientRect(data => {
						// 若消息体没有超过2倍的键盘则向下移动差值,防止遮住消息体
						var up = res.height * 2 - data.height - l * 110;
						console.log(up);
						if (up > 0) {
							// 动态改变空盒子高度
							this.msgMove(up, 300);
							// 记录改变的值,若不收回键盘且发送了消息用来防止消息过多被遮盖
							mgUpHeight = up;
						}
						// 收回
						if (res.height == 0) {
							this.msgMove(0, 0);
						}
					})
					.exec();
			});
			var query = uni.getSystemInfoSync();

			l = query.screenWidth / 750;
			wh = query.windowHeight;
			this.srcollHeight = query.windowHeight + 'px';
		},

		// 切换输入法时移动输入框(按照官方的上推页面的原理应该会自动适应不同的键盘高度-->官方bug)
		goPag(kh) {
			this.upTowmn(0, 250);
			if (this.keyHeight != 0) {
				if (kh - this.keyHeight > 0) {
					this.upTowmn(this.keyHeight - kh, 250);
				}
			}
		},
		// 移动顶部的空盒子
		msgMove(x, t) {
			var animation = uni.createAnimation({
				duration: t,
				timingFunction: 'linear'
			});

			this.animation = animation;

			animation.height(x).step();

			this.anData = animation.export();
		},
		// 保持消息体可见
		msgGo() {
			const query = uni.createSelectorQuery();
			// 延时100ms保证是最新的高度
			setTimeout(() => {
				// 获取消息体高度
				query
					.select('#okk')
					.boundingClientRect(data => {
						// 如果超过scorll高度就滚动scorll
						if (data.height - wh > 0) {
							this.go = data.height - wh;
						}
						// 保证键盘第一次拉起时消息体能保持可见
						var moveY = wh - data.height;
						// 超出页面则缩回空盒子
						if (moveY - mgUpHeight < 0) {
							// 小于0则视为0
							if (moveY < 0) {
								this.msgMove(0, 200);
							} else {
								// 否则缩回盒子对应的高度
								this.msgMove(moveY, 200);
							}
						}
					})
					.exec();
			}, 100);
		},
		// 回答问题的业务逻辑
		answer(item) {
			console.log(item);
			let ask = {
				my: true,
				msg: item.ask,
				type: 3
			};
			this.msgList.push(ask);
			this.addRobotLog(ask);
			let reply = {
				my: false,
				msg: item.reply,
				type: 3
			};
			this.msgList.push(reply);
			this.addRobotLog(reply);
			// 保证消息可见
			this.msgGo();
		},
		sendMsg() {
			// 消息为空不做任何操作
			if (this.msg == '') {
				return 0;
			}
			// 显示消息 msg消息文本,my鉴别是谁发的消息(不能用俩个消息数组循环,否则消息不会穿插)
			this.msgList.push({ msg: this.msg, my: true });
			let ask = {
				my: true,
				msg: this.msg,
				type: 3
			};
			this.addRobotLog(ask);
			// 保证消息可见
			this.msgGo();
			// 回答问题
			this.msgKf(this.msg);
			// 清除消息
			this.msg = '';
		},
		async msgKf(x) {
			this.msgLoad = true;
			console.log(x);
			let res = await this.$apis.getChatReply({ ask: x });
			console.log('getChatReply===', res);
			if (res == true) {
				setTimeout(() => {
					// 取消loading
					this.msgLoad = false;
					this.msgList.push({
						my: false,
						msg: '我不懂您在说什么哦',
						type: 0,
						questionList: this.questionList
					});
					let reply = {
						my: false,
						msg: '我不懂您在说什么哦',
						type: 3
					};
					this.addRobotLog(reply);
					// this.msgList.push({ my: false, msg: '单消息模板', type: -1 });
					// this.msgList.push({
					// 	my: false,
					// 	msg: '根据您的问题,已为您匹配了下列问题(多个答案模板)',
					// 	type: 2,
					// 	questionList: ['如何注销用户', '我想了解业务流程', '手机号如何更换']
					// });
					this.msgGo();
				}, 1000);
			} else {
				this.msgLoad = false;
				this.msgList.push({
					my: false,
					msg: res.reply,
					type: 3
				});
			}
			// 保证消息可见
			this.msgGo();
		},
		// 不建议输入框聚焦时操作此动画
		ckAdd() {
			if (!this.showTow) {
				this.upTowmn(-180, 350);
			} else {
				this.upTowmn(0, 200);
			}
			this.showTow = !this.showTow;
		},

		contactUs() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.contactUs
			});
		},

		hideKey() {
			uni.hideKeyboard();
		},
		// 拉起/收回附加栏
		upTowmn(x, t) {
			var animation = uni.createAnimation({
				duration: t,
				timingFunction: 'ease'
			});

			this.animation = animation;

			animation.translateY(x).step();

			this.animationData = animation.export();
		}
	}
};
</script>

<style lang="scss">
/* @import "./main.css"; */

body {
	background-color: #f1f1f1;
	font-size: 28upx;
	color: #333333;
	font-family: Helvetica Neue, Helvetica, sans-serif;
}

.round {
	border-radius: 10upx;
	padding: 6upx 15upx;
}

.flex {
	display: flex;
}
.justify-end {
	justify-content: flex-end;
}
.align-start {
	align-items: flex-start;
}

.padding-top-sm {
	padding-top: 20upx;
}

.padding-top {
	padding-top: 20upx;
}

.padding-right {
	padding-right: 20upx;
}

.margin-left {
	margin-left: 20upx;
}

.margin-top {
	margin-top: 20upx;
}

.bg-cyan {
	background-color: $main-color;
	color: #ffffff;
}

.flex-column-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.flex-column-between {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.flex-column-start {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.flex-row-start {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.flex-row-around {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.flex-row-between {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.flex-row-center {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.flex-row-between {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.bottom-dh-char {
	background-color: #f9f9f9;
	/* width: 750rpx; */
	height: 110rpx;
	padding: 0 20upx;
	width: 100%;
	box-sizing: border-box;
}
.center-box {
	width: 720rpx;
	padding-left: 25rpx;
}

.my-neirong {
	font-size: 26rpx;
	color: #6d6d6d;
}
.my-neirong-sm {
	font-size: 23rpx;
	color: #838383;
}

.hui-box {
	width: 750rpx;
	height: 100%;
}
.dh-input {
	width: 76%;
	height: 65rpx;
	border-radius: 30rpx;
	padding-left: 15rpx;
	background-color: #ffffff;
	font-size: 30upx;
}
.box-normal {
	width: 750rpx;
	height: 180px;
	background-color: #ffffff;
}
.tb-text {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.tb-text view {
	font-size: 65rpx;
}
.tb-text text {
	font-size: 25rpx;
	color: #737373;
	margin-top: 10upx;
}
.chat-img {
	border-radius: 50%;
	width: 70rpx;
	height: 70rpx;
	background-color: #f7f7f7;
}

.padding-chat {
	padding: 17rpx 20rpx;
}
.tb-nv {
	width: 50rpx;
	height: 50rpx;
}
.yzb-jia {
	font-size: 50upx;
	text-align: center;
	color: #666;
}
.yzb-jiaoseqiehuan {
	font-size: 45upx;
	text-align: center;
	color: #f0ad4e;
}

.yzb-yijianfankui {
	color: #f0ad4e;
}
.yzb-kefuguanli {
	color: #f0ad4e;
}
</style>
