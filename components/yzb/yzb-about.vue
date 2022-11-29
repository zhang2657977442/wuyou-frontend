<template>
	<!-- 关于我们 -->
	<view class="aboutus-bg">
		<!-- Logo -->
		<image class="img-head" :src="aboutData.logo"></image>
		<!-- content -->
		<scroll-view :scroll-y="true" style="width: 94%;height: 700upx;">
			<rich-text :nodes="aboutData.content"></rich-text>
		</scroll-view>
		<!-- <text class="txt-head"> {{aboutData.content || '暂无'}}</text> -->
		<!-- 客服电话 -->
		<view class="footer column">
			<view class="aboutus-tail tail">
				<text class="txt-head">客服电话{{aboutData.servicePhone || '暂无'}}</text>
			</view>
			<!-- 公司名称 -->
			<view class="aboutus-tail">
				<text class="txt-head">{{aboutData.copyright || '暂无'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	name: 'cgAbout',
	props:{
		aboutData:{
			// type: Array,
			
		}
	}
}
</script>

<style>
page{
	background: #FFFFFF;
}
view {
	font-size: 30upx;
	line-height: 1.8;
}
text {
	font-size: 30upx;
}

.aboutus-bg{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.img-head{
	width: 200upx;
	height: 200upx;
	justify-content: center;
	margin: auto;
	margin-top: 60upx;
	margin-bottom: 30upx;
}
.txt-head{
	margin: auto;
	width: 90%;
	word-wrap: break-word;
}
.txt-heads{
	text-align: center;
	
}
.aboutus-tail{
	bottom: 0;
	pos-bottom: absolute;
	text-align: center;
	width: 100%;
	
}
.footer{
	width: 100%;
	position: absolute;
	bottom: 20upx;
}
</style>
