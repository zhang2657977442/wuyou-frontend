<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in positions" :key="index" @click="onClick(item)">
			<view class="title space-between">
				<view class="left">
					<text class="title-parttime">{{item.jobType}}</text>
					<text class="title-name">{{ item.postName }}</text>
				</view>
				<text class="right">{{ item.salary }}</text>
			</view>
			<view class="company">
				<view class="left">
					{{ item.companyName }}
					<view class="height-line"></view>
					{{ item.staffSize }}
					<view class="height-line"></view>
					{{ item.nature }}
				</view>
	<!-- 			<view class="right">
					<text class="address">{{formatDistance(item.distance)}}</text>
				</view> -->
			</view>
			<view class="desc">
				<text>{{ item.expRequire }}</text>
				<text>{{ item.minEducation }}</text>
			</view>
			<view class="user">
				<view class="left">
					<image :src="item.userAvatar"></image>
					<text class="name">{{ item.userName }}</text>
				</view>
				<view class="right">
					<text class="address">{{item.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import { formatDate } from '@/common/date';
export default {
	name: 'yzb-position',
	props: {
		positions: Array
	},
	components: {
		mEmptyData
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1
		};
	},

	methods: {
		onClick(item) {
			this.$emit('click', item);
		},

		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'MM月dd日');
		},
		
		formatDistance(distance){
			if(distance){
				let a=parseFloat(distance);
				if(a>0){
					return distance.toFixed(2)+"km"
				}else{
					return a * 1000 +"m";
				}
			}
			return '0km';
		},
	}
};
</script>

<style lang="scss">
.m-position {
	.item {
		background-color: $bgcolor_white;
		padding: 30upx 20upx;
		// margin-bottom: 20upx;
		border-bottom: 10upx solid $border-color-light;
	}
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.title {
	.left {
		
	}
	.title-name{
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	
	.title-parttime{
		color: $font-color-orange;
		border: 1upx solid $font-color-orange;
		font-size: $uni-font-size-sm;
		margin-right: 15upx;
		padding: 5upx 10upx;
		border-radius: 6upx;
	}
	
	.title-share {
		color: $main-color;
		border: 1upx solid $main-color;
		border-radius: 20upx 0upx;
		// height: 38upx;
		// width: 130upx;
		font-size: $uni-font-size-sm;
		margin-left: 20upx;
		padding: 0upx 10upx;
	}

	.right {
		color: $main-color;
		font-weight: bold;
		font-size: 32upx;
	}
}

.company {
	color: $font-color-666;
	font-size: $uni-font-size-sm;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	.height-line {
		height: 20upx;
		width: 4upx;
		background-color: $font-color-ccc;
		margin: 0 15upx;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 15upx;
		text{
			margin-right:10upx;
			font-size: $uni-font-size-sm;
		}
	}
	.right{
		text{
			font-size: $uni-font-size-sm;
		}
	}
	.yzb-yirenzheng1{
		color: $uni-color-success;
	}
}

.share {
	color: $font-color-999;
	// margin-top: 5upx;
	font-size: $uni-font-size-base;
	display: flex;
	flex-direction: row;
	align-items: center;
	.height-line {
		height: 20upx;
		width: 4upx;
		background-color: $font-color-ccc;
		margin: 0 15upx;
	}
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

.user {
	// border-top: 1upx dotted $border-color-light;
	padding-top: 10upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: $uni-font-size-sm;
		color: $font-color-666;
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
		.area {
			margin-right: 15upx;
		}
		text{
			color: $font-color-999;
			font-size: $uni-font-size-sm;
		}
	}
}
</style>
