<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view v-if="item.type==0" class="job">
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
							<text v-if="item.person_id[0].realname_auth.auth_status==3" class="yzb yzb-yirenzheng1"></text>
							<text class="name">{{item.resume_id[0].name}}</text>
							<text class="yzb yzb-nan" v-if="item.resume_id[0].sex==1"></text>
							<text class="yzb yzb-nv" v-if="item.resume_id[0].sex==2"></text>
						</view>
						<view class="skill">
							{{formatAge(item.resume_id[0].time_to_work)}}年
							<view class="height-line"></view>
							{{item.resume_id[0].education}}
							<view class="height-line"></view>
							{{item.job_expect_id[0].salary==undefined?'面议':item.job_expect_id[0].salary}}
						</view>
					</view>
					<image class="right" v-if="item.person_id[0].avatar_file || item.person_id[0].avatar_file.url" :src="item.person_id[0].avatar_file.url"></image>
					<image class="right" v-else src="/static/img/head.png.png"></image>
				</view>
				<view class="exp" v-if="item.work_exp_id.length>0">
					<view class="exp-item">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text >{{item.work_exp_id[0].company_name}} · {{item.work_exp_id[0].post_name}}</text>
					</view>
				</view>
				<view class="desc">
					<text v-if="item.work_exp_id.length>0" >
						<text v-for="(item2,index2) in formatString(item.work_exp_id[0].skill)" :key="index2" >{{item2}}</text>
					</text>
					<!-- <text v-else>
						暂无工作经验
					</text> -->
					<text class="yzb yzb-shanchu" @click.stop="deleteItem(item)"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
		formatDate,
		calCurrentYear
	} from '@/common/date';
export default {
	name: 'yzb-collect',
	props: {
		list: Array
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
		formatAge(birthday){
			return calCurrentYear(birthday);
		},
		formatString(val){
			if(!val){
				return ''
			}
			return val.split(",");
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
	}
	
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
</style>
