<template>
	<view class="r-top">
		<textarea :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="pl" />
		<view class="r-top-t">
		 	<view></view>
			<view> {{contentLength}}/{{len}}</view>
		 </view>
	</view>
</template>

<script>
	export default {
		computed:{
			contentLength(){
				return this.content.length;
			}
		},
		props:{
			pl:{
				type: String,
				default: "请输入"
			},
			len:{
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				content:''
			}
		},
	}
</script>

<style>
	textarea{
		height: 400upx;
		width: 100%;
	}
.r-top{
	padding: 10rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	height: 100%;
}
.r-top-t{
	display: flex;
	justify-content: space-between;
	font-family:PingFang SC;
	font-weight:400;
	line-height:20px;
	color:rgba(153,153,153,1);
	opacity:1;
}
</style>
