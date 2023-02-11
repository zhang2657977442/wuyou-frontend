<template>
	<view class="content">
		<view class="base-info space-between-algin bottom-line padding-height-20" >
			<view class="column">
				<view class="align-height">
					<text class="name">{{resume.name}}</text>
				</view>
				<text class="text-color">{{formatAge(resume.birthday)}}岁 · {{resume.education}}</text>
			</view>
			<image class="header" :src="resume.userAvatar || '/static/img/head.png'"></image>
		</view>
		<view class="skill width-100 padding-height-30 column bottom-line">
			<view class="space-between-algin">
				<text class="text-title">个人优势</text>
			</view>
			<text
				class="item-content margin-height-20">{{resume.skill}}</text>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">意向岗位</text>
			<view class="align-height">
				<text class="text-sub-title">{{resume.postName}}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">期望薪资</text>
			<view class="align-height">
				<text class="text-sub-title">{{resume.salary}}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">工作经验</text>
			<view class="align-height">
				<text class="text-sub-title">{{resume.experience}}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">求职状态</text>
			<view class="align-height">
				<text class="text-sub-title">{{resume.jobStatus}}</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	import mCell from "@/components/m-cell/m-cell.vue";
	import {
		formatDate,
		calCurrentYear
	} from '@/common/date';
	export default {
		components: {
			mCell
		},
		data() {
			return {
				resume:{},
			}
		},
		onLoad(query) {
			this.getResumeInfo(query.id);
		},
		methods: {
			
			formatAge(birthday){
				return calCurrentYear(birthday);
			},
			
			async getResumeInfo(id){
				this.resume = await this.$apis.getResumeInfo(id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		display: flex;
	}

	.text-title {
		font-size: $font-size-36;
		font-weight: bold;
		color: $font-color-000;
	}

	.text-sub-title {
		font-size: $font-lg;
	}

	.item-content {
		color: $uni-text-color;
	}

	.content {
		padding: 20upx;
		box-sizing: border-box;
	}

	.base-info {
		.name {
			font-size: 44upx;
			font-weight: bold;
		}

		.yzb-bianji2 {
			color: $font-color-000;
		}

		.header {
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
	}
</style>
