<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view class="company">
				<view>
					<image class="logo" :src="item.logo || '/static/img/company.png'"></image>
				</view>
				<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width:100%;">
					<view class="info">
						<text class="name">{{item.name}}</text>
						<text class="require">{{item.industryName}} · {{item.staffSize}}</text>
						<view class="desc">
							<text>{{ item.nature }}</text>
							<text>{{ item.restTime }}</text>
							<text>{{item.workOvertime}}</text>
						</view>
					</view>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
export default {
	name: 'm-position',
	props: {
		list: Array
	},
	components: {
		mEmptyData
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
		};
	},

	methods: {
		onClick(item) {
			this.$emit('click', item);
		}
	}
};
</script>

<style lang="scss">
.m-position {
	.item {
		background-color: $bgcolor_white;
		padding: 30upx 20upx;
		border-bottom: 3upx solid $border-color-light;
		.company{
			// justify-content: space-between;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.logo{
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			border: 1upx solid $border-color-base;
		}
		.info{
			margin-left: 20upx;
			display: flex;
			flex-direction: column;
			.name{
				font-size: $font-size-34;
				font-weight: bold;
			}
			.require{
				color: $font-color-666;
				margin-top: 5upx;
			}
			.desc {
				// margin: 10upx 0;
				margin-top: 5upx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				align-content: flex-start;
				flex-direction: row;
				justify-content: flex-start;
				text {
					font-size: $uni-font-size-sm;
					padding: 0upx 10upx;
					margin-right: 15upx;
					margin-bottom: 8upx;
					background-color: $border-color-light;
					border-radius: 5upx;
					color: $font-color-666;
				}
			}
		}
		.yzb-next{
			color: $font-color-999;
		}
	}
}
</style>
