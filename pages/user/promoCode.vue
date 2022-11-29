<template>
	<view class="content promo-page">
		<view class="code-box">
			<view class="head-img">
				<image :src="userInfo.headimgurl || defaultHeader" mode=""></image>
			</view>
			<view class="name">{{userInfo.nickname}}</view>
			<view class="code-str">邀请码：212121</view>
			<view class="code">
				<image :src="codeImg" mode=""></image>
			</view>
			<view class="p1">微信扫描上方二维码即可注册</view>
			<view class="p2">(截图保存二维码到手机或微信识别二维码)</view>
		</view>
		<view class="logo">
			<image :src="logo" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	// import QRCode from "qrcode"
	export default {
		data() {
			return {
				defaultHeader:this.$mAssetsPath.headImg,
				logo:this.$mAssetsPath.logo,
				codeImg: "",
			};
		},
		onLoad() {
			this.getPromoCode();
		},
		computed: {
			...mapState(["userInfo","openId"])
		},
		methods: {
			async getPromoCode() {
				// let data = await this.$apis.getPromoCode();
				// data = JSON.parse(data);
				// let promoCode = data.promoCode;
				// if (!promoCode) return;
				
				// H5推广码 这里的地址需要微信授权回调方案。暂时写死。
				let path = `${window.location.origin}/#/pages/login/reg?referrer=${this.openId}`;
				// 小程序推广码
				// ...
				let base64 = await QRCode.toDataURL(path);
				this.codeImg = base64;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.promo-page {
		background: linear-gradient(136deg, #ffc003, #fa5d02);
		display: flex;
		align-items: center;
	}

	.code-box {
		width: 595upx;
		background: #fff;
		border-radius: 15upx;
		margin-top: 145upx;
		text-align: center;
		padding: 0upx 20upx 30upx;
		box-sizing: border-box;
	}

	.head-img {
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
		margin: -65upx auto 0;
		border: 2px solid #eee;
		background: #fff;
		display: block;
		overflow: hidden;
	}

	.name {
		font-size: 36upx;
		margin-top: 20upx;
		font-weight: 600;
	}

	.code-str {
		font-size: 28upx;
		margin-top: 10upx;
	}

	.code {
		width: 385upx;
		height: 385upx;
		margin: 25upx auto;
		border: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.p1 {
		font-size: 28upx;
		margin-top: 50upx;
	}

	.p2 {
		font-size: 25upx;
		color: #aaa;
		margin-top: 10upx;
	}

	.logo {
		width: 211upx;
		height: 73upx;
		// margin-top: 30upx;
		position: absolute;
		bottom: 30upx;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
