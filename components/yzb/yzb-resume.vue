<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view class="title space-between">
				<view class="left">
					<text class="name">{{ item.name }}</text>
					<view class="skill">
						{{ item.gender }}
						<view class="height-line"></view>
						{{ formatAge(item.birthday) }}岁
						<view class="height-line"></view>
						{{ item.education }}
					</view>
					
				</view>
				<view class="right">{{item.jobStatus}}</view>
				
			</view>
			<view class="exp">
				<view class="exp-item">
					<text class="yzb yzb-gongzuobao top-icon"></text>
					<text>{{ item.experience }}</text>
				</view>
				<view class="exp-item">
					<text class="yzb yzb-xueli top-icon"></text>
					<text>{{ item.salary }}</text>
				</view>
			</view>
		<view class="user">
			<view class="left">
				<image :src="item.userAvatar"></image>
				<text class="name">{{item.username}}</text>
			</view>
			<view class="right">
				<text class="area">意向岗位</text>
				<text class="address">{{item.postName}}</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue'
import { formatDate, calCurrentYear } from '@/common/date'
export default {
	name: 'm-position',
	props: {
		list: Array
	},
	components: {
		mEmptyData
	},
	data() {
		return {}
	},

	methods: {
		onClick(item) {
			this.$emit('click', item)
		},

		formatAge(birthday) {
			return calCurrentYear(birthday)
		},

		formatString(val) {
			if (!val) {
				return ''
			}
			if (val instanceof Array) {
				return val
			}
			return val.split(',')
		}
	}
}
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
		display: flex;
		flex-direction: column;
		.name {
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.skill {
			color: $font-color-666;
			margin-top: 5upx;
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
	
	}
	.right{
		color: $main-color;
		font-weight: bold;
		font-size: 32upx;
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

.exp {
	line-height: 1.2;
	display: flex;
	
	.exp-item {
		display: flex;
		flex-direction: row;
		padding-right: 30upx;
		.top-icon {
			margin-right: 10upx;
			margin-top: 3upx;
		}
	}
}

.user {
	margin-top:15upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
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
