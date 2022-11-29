<template>
	<view class="mpvue-picker__hd" catchtouchmove="true">
		<view class="mpvue-picker__action" @click="clickCancel">{{cancelText}}</view>
		<view class="">
			<slot></slot>
		</view>
		<view class="mpvue-picker__action" :style="{color:themeColor}" @click="clickConfirm">{{confirmText}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			themeColor:{
				type:String,
				default:"#aaa"
			},
			cancelText:{
				type:String,
				default:"取消"
			},
			confirmText:{
				type:String,
				default:"确定"
			}
		},
		methods:{
			clickCancel(){
				this.$emit("cancel")
			},
			clickConfirm(){
				this.$emit("confirm")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mpvue-picker__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 17px;
	}

	.mpvue-picker__hd:after {
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

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

</style>
