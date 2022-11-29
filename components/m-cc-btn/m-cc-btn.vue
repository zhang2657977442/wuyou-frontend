<template>
	<view class="cc-btn" @tap="handleClick">
		<view class="cc-btn__jia"></view>
		<view class="cc-btn__txt">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			handleClick(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc-btn {
		width: 590upx;
		height: 90upx;
		margin: 50upx auto;
		border: 1px dotted #fe6812;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #fe6812;

		&:active {
			opacity: 0.7;
		}

		&__txt {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50upx;
		}

		&__jia {
			width: 40upx;
			height: 40upx;
			color: #ccc;
			transition: color .25s;
			position: relative;
			margin-right: 10upx;

			&::before {
				content: '';
				position: absolute;
				left: 50%;
				top: 50%;
				width: 30upx;
				transform: translate(-50%, -50%);
				border-top: 2px solid #fe6812;
			}

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				top: 50%;
				height: 30upx;
				transform: translate(-50%, -50%);
				border-left: 2px solid #fe6812;
			}
		}
	}
</style>
