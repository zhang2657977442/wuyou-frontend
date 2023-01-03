<template>
	<view class="swiper-box">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :circular="true"
		 @change="change">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item">
					<image class="swiper-item" :src="item" mode="" @click="clickImg(index)" ></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- dots -->
		<!-- <view class="dtos">
			<view class="dto" :class="{'dto-active':index===currIndex}" v-for="(item,index) in list" :key="index"></view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		data() {
			return {
				currIndex: 0,
			};
		},
		methods: {
			change(s) {
				this.currIndex = s.detail.current;
			},
			
			clickImg(index){
				this.$emit("clickImg", index);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		width: 100%;
		height: 350upx;
		// height: 383upx;
		background: #fff;
	}

	.swiper {
		// width: 690upx;
		height: 350upx;
		// margin: 25upx auto 0;
	}

	.swiper-item {
		width: 100%;
		height: 350upx;
	}

	.dtos {
		display: flex;
		position: relative;
		bottom: 0upx;
		margin: 0 auto;
		justify-content: center;
		// margin-top: 22upx;

		.dto {
			width: 14upx;
			height: 14upx;
			border-radius: 500upx;
			background: #e5e5e5;
			margin: 0 7upx;
			transition: width 0.5s;
		}

		.dto-active {
			background: #c2c2c2;
			width: 26upx;
		}
	}
</style>
