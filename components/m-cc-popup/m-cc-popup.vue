<template>
	<view>
		<view :class="{'m-mask':true}" @click="hide" @touchmove.stop.prevent="moveHandle" v-show="showPopup"></view>

		<view class="" :class="['m-popup','m-popup-'+position,{'m-popup-show':showPopup}]" :style="{height: popupHeight}"
		 @touchmove.stop.prevent="moveHandle">

			<!-- 定义了titleText props属性 才显示header -->
			<view class="m-popup-header">
				<slot name="header">
					<view class="m-picker__hd" catchtouchmove="true" v-if="titleText">
						<view class="m-picker__action">
							<view v-if="cancelText" @click="clickCancel">{{cancelText}}</view>
						</view>
						<view class="m-picker__title">{{titleText}}</view>
						<view class="m-picker__action">
							<view @click="clickConfirm">
								<m-icon type="guanbi" size="40"></m-icon>
							</view>
						</view>
					</view>
				</slot>
			</view>

			<!-- 数据列表 超限自动滚动条 -->
			<scroll-view :scroll-y="true" class="scroll-box">

				<block v-for="(item,index) in list" :key="index">
					<view class="card-item border-bottom-1px" :class="{'card-item-active':currItem.cardNo == item.cardNo}" @click="clickItem(item)">
						<view class="card-item__title">
							<text class="ellipsis">{{item.bankName}}</text>
							<view>
								<m-format-card :isStar="true" :cardNo="item.cardNo"></m-format-card>
							</view>
						</view>
						<view class="card-item__phone">
							<text>预留手机号</text>
							<view>
								<m-format-phone :isStar="true" :phone="item.reservedPhoneNo"></m-format-phone>
							</view>
						</view>
						<view class="card-item__icon">
							<m-icon type="duigou" color="#fe701f" size="40" v-if="currItem.cardNo == item.cardNo"></m-icon>
						</view>
					</view>
				</block>

				<cc-btn @click="toUrl">添加信用卡</cc-btn>
			</scroll-view>

			<!-- footer底部 -->
			<view class="m-popup-footer border-1px">
				<slot name="footer">
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mFormatCard from "@/components/m-format-card/m-format-card.vue"
	import mFormatPhone from "@/components/m-format-phone/m-format-phone.vue"
	import ccBtn from "@/components/m-cc-btn/m-cc-btn.vue"
	import mIcon from "@/components/m-icon/m-icon.vue"
	export default {
		components: {
			uniLoadMore,
			mFormatCard,
			mFormatPhone,
			ccBtn,
			mIcon
		},
		props: {

			/* popup弹出位置*/
			position: {
				type: String,
				default: 'bottom'
			},

			/* popup高度 按照750*1334设计稿的尺寸 会自动计算适配 */
			height: {
				type: String,
				default: '850'
			},

			/* popup header 取消文字 */
			cancelText: {
				type: String,
				default: ""
			},

			/* popup header 确认文字 */
			confirmText: {
				type: String,
				default: ""
			},

			/* popup header title标题 */
			titleText: {
				type: String,
				default: ""
			}
		},
		computed: {
			popupHeight() {
				return uni.upx2px(this.height) + 'px';
			}
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {
				offsetTop: offsetTop,
				showPopup: false,
				list: [],
				currItem: {} // 当前选中的
			}
		},
		methods: {
			// 点击蒙层
			hide: function() {
				this.showPopup = false;
				this.$emit('hidePopup');
			},

			// 点击取消按钮
			clickCancel() {
				this.showPopup = false;
				this.$emit("cancel")
			},

			// 点击确认按钮
			clickConfirm() {
				this.showPopup = false;
				this.$emit("confirm")
			},

			// 通过refs调用打开
			show() {
				this.showPopup = true;
				
				// 容错处理
				this.list.length || this.getCardList();
			},

			// 通过refs调用关闭
			close() {
				this.showPopup = false;
			},

			// 滚动穿透阻止
			moveHandle(e) {
				return false;
			},

			// 滚动事件
			scroll(e) {
				this.$emit("scroll", e)
			},

			// 点击item触发
			async clickItem(item) {
				this.showPopup = false;
				this.setCurrSelect(item);
			},

			// 设置当前选中
			setCurrSelect(item) {
				this.currItem = item;
				this.$emit("onSelect", item);
			},

			// 跳转信用卡添加
			toUrl() {
				this.showPopup = false;

				this.$mRouter.push({
					route: this.$mRoutesConfig.ccAdd
				})
			},

			// 加载列表数据
			async getCardList() {
				try {
					let data = await this.$apis.getCardList();
					this.list = data.data.reverse();
					this.setDefaultSelect();
				} catch (e) {
					//TODO handle the exception
					this.showPopup = false;
				}
			},

			// 设置默认选中
			setDefaultSelect() {
				if (this.list instanceof Array && this.list.length !== 0) this.setCurrSelect(this.list[0]);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.m-mask {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .2);
	}

	.m-popup {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 101;
		transition: transform 0.3s ease;
		max-height: 100%;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		display: flex;
		flex-direction: column;
		border-radius: 20upx 20upx 0 0;
		overflow: hidden;
		background: #fff;
	}

	.m-popup-bottom {
		width: 100%;
		transform: translate3d(0, 100%, 0);
	}

	.m-popup-right {
		width: 600upx;
		height: 100%;
		top: 0;
		right: 0;
		bottom: auto;
		left: auto;
		transform: translate3d(100%, 0, 0);
	}

	.m-popup-left {
		width: 600upx;
		height: 100%;
		top: 0;
		left: 0;
		bottom: auto;
		right: auto;
		transform: translate3d(-100%, 0, 0);
	}

	.m-popup-show {
		transform: translate3d(0, 0, 0);
	}

	.m-popup-header {

		.m-picker__hd {
			display: flex;
			// padding: 9px 0px;
			height: 88upx;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 34upx;
			align-items: stretch;
		}

		.m-picker__hd:after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #e5e5e5;
			color: #e5e5e5;
			transform-origin: 0 100%;
			transform: scaleY(0.5);
		}

		.m-picker__title {
			flex: 1;
			line-height: 88upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.m-picker__action {
			display: block;
			color: #aaa;
			font-size: 30upx;
			display: flex;
			width: 140upx;

			view {
				display: flex;
				flex: 1;
				align-items: stretch;
				justify-content: center;
				align-items: center;
			}
		}

		.m-picker__action:first-child {
			text-align: left;
			color: #888;
		}

		.m-picker__action:last-child {
			text-align: right;
		}
	}

	.scroll-box {
		display: flex;
		flex: 1;
	}

	.card-item-active {
		background: #fff7f3;
	}

	.card-item {
		padding: 20upx;
		display: flex;
		box-sizing: border-box;
		color: #535353;

		&__title {
			display: flex;
			flex-direction: column;
			width: 450upx;

			view {
				color: #989898;
				font-size: 26upx;
				margin-top: 5upx;
			}
		}

		&__phone {
			display: flex;
			flex-direction: column;

			view {
				color: #989898;
				font-size: 26upx;
				margin-top: 5upx;
			}
		}

		&__icon {
			// width: 40upx;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}

	.m-popup-footer {}
</style>
