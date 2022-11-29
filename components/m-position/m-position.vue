<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in positions" :key="index" @click="onClick(item)">
			<view class="title space-between">
				<text class="left">{{item.postName}}</text>
				<text class="right">{{item.salary}}</text>
			</view>
			<view class="company">
				<text class="left">{{item.companyName}}</text>
				<text class="right">{{item.companyStaffSize}}</text>
			</view>
			<view class="desc">
				<text>{{item.expRequire}}</text>
				<text>{{item.minEducation}}</text>
				<text v-for="(item2,index2) in item.skill" :key="index2" >{{item2}}</text>
				<!-- <text>需求分析</text> -->
			</view>
			<view class="user">
				<view class="left">
					<image :src="item.memberAvatar"></image>
					<text class="name">{{item.memberName}}</text>
					<text class="post">{{item.memberPostName}}</text>
				</view>
				<!-- <view class="right">
					<text class="area">南康区</text>
					<text class="address">家具城</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
export default {
	name: 'm-position',
	props: {
		positions: Array
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
			console.log('1111111', item);
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
		// margin-bottom: 20upx;
		border-bottom: 3upx solid $border-color-light;
	}
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.title {
	.left {
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	.right {
		color: $main-color;
		font-weight: bold;
	}
}

.company {
	color: $font-color-666;
	margin-top: 15upx;
	font-size: $uni-font-size-base;
	.left {
		margin-right: 15upx;
	}
}

.desc {
	margin-top: 25upx;
	text {
		font-size: $uni-font-size-base;
		padding: 5upx 10upx;
		margin-right: 15upx;
		background-color: $border-color-base;
		border-radius: 5upx;
		color: $font-color-666;
	}
}

.user {
	margin-top: 35upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 60upx;
		height: 60upx;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: $uni-font-size-base;
		.name {
			margin: 0 20upx;
		}
		.post {
			// color: $font-color-666;
		}
	}
	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: $font-color-666;
		font-size: $uni-font-size-base;
		.area {
			margin-right: 15upx;
		}
	}
}
</style>
