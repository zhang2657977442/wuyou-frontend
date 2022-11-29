<template>
	<view class="content reg-go">
		<image class="logo" :src="logo" mode=""></image>
		<image class="desc" :src="reg_img" mode=""></image>
		<view class="footer">
			<view class="imgs">
				<image class="img" :src="t_1" mode=""></image>
				<image class="img" :src="t_2" mode=""></image>
				<image class="img" :src="t_3" mode=""></image>
				<image class="img" :src="t_4" mode=""></image>
			</view>
			<view class="btn">
				<button type="primary" class="primary" @click="toReg">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {

		data() {
			return {
				// 映射图片地址
				logo: this.$mAssetsPath.logo,
				reg_img: this.$mAssetsPath.reg_img,
				t_1: this.$mAssetsPath.t_1,
				t_2: this.$mAssetsPath.t_2,
				t_3: this.$mAssetsPath.t_3,
				t_4: this.$mAssetsPath.t_4,
				
				query:{}
			};
		},
		async onLoad(query) {
			this.query = query;
		},
		methods: {
			toReg() {
				this.$mRouter.redirectTo({
					route: this.$mRoutesConfig.reg,
					query:this.query
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reg-go {
		// background: linear-gradient(136deg, #ffc003, #fa5d02);
		background: #4587D5;
		overflow: hidden;
	}

	.logo {
		width: 338upx;
		height: 116upx;
		margin: 60upx auto;
	}

	.desc {
		width: 638upx;
		height: 504upx;
		margin-left: 150upx;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.imgs {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.img {
			width: 322upx;
			height: 76upx;
			margin: 15upx 10upx;
		}
	}

	.btn {
		margin-top: 20upx;
		padding: 40upx;
	}
</style>
