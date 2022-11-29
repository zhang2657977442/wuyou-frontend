<template>
	<view class="content">
		<view class="base-info space-between-algin bottom-line padding-height-20" @click="toUserEdit()">
			<view class="column">
				<view class="align-height">
					<text class="name">{{resume.name}}</text>
					<text class="yzb yzb-bianji2 margin-left-20"></text>
				</view>
				<text class="text-color">{{formatAge(resume.timeToWork)}}年经验 · {{formatAge(resume.birthday)}}岁 · {{resume.education}}</text>
			</view>
			<image class="header" :src="resume.avatar || '/static/img/head.png'"></image>
		</view>
		<view class="skill width-100 padding-height-30 column bottom-line">
			<view class="space-between-algin">
				<text class="text-title">个人优势</text>
				<text class="yzb yzb-bianji2" @click="toSkillEdit()"></text>
			</view>
			<text
				class="item-content ellipsis-twoline margin-height-20">{{resume.personalSkill}}</text>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">求职状态</text>
			<view class="align-height">
				<!-- <text class="text-color-grey">在职-暂不考虑</text> -->
				<picker @change="bindPickerChange" :value="workStatus" :range="workStatusArray">
					<!-- <view class="text-color-grey">{{workStatus}}</view> -->
					<input class="padding-10" style="text-align: right;" placeholder="请选择求职状态" v-model="workStatus" />
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>

		<view class="expect column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">求职期望</text>
				<text class="yzb yzb-jia1" @click="toExpectEdit(0)" v-if="resume.jobExpectList.length<10"></text>
			</view>
			<view class="column margin-top-10">
				<view class="column margin-top-10" v-for="(item, index) in resume.jobExpectList" :key="index"
				@click="toExpectEdit(item.id)">
					<view class="space-between-algin">
						<text class="text-sub-title">{{item.postName}}</text>
						<text class="yzb yzb-next"></text>
					</view>
					<text class="text-color">{{item.expectSalary}} . {{item.industryName}}</text>
				</view>
			</view>
		</view>

		<view class="work-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">工作经历</text>
				<text class="yzb yzb-jia1" @click="toWorkEdit(0)"></text>
			</view>
			<view class="column margin-top-10" v-for="(item, index) in resume.workExpList" :key="index"
			@click="toWorkEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{item.companyName}}</text>
					<view class="align-height">
						<text class="text-color-grey">{{formatDates(item.startDate)}}-{{formatDates(item.endDate)}}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{item.postName}}</text>
				<text
					class="item-content ellipsis-twoline margin-height-20">{{item.jobContent}}</text>
				<!-- <view class="skill-item">
					<text>信息化</text>
					<text>自动化</text>
					<text>物联网</text>
					<text>MES系统</text>
					<text>MES系统</text>
					<text>MES系统</text>
					<text>MES系统</text>
					<text>MES系统</text>
				</view> -->
			</view>
		</view>

		<view class="pro-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">项目经历</text>
				<text class="yzb yzb-jia1" @click="toProEdit(0)"></text>
			</view>
			<view class="column margin-top-10" v-for="(item, index) in resume.proExpList" :key="index"
			@click="toProEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{item.name}}</text>
					<view class="align-height">
						<text class="text-color-grey">{{formatDates(item.startDate)}}-{{formatDates(item.endDate)}}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{item.role}}</text>
				<text
					class="item-content ellipsis-twoline margin-top-20">内容：{{item.descr}}</text>
				<text
					class="item-content ellipsis-twoline margin-top-10" v-if="item.performance">业绩：{{item.performance}}</text>
			</view>
		</view>

		<view class="edu-exp column width-100 padding-height-30">
			<view class="space-between-algin">
				<text class="text-title">教育经历</text>
				<text class="yzb yzb-jia1" @click="toEduEdit(0)"></text>
			</view>
			<view class="column margin-top-10 width-100" v-for="(item, index) in resume.eduExpList" :key="index"
			@click="toEduEdit(item.id)">
				<view class="space-between-algin">
					<text class="text-sub-title">{{item.school}}</text>
					<view class="align-height">
						<text class="text-color-grey">{{formatDates(item.startTime)}}-{{formatDates(item.endTime)}}</text>
						<text class="yzb yzb-next"></text>
					</view>
				</view>
				<text class="text-color">{{item.major}} {{item.education}}</text>
			</view>
		</view>

		<!-- <view class="edu-exp column width-100 padding-height-30 bottom-line">
			<view class="space-between-algin">
				<text class="text-title">资格证书</text>
				<text class="yzb yzb-jia1" @click="toCertEdit()"></text>
			</view>
			<view class="skill-item2">
				<text>英语六级</text>
				<text>计算机三级</text>
				<text>初级统计师</text>
				<text>一级建造师</text>
				<text>二级建造师</text>
				<text>高级统计师</text>
			</view>
		</view> -->
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
				skillContent: '',
				statusIndex: 0,
				workStatusArray: ["在职-暂不考虑","在职-考虑机会","在职-月内到岗","离职-随时到岗"],
				resume:{},
				workStatus:null,
			}
		},
		onShow() {
			this.getResume();
		},
		methods: {
			
			formatDates(time){
				if (time == null || time === '') {
				  return 'N/A';
				}
				let date = new Date(time);
				// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
				return formatDate(date, 'yyyy.MM')
			},
			
			formatAge(birthday){
				return calCurrentYear(birthday);
			},
			
			async getResume(){
				this.resume = await this.$apis.getResume();
				// let cur=calCurrentYear(this.resume.birthday);
				this.workStatus=this.resume.jobStatus;
				// console.log("年龄",cur);
			},

			async bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.workStatus = this.workStatusArray[e.target.value];
				let param={
					id:this.resume.id,
					jobStatus:this.workStatus
				}
				let res = await this.$apis.updateResumeBasic(param);
			},
			toUserEdit() {
				this.toEdit(this.$mRoutesConfig.userInfo)
			},
			toSkillEdit() {
				// this.toEdit(this.$mRoutesConfig.editSkill)
				this.$mRouter.push({
					route: this.$mRoutesConfig.editSkill,
					query: {
						id: this.resume.id,
						content:this.resume.personalSkill,
					}
				});
			},
			toExpectEdit(id) {
				this.toEdit(this.$mRoutesConfig.editExpect,id)
			},
			toWorkEdit(id) {
				this.toEdit(this.$mRoutesConfig.editWork,id)
			},
			toProEdit(id) {
				this.toEdit(this.$mRoutesConfig.editPro,id)
			},
			toEduEdit(id) {
				this.toEdit(this.$mRoutesConfig.editEdu,id)
			},
			toCertEdit() {
				this.toEdit(this.$mRoutesConfig.editCert,1)
			},

			toEdit(url,id) {
				this.$mRouter.push({
					route: url,
					query: {
						id: id
					}
				});
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
		font-size: $font-base-more;
		font-weight: bold;
		color: $font-color-000;
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

	.yzb-jia1 {
		color: $font-color-333;
		font-weight: bold;
		font-size: 44upx;
	}

	.skill-item {
		margin-top: 20upx;
		padding-bottom: 10upx;
		flex-wrap: wrap;

		text {
			font-size: $uni-font-size-sm;
			padding: 5upx 20upx;
			margin-right: 15upx;
			margin-bottom: 15upx;
			background-color: $border-color-base;
			border-radius: 8upx;
			color: $font-color-666;
		}
	}

	.skill-item2 {
		margin-top: 20upx;
		padding-bottom: 10upx;
		flex-wrap: wrap;

		text {
			font-size: $uni-font-size-sm;
			padding: 10upx 20upx;
			margin-right: 15upx;
			margin-bottom: 15upx;
			background-color: $border-color-base;
			border-radius: 8upx;
			color: $font-color-666;
		}
	}
</style>
