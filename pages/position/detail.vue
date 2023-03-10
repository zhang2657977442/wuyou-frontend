<template>
	<joy-page class="">
		<view class="body">
			<view class="top">
				<view class="space-between">
					<text class="post">{{ position.postName }}</text>
					<text class="salary">{{ position.salary }}</text>
				</view>
				<view class="require">
					<view class="item">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text>{{ position.expRequire }}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-xueli top-icon"></text>
						<text>{{ position.minEducation }}</text>
					</view>
				</view>
			</view>
			<view class="user space-between">
				<view class="left">
					<image
						style="width: 100upx;height: 100upx;"
						:src="position.userAvatar || '/static/img/head.png'"
					></image>
					<view class="info">
						<view class="name">
							<text class="user-name">{{ position.userName }}</text>
							<text class="last-status">刚刚活跃</text>
						</view>
						<text class="position">{{ position.companyName }}</text>
					</view>
				</view>
				<text class="yzb yzb-next icon-next"></text>
			</view>
			<view class="detail">
				<text class="title">职位要求</text>
				<text class="desc">{{ position.skill }}</text>
			</view>

			<view class="company">
				<view class="company-info space-between" @click="toCompany()">
					<view class="left">
						<image
							style="width: 100upx;height: 100upx;"
							:src="position.companyLogo || '/static/img/company.png'"
						></image>
						<view class="info">
							<view class="name">
								<text class="user-name">{{ position.companyName }}</text>
							</view>
							<text class="position">{{ position.industryName }} · {{ position.staffSize }}</text>
						</view>
					</view>
					<text class="yzb yzb-next icon-next"></text>
				</view>
				<view class="company-location">
					<map
						:latitude="latitude"
						:longitude="longitude"
						:markers="covers"
						style="width: 100%; height: 300px"
					></map>
				</view>
			</view>
			<view class="warn">
				<view class="top">
					<text class="yzb yzb-anquan icon-warn"></text>
					<text class="title">安全提示</text>
				</view>
				<view class="bottom">
					<text class="">该公司承诺名下所有职位不向您收费，如有不实，</text>
					<text class="report">请立即举报</text>
				</view>
			</view>
			<view class="others">
				<text class="title">该公司其他岗位</text>
				<m-position :positions="positionList" @click="positionDetail"></m-position>
				<view class="load-more-box">
					<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
					<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
					<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
					<uni-load-more
						v-if="status == '请求失败'"
						status="加载失败，点我重试"
						:showIcon="false"
						@click="reLoad"
					></uni-load-more>
				</view>
			</view>
			<view class="btn-row row">
				<button type="primary" class="btn-save width-55" @click="apply">
					<text class="yzb label-icon yzb-mianshiyaoqing"></text>
					{{ isApply ? '取消投递' : '投递简历' }}
				</button>
				<button class="btn-delete" @click="collect">
					<text class="yzb label-icon yzb-ziyuan141"></text>
					{{ isCollect ? '取消收藏' : '收藏' }}
				</button>
			</view>
		</view>
	</joy-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import { isApply } from '../../apis/index.js'
const QQMapWX = require('../../common/qqmap-wx-jssdk.min.js')
import IMService from '@/lib/imservice'

export default {
	components: { uniLoadMore },
	computed: {
		...mapState(['forcedLogin', 'userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			banner: [],
			grid: [],
			ka: [],
			adList: [],
			position: {},
			isCollect: false,
			isApply: false,
			query: {
				current: 1,
				pageSize: 10,
				id: null
			},
			params: {
				dataId: '',
				type: 0,
				userId: ''
			},
			positionList: [],
			status: '',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [],
			qqmapsdk: null
		}
	},
	async onLoad(query) {
		const data = decodeURIComponent(query.details)
		this.position = JSON.parse(data)
		this.qqmapsdk = new QQMapWX({
			key: 'H2RBZ-76OWD-BUO4P-PDBMT-TXUTS-PABLR'
		})
		this.query.id = this.position.companyId
		this.params.dataId = this.position.id
		this.params.userId = this.userInfo.id
		this.getLocation()
		this.getCompanyJob()
		this.checkApply()
		this.checkCollect()
		this.addBrowse()
		this.initGoeasy()
	},
	onReachBottom() {
		this.query.current++
		this.getCompanyJob()
	},
	methods: {
		async getLocation() {
			await this.qqmapsdk.geocoder({
				address: this.position.address,
				success: res => {
					const data = res.result.location
					this.latitude = data.lat
					this.longitude = data.lng
					this.covers.push({
						latitude: this.latitude,
						longitude: this.longitude
					})
				},
				fail: res => {
					console.log(res)
				}
			})
		},

		async getCompanyJob() {
			this.status = '请求中'
			let res = await this.$apis.getCompanyJob(this.query)
			if (res) {
				let data = res.list.filter(item => item.id !== this.position.id)
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',')
					}
				}
				this.positionList = this.positionList.concat(data || [])
				this.changeStatus(res)
			}
		},

		async collect() {
			if (!this.isCollect) {
				let res = await this.$apis.addCollect(this.params)
				this.isCollect = !this.isCollect
				if (res) {
					uni.showToast({
						title: '收藏成功',
						duration: 2000
					})
				}
			} else {
				let res = await this.$apis.deleteCollect(this.params)
				this.isCollect = !this.isCollect
				if (res) {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					})
				}
			}
		},

		async apply() {
			const that = this
			if (!this.isApply) {
				let res = await this.$apis.addApply(this.params)
				this.isApply = !this.isApply
				if (res) {
					uni.showToast({
						title: '投递成功',
						duration: 2000
					})
					// 发送消息
					const im = this.goEasy.im
					//创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
					const textMessage = im.createTextMessage({
						text: '您好Boss，我对此岗位有兴趣，可以具体了解一下吗？', //消息内容
						to: {
							type: this.GoEasy.IM_SCENE.PRIVATE, //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
							id: this.position.userId, //接收方用户id
							data: { avatar: this.position.userAvatar, nickname: this.position.username } //接收方用户扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
						}
					})

					//发送消息
					im.sendMessage({
						message: textMessage,
						onSuccess: function(message) {
							//发送成功
							console.log('Private message sent successfully.', message)
							that.toChat()
						},
						onFailed: function(error) {
							//发送失败
							console.log(
								'Failed to send private message，code:' + error.code + ' ,error ' + error.content
							)
						}
					})
				}
			} else {
				let res = await this.$apis.deleteApply(this.params)
				this.isApply = !this.isApply
				if (res) {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					})
				}
			}
		},

		async checkApply() {
			let res = await this.$apis.isApply(this.params)
			this.isApply = res
		},
		async checkCollect() {
			let res = await this.$apis.isCollect(this.params)
			this.isCollect = res
		},
		async addBrowse() {
			const params = {
				type: 0,
				dataId: this.position.companyId,
				userId: this.userInfo.id
			}
			let res = await this.$apis.addBrowse(params)
		},
		// 修改请求状态
		changeStatus(data) {
			if (this.positionList.length === 0) {
				this.status = '暂无数据'
			} else if (this.query.current >= Math.ceil(data.total / this.query.pageSize)) {
				this.status = '没有更多'
			} else {
				this.status = '请求更多'
			}
		},

		toCompany() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.companyDetail,
				query: {
					id: this.position.companyId,
					latitude: this.latitude,
					longitude: this.longitude
				}
			})
		},

		positionDetail(item) {
			this.$mRouter.redirectTo({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					details: encodeURIComponent(JSON.stringify(item))
				}
			})
		},
		toChat() {
			setTimeout(() => {
				this.$mRouter.push({
					route: this.$mRoutesConfig.privateChat,
					query: {
						id: this.position.userId,
						avatar: this.position.userAvatar,
						name: this.position.username
					}
				})
			}, 1000)
		},
		initGoeasy() {
			if (this.goEasy.getConnectionStatus() === 'disconnected') {
				getApp().globalData.imService = new IMService(this.goEasy, this.GoEasy)
				getApp().globalData.imService.connect(this.userInfo)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.center-align {
	display: flex;
	align-items: center;
}

.body {
	padding: 20upx;
	box-sizing: border-box;
	background-color: $bgcolor_white;
}

.top {
	padding: 30upx 0;
	.post {
		font-size: $font-size-40;
		font-weight: bold;
		color: $font-color-000;
	}
	.salary {
		font-size: $font-size-34;
		font-weight: bold;
		color: $main-color;
	}
	.require {
		display: flex;
		flex-direction: row;
		margin-top: 15upx;
		.item {
			margin-right: 30upx;
		}
		.top-icon {
			font-size: $font-lg;
			margin-right: 10upx;
		}
	}
}

.user {
	padding: 35upx 0;
	border-top: 1upx solid $border-color-base;
	border-bottom: 1upx solid $border-color-base;
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		.info {
			margin-left: 30upx;
			display: flex;
			flex-direction: column;
			.name {
				display: flex;
				align-items: baseline;
				.user-name {
					font-size: $uni-font-size-lg;
					font-weight: bold;
				}
				.last-status {
					margin-left: 10upx;
					font-size: $uni-font-size-sm;
					color: $font-color-999;
				}
			}
			.position {
				font-size: $uni-font-size-base;
				margin-top: 15upx;
				color: $font-color-666;
			}
		}
	}
	image {
		width: 80upx;
		height: 80upx;
	}
	.icon-next {
		color: $font-color-666;
		font-size: $uni-font-size-lg;
	}
}

.detail {
	display: flex;
	flex-direction: column;
	padding-bottom: 40upx;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 40upx 0;
	}
	.desc {
		line-height: 1.8;
	}
}

.company {
	display: flex;
	flex-direction: column;
	padding: 35upx 0;
	border-top: 1upx solid $border-color-base;
	border-bottom: 1upx solid $border-color-base;
	.company-info {
		padding: 0 0 35upx 0;
		// border-top: 1upx solid $border-color-base;
		// border-bottom: 1upx solid $border-color-base;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			.info {
				margin-left: 30upx;
				display: flex;
				flex-direction: column;
				.name {
					display: flex;
					align-items: baseline;
					.user-name {
						font-size: $uni-font-size-lg;
					}
					.last-status {
						margin-left: 10upx;
						font-size: $uni-font-size-sm;
						color: $font-color-999;
					}
				}
				.position {
					font-size: $uni-font-size-base;
					margin-top: 15upx;
					color: $font-color-666;
				}
			}
		}
		image {
			width: 120upx;
			height: 120upx;
		}
		.icon-next {
			color: $font-color-666;
			font-size: $uni-font-size-lg;
		}
	}
}

.warn {
	padding: 10upx 0 40upx 0;
	border-bottom: 1upx solid $border-color-base;
	.top {
		display: flex;
		flex-direction: row;
		align-items: center;
		.icon-warn {
			color: $main-color;
		}
		.title {
			margin-left: 10upx;
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
	}

	.bottom {
		font-size: $uni-font-size-base;
	}
	.report {
		color: $main-color;
	}
}

.others {
	display: flex;
	flex-direction: column;
	.title {
		font-size: $font-size-36;
		font-weight: bold;
		padding: 20upx;
	}
}
.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
		width: 30%;
	}

	.btn-save {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		margin-left: 0px;
	}
	.width-55 {
		width: 55%;
	}

	.width-90 {
		width: 90%;
	}
}
</style>
