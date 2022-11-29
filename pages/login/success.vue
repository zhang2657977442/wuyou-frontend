<template>
	<view class="content success-page">
		<view class="success-page__header">
			<view class="success-page__icon">
				<image :src="successIcon" mode=""></image>
			</view>
			<text class="success-page__txt">已经提交审核，工作人员会在1-2个工作日内审核，审核通过后悔收到中付便民公众号的提醒通知。</text>
		</view>
		<view class="success-page__footer">
			<button type="primary" size="mini" @tap="toMain">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				successIcon: this.$mAssetsPath.regSuccessIcon,
			}
		},
		methods:{
			toMain(){
				this.$mRouter.reLaunch({
					route:this.$mRoutesConfig.main
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.success-page {
		background: #fff;
		&__header {
			margin: 100upx auto;
			padding: 0 50upx;
			box-sizing: border-box;
			text-align: center;
		}

		&__icon {
			width: 300upx;
			height: 300upx;
			margin: 50upx auto;

			image {
				width: 100%;
				height: 100%;
			}
		}
		
		&__txt{
			color: #aaa;
		}
		
		&__footer{
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
