<template>
	<view class="fail-page" v-if="status">
		<view class="fail-page__icon">
			<view>
				<image :src="fail_icon" mode=""></image>
			</view>
			<text>{{customerStatus[status]}}</text>
		</view>
		<view class="fail-page__action" v-if="status == 'REJECT'">
			<button type="primary" size="mini" @tap="toUrl">查看原因</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			status: String
		},
		data() {
			return {
				fail_icon: this.$mAssetsPath.fail_icon,
				customerStatus: this.$mConstDataConfig.status,
			}
		},
		onLoad(query) {

		},
		watch: {
			status(newValue, oldValue) {
				uni.setNavigationBarTitle({
					title: `商户${this.customerStatus[newValue]}`
				})
			}
		},
		methods: {
			toUrl() {
				console.log(this.$mRoutesConfig.userInfo)
				this.$mRouter.push({
					route: this.$mRoutesConfig.userInfo
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fail-page {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0 50upx;
		box-sizing: border-box;

		&__icon {

			&>view {
				width: 240upx;
				height: 220upx;
				margin: 150upx auto 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			&>text {
				padding: 25upx 0;
				font-size: 36upx;
				color: #333;
				white-space: nowrap;
				position: relative;
				display: block;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
			}
		}

		&__action {
			margin-top: 50upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
