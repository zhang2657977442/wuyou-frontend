<template>
	<view class='m-cell' :class="{'bottom-line':bottomLine,'top-line':topLine}" @click="click">
		<slot name="icon"></slot>
		<view class='title' :class="{'ml-20':isIcon}">{{title}}</view>
		<view class='desc' v-if="desc">{{desc}}</view>
		<view class="cont" v-else><slot></slot></view>
		<image v-if="isLink" class='link-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAMAAAAootjDAAAAPFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlr8OySAAAAE3RSTlMABA2nfQeel5GKr4R1FLppzsxxRm9JNQAAAFhJREFUKM+l0UsOgDAIBFBa7Qdbv3P/u7pwByQ1heXLkBCGHHNzkFRQpYWKYlmSxjpHjKxyDUv8YbQ6rGPbpZ04xvSoxW5JVCdMSEPWksRTx0JGGddXo39eigoD2cYeb8gAAAAASUVORK5CYII='
		 alt="">
		</image>
	</view>
</template>

<script>
	export default {
		props: {
			title: String,
			desc: [String,Number],
			isLink: Boolean,
			bottomLine: Boolean,
			topLine: Boolean,
			isIcon:Boolean
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.m-cell {
		position: relative;
		display: flex;
		background-color: #fff;
		padding: 24upx 20upx;
		box-sizing: border-box;
		align-items: center;

		.title {
			width: 25%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		
		.ml-20{
			margin-left: 20upx;
		}

		.desc {
			color: #666;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-align: right;
			padding: 0 20upx;
			box-sizing: border-box;
			/* display: table-cell;  */
			/* line-height: 30rpx;  */
			/* vertical-align:middle; */
		}

		.cont {
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			padding: 0 20upx;
			box-sizing: border-box;
		}

		.link-icon {
			width: 20upx;
			height: 34upx;
			margin-left: 6upx;
		}

		.mr-l {
			margin-right: 20upx;
		}
	}

	.bottom-line {
		&:after {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 20upx;
			height: 1upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e2e2e2;
		}
	}

	.top-line {
		&:before {
			position: absolute;
			right: 0;
			top: 0;
			left: 20upx;
			height: 1upx;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e2e2e2;
		}
	}
</style>
