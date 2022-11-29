<template>
	<view class="ad-box">
		<view class="ad" v-for="(item,index) in list" :key="index">
			<image :src="item.src" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.ad-box {
		display: flex;
		justify-content: center;
		background: #fff;
		
		margin-top: 10upx;
		.ad {
			image {

				width: 335upx;
				height: 185upx;
				margin: 15upx;
			}
		}
	}
</style>
