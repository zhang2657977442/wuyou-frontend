<template>
	<view>
		<view :class="{'m-mask':true}" @click="hide" @touchmove.stop.prevent="moveHandle" v-show="showPopup"></view>

		<view class="" :class="['m-popup','m-popup-'+position,{'m-popup-show':showPopup}]" :style="{height: popupHeight}"
		 @touchmove.stop.prevent="moveHandle">

			<!-- 如果定义了titleText props属性 才显示header -->
			<view class="m-popup-header">
				<slot name="header">
					<view class="m-picker__hd" catchtouchmove="true" v-if="titleText">
						<view class="m-picker__action">
							<text @click="clickCancel">{{cancelText}}</text>
						</view>
						<view class="m-picker__title">{{titleText}}</view>
						<view class="m-picker__action" :style="{color:themeColor}">
							<text v-if="confirmText" @click="clickConfirm">{{confirmText}}</text>
						</view>
					</view>
				</slot>
			</view>

			<slot></slot>

			<!-- footer底部 -->
			<view class="m-popup-footer">
				<slot name="footer">

				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {

			/* popup弹出位置 暂时支持bottom */
			position: {
				type: String,
				default: 'bottom'
			},

			/* popup高度 按照750*1334设计稿的尺寸 会自动计算适配 */
			height: {
				type: String,
				default: 'auto'
			},

			/* 确认按钮的颜色 */
			themeColor: {
				type: String,
				default: "#28d966"
			},

			/* popup header 取消文字 */
			cancelText: {
				type: String,
				default: "取消"
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
			}
		},
		methods: {
			hide: function() {
				this.showPopup = false;
				this.$emit('hidePopup');
			},
			clickCancel() {
				this.showPopup = false;
				this.$emit("cancel")
			},
			clickConfirm() {
				this.showPopup = false;
				this.$emit("confirm")
			},
			show() {
				this.showPopup = true;
			},
			close() {
				this.showPopup = false;
			},
			moveHandle(e) {
				return false;
			},
			scroll(e) {
				this.$emit("scroll", e)
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
		background-color: rgba(0, 0, 0, .3);
	}

	.m-popup {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #eee;
		z-index: 101;
		transition: transform 0.3s ease;
		max-height: 100%;
		// overflow-y: auto;
		// -webkit-overflow-scrolling: touch;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		display: flex;
		flex-direction: column;
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
			color: #1aad19;
			font-size: 30upx;
			display: flex;
			width: 140upx;

			text {
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

	// 	.m-popup-scroll-box {
	// 		flex: 1;
	// 		display: flex;
	// 	}

	.m-popup-footer {}
</style>
