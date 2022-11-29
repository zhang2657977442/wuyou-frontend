<template>
	<view class="m-empty-data">
		<view>
			<view>
				<image :src="coverUrl" mode=""></image>
			</view>
			<text>
				<slot>{{noTxt}}</slot>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			coverUrl: String,
			noTxt: {
				type: String,
				default: "这里空空如也"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.m-empty-data {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		&>view {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);

			&>view {
				width: 220upx;
				height: 220upx;
				margin: -250upx auto 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			&>text {
				padding: 15upx 0;
				font-size: 30upx;
				color: #333;
				white-space: nowrap;
				position: relative;
				display: block;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;
			}
		}
	}
</style>
