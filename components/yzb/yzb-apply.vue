<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view v-if="type==0" class="job">
				<view class="title space-between">
					<view class="left">
						<text class="title-name">{{ item.position.postName }}</text>
						<text class="title-share" v-if="item.position.positionType==3">共享</text>
					</view>
					<text class="right">{{ item.position.salary }}</text>
				</view>
				<view class="company">
					{{ item.companyName }}
					<view class="height-line"></view>
					{{ item.companyStaffSize }}
					<view class="height-line"></view>
					{{ item.companyNature }}
				</view>
				<view class="desc">
					<text>{{ item.position.expRequire }}</text>
					<text>{{ item.position.minEducation }}</text>
					<text v-if="item.position.skill" v-for="(item2, index2) in item.position.skill.split(',')" :key="index2">{{ item2 }}</text>
				</view>
				<view class="user">
					<view class="left">
						<image :src="item.memberAvatar"></image>
						<text class="name">{{ item.memberName }}</text>
						<text class="post">{{ item.memberPostName }}</text>
					</view>
					<view class="right" @click.stop="deleteItem(item)">
						<text class="yzb yzb-shanchu"></text>
					</view>
				</view>
			</view>
			<view v-else class="resume">
				<view class="title space-between">
					<view class="left">
						<view class="">
							<!-- <text v-if="item.member_id[0].realname_auth.auth_status==3" class="yzb yzb-yirenzheng1"></text> -->
							<text :class="item.ifRead?'name-read':'name'">{{item.resume.name}}</text>
							<!-- <text class="yzb yzb-nan" v-if="item.resume.sex==1"></text> -->
							<!-- <text class="yzb yzb-nv" v-if="item.resume.sex==2"></text> -->
							<text class="read-status" v-if="item.ifRead!=1">【未读】</text>
							<text class="read-status" v-if="item.status==2">【已录用】</text>
						</view>
						<view class="skill">
							{{formatAge(item.resume.timeToWork)}}年
							<view class="height-line"></view>
							{{item.resume.education}}
							<view class="height-line"></view>
							{{item.expectSalary==undefined?'面议':item.expectSalary}}
						</view>
					</view>
					<image class="right" v-if="item.memberAvatar" :src="item.memberAvatar"></image>
					<image class="right" v-else src="/static/img/head.png.png"></image>
				</view>
				<view class="exp" v-if="item.companyName">
					<view class="exp-item" :class="item.ifRead?'exp-item-read':''">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text>{{item.companyName}} · {{item.companyPostName}}</text>
					</view>
				</view>
				<view class="position">
					<view class="left">
						<text>应聘岗位：</text>
						<text :class="item.ifRead?'title-read':'title'">{{item.postName}}</text>
					</view>
					<text class="right">{{formatCreateTime(item.createTime)}}</text>
				</view>
				<view v-if="item.status<2">
					<button class="btn-ensure" @click.stop="ensure(item)">确认录用</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import {
		formatDate,
		calCurrentYear
	} from '@/common/date';
export default {
	name: 'm-position',
	props: {
		list: Array,
		type:Number
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
		deleteItem(item){
			this.$emit('onDelete', item);
		},
		
		ensure(item){
			this.$emit('ensure', item);
		},
		
		formatAge(birthday){
			return calCurrentYear(birthday);
		},
		formatString(val){
			return val.split(",");
		},
		formatCreateTime(time) {
			console.log("formatCreateTime",time);
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
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
		border-bottom: 3upx solid $border-color-light;
	}
	
	.job{
		.title {
			.left {
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}
			.title-name{
				font-weight: bold;
				font-size: $uni-font-size-lg;
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
				color: $uni-color-warning;
				font-weight: bold;
			}
		}
		
		.company {
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
		
		.desc {
			margin-top: 10upx;
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
			margin-top: 25upx;
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
				.yzb-shanchu{
					font-size: $font-size-40;
					color: $uni-color-error;
				}
			}
		}
	}
	
	.resume{
		.title {
			.left {
				display: flex;
				flex-direction: column;
				.name{
					font-weight: bold;
					font-size: $uni-font-size-lg;
				}
				.yzb-yirenzheng1{
					font-weight: bold;
					font-size: 34upx;
					color: $uni-color-success;
					margin-right: 10upx;
				}
				.name-read{
					font-weight: bold;
					font-size: $uni-font-size-lg;
					color: $font-color-666;
				}
				.read-status{
					margin-left: 20upx;
					font-size: $uni-font-size-base;
					color: $font-color-red;
				}
				.yzb-nan{
					color: #12ae85;
					font-weight: bold;
					font-size: 34upx;
					margin-left: 10upx;
				}
				.yzb-nv{
					color: #FF6A6A;
					font-weight: bold;
					font-size: 34upx;
					margin-left: 10upx;
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
			.right {
				width: 120upx;
				height: 120upx;
				border-radius:60upx
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
		
		.exp{
			line-height: 1.2;
			.exp-item{
				display: flex;
				flex-direction: row;
				align-items: center;
				line-height: 1.2;
				.top-icon{
					margin-right: 10upx;
					margin-top: 3upx;
				}
			}
			.exp-item-read{
				color: $font-color-666;
			}
		}
		
		.desc {
			margin-top: 25upx;
			flex-wrap: wrap;
			text {
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				margin-right: 15upx;
				background-color: $border-color-base;
				border-radius: 5upx;
				color: $font-color-666;
			}
		}
		
		.position{
			margin-top: 5upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			color: $font-color-666;
			.title{
				font-size: $uni-font-size-lg;
				color: $font-color-orange;
			}
			.title-read{
				font-size: $uni-font-size-lg;
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
		
		.btn-ensure{
			font-size: 30upx;
			color: $main-color;
		}
	}
	
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
</style>
