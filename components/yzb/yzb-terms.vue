<template>
	<!-- 协议隐私 -->
	<view class="content">
		<!-- <view class="protocol center-algin">
			<text>{{termsList.title}}</text>
		</view> -->
		<view class="protocol-content padding-20">
			<rich-text :nodes="termsList.content"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
	props:{
		termsList:{
			
		}
	}
}
</script>

<style>
page{
	background: #fff;
}
view {
	font-size: 30upx;
	line-height: 1.8;
}
text {
	font-size: 30upx;
}
.content{
	flex: 1;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.protocol{
	padding-top: 20upx;
}
.protocol-content{
	width: 94.5%;
	line-height: 1.5;
}
</style>
