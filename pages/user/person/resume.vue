<template>
	<view class="content">
		<view class="base-info space-between-algin bottom-line padding-height-20" @click="toUserEdit()">
			<view class="column">
				<view class="align-height">
					<text class="name">{{ resume.name }}</text>
					<text class="yzb yzb-bianji2 margin-left-20"></text>
				</view>
				<text class="text-color">{{ formatAge(resume.birthday) }}岁 · {{ resume.education }}</text>
			</view>
			<image class="header" :src="userInfo.avatar || '/static/img/head.png'"></image>
		</view>
		<view class="skill width-100 padding-height-30 column bottom-line">
			<view class="space-between-algin">
				<text class="text-title">个人优势</text>
				<text class="yzb yzb-bianji2" @click="toSkillEdit()"></text>
			</view>
			<text class="item-content margin-height-20">{{ resume.skill }}</text>
		</view>

		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">意向岗位</text>
			<view class="align-height">
				<picker @change="postChange" :value="resume.postName" :range="postArray" range-key="name">
					<input
						class="padding-10"
						style="text-align: right;"
						placeholder="请选择意向岗位"
						v-model="postName"
					/>
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>

		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">期望薪资</text>
			<view class="align-height">
				<picker @change="salaryChange" :value="resume.salary" :range="salaryArray">
					<input
						class="padding-10"
						style="text-align: right;"
						placeholder="请选择期望薪资"
						v-model="resume.salary"
					/>
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>

		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">工作经验</text>
			<view class="align-height">
				<picker @change="experienceChange" :value="resume.experience" :range="experienceArray">
					<input
						class="padding-10"
						style="text-align: right;"
						placeholder="请选择工作经验"
						v-model="resume.experience"
					/>
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>

		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">求职状态</text>
			<view class="align-height">
				<picker @change="jobStatusChange" :value="resume.jobStatus" :range="jobStatusArray">
					<input
						class="padding-10"
						style="text-align: right;"
						placeholder="请选择求职状态"
						v-model="resume.jobStatus"
					/>
				</picker>
				<text class="yzb yzb-next margin-left-10"></text>
			</view>
		</view>

		<view class="btn-row"><button type="primary" class="primary" @click="update">保存</button></view>
	</view>
</template>

<script>
import mCell from "@/components/m-cell/m-cell.vue";
import graceChecker from '@/common/graceChecker.js';
import formRuleConfig from '@/config/formRule.config.js';
import {
	formatDate,
	calCurrentYear
} from '@/common/date';
import { mapState } from 'vuex';
export default {
	components: {
		mCell
	},
	computed: {
		...mapState(['userInfo']),
	},
	data() {
		return {
			salaryArray:["面议","1-3K","3-5K","5-8K","8-12K","12-15K","15-20K","20K以上"],
			experienceArray:['1年以内','1-3年','3-5年','5-10年','10年以上'],
			jobStatusArray: ["在职-暂不考虑","在职-考虑机会","在职-月内到岗","离职-随时到岗"],
			postArray: [],
			postName:"",
			resume:{},
		}
	},
	onLoad() {
		this.getResume()
		this.getPositionList()

	},
		
	onShow(){
		this.getResume()
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
		
		async getPositionList(){
			const param = {
				current: 1,
				pageSize: 999,
			};
			const res = await this.$apis.getPositionList(param);
			this.postArray = res.list
			
			const list = this.postArray.filter((item)=>{ return item.id === this.resume.postId})
			if(list.length){
				this.postName = list[0].name
			}
		},

		async getResume(){
			this.resume = await this.$apis.getUserResume();
		},
	

		async salaryChange(e) {
			this.resume.salary = this.salaryArray[e.target.value];
		},
		async experienceChange(e) {
			this.resume.experience = this.experienceArray[e.target.value];
		},
		async jobStatusChange(e) {
			this.resume.jobStatus = this.jobStatusArray[e.target.value];
		},
		async postChange(e) {
			this.resume.postId = this.postArray[e.target.value].id
			this.postName = this.postArray[e.target.value].name
		},
		toUserEdit() {
			this.toEdit(this.$mRoutesConfig.userInfo)
		},
		toSkillEdit() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editSkill,
				query: {
					resume: JSON.stringify(this.resume),
				}
			});
		},

		toEdit(url,id) {
			this.$mRouter.push({
				route: url,
				query: {
					id: id
				}
			});
		},
		// 更新
		async update() {
			let res = await this.$apis.updateResume(this.resume);
			if(res){
				uni.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 2000
				});
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
			}
		},
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
.btn-row {
	position: fixed;
	bottom: 10upx;
	width: 100%;
	box-sizing: border-box;
	button {
		background-color: $main-color;
		height: 90upx;
		width: 100%;
		line-height: 90upx;
		font-size: $font-size-34;
	}
}
</style>
