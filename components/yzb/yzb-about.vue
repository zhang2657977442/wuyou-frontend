<template>
	<!-- 关于我们 -->
	<view class="aboutus-bg">
		<!-- Logo -->
		<image class="img-head" src="/static/img/logo.png"></image>
		<!-- content -->
		<scroll-view :scroll-y="true" style="width: 94%;height: 1000upx;">
			<rich-text :nodes="data.text"></rich-text>
		</scroll-view>
		<view class="footer column">
			<!-- 公司名称 -->
			<view class="aboutus-tail">
				<text class="txt-head">©2023人才直聘</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	name: 'cgAbout',
	props:{
		data:{			
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
