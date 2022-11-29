<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px">
				<text class="title">公司名称</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请输入公司名称" v-model="companyName" />
					<!-- <m-input type="text" clearable v-model="params.userName" placeholder="请输入公司名称" :maxLength="30"></m-input> -->
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toIndustry()">
				<text class="title">所在行业</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择期望行业" :value="selectIndustryName" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">在职时间</text>
				<view class="row space-between-algin">
					<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDate1Change">
						<input class="padding-10" placeholder="开始时间" :value="formatDates(date1)" />
					</picker>
					至
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDate2Change">
						<input class="padding-10" style="text-align: center;" placeholder="结束时间" :value="formatDates(date2)" />
					</picker>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toPost()">
				<text class="title">职位名称</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择期望职位" v-model="selectPost.name" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toWorkContent">
				<text class="title">工作内容</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请输入工作内容" v-model="workContent" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<!-- <view class="input-column border-bottom-1px">
				<text class="title">拥有技能</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择拥有技能" :value="salaryValue" />
					<text class="yzb yzb-next"></text>
				</view>
			</view> -->
			<view class="input-column border-bottom-1px">
				<text class="title">技能标签</text>
				<view class="skill-item">
					<view class="center-algin skill-item-item" v-for="(item, index) in skills" :key="index">
						<text class="item text-blue" @click="select(index)">
							{{item}}
						</text>
						<view class="img_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
					</view>
					<text class="item text-normal" @click="confirmDialog">
						   + 添加  
					</text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">所属部门</text>
				<view class="space-between-algin row padding-height-20"><input class="padding-10" placeholder="请填入部门名称" v-model="department" /></view>
			</view>
		</view>
		<view class="btn-row row">
			<button v-if="id" type="warn" class="btn-delete" @tap="remove">删除</button>
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>
		
		<!-- 提交信息 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" :title="dialogTitle" :value="value" placeholder="请输入内容(3-8字)" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import {
		formatDate,
		calCurrentYear
	} from '@/common/date';
export default {
	components: {
	},
	computed: {
		...mapState(['openId', 'customerInfo']),
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			id: 0,
			date1: currentDate,
			date2: currentDate,
			workContent: null,
			selectPost: {
				name: '',
				id: ''
			},
			selectIndustrys: null,
			selectIndustryName: '行业不限',
			selectIndustryIds: '0',
			companyName: '',
			department: '',
			skills:[],
			dialogTitle:'添加关键词',
			value:"",
		};
	},
	onLoad(query) {
		this.id = query.id;
		if (this.id) {
			this.getDetail();
		}
	},
	methods: {
		
		formatDates(time){
			if (time == null || time === '') {
			  return 'N/A';
			}
			let date = new Date(time);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'yyyy-MM-dd')
		},
		
		async getDetail() {
			let res = await this.$apis.getWorkExpDetail({ id: this.id });
			if (res) {
				this.selectPost.id = res.postId;
				this.selectPost.name = res.postName;
				this.selectIndustryName = res.industryName;
				this.selectIndustryIds = res.industryId;
				this.date1 = res.startDate;
				this.date2 = res.endDate;
				this.workContent = res.jobContent;
				this.companyName = res.companyName;
				this.department = res.department;
				if(res.personalSkill){
					this.skills=res.skill.split(",");
				}
			}
			console.log(res);
		},

		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},

		bindDate1Change: function(e) {
			console.log(e.target.value);
			this.date1 = e.target.value;
		},
		bindDate2Change: function(e) {
			this.date2 = e.target.value;
		},

		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.salaryIndex = e.target.value;
			console.log(this.salaryIndex[0]);
			let a = this.salaeyArray[0][this.salaryIndex[0]].value;
			let b = this.salaeyArray[1][this.salaryIndex[1]].value;
			console.log(a);
			console.log(b);
			this.salaryValue = a + '-' + b;
		},

		toIndustry() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.industry,
				query: {
					id: 1
				}
			});
		},

		toPost() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
				query: {
					id: 1
				}
			});
		},

		toWorkContent() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editWorkContent,
				query: {
					id: 1
				}
			});
		},

		// 点击注册按钮
		async register() {
			console.log(this.companyName);
			if (!this.companyName) {
				uni.showToast({
					icon: 'none',
					title: '请输入公司名称'
				});
				return;
			}
			if (!this.selectPost.name) {
				uni.showToast({
					icon: 'none',
					title: '请选择职位'
				});
				return;
			}
			if (!this.workContent) {
				uni.showToast({
					icon: 'none',
					title: '请输入工作内容'
				});
				return;
			}
			
			if (this.skills.length==0) {
				uni.showToast({
					icon: 'none',
					title: '请添加技能标签'
				});
				return;
			}
			if (!this.date1) {
				uni.showToast({
					icon: 'none',
					title: '请选择开始时间'
				});
				return;
			}
			
			let skill="";
			for(let i in this.skills){
				skill=skill+","+this.skills[i];
			}
			skill=skill.substr(1,skill.length);
			let expect = {
				id: null,
				postId: this.selectPost.id,
				postName: this.selectPost.name,
				industryId: this.selectIndustryIds,
				industryName: this.selectIndustryName,
				startDate: this.date1,
				endDate: this.date2,
				jobContent: this.workContent,
				companyName: this.companyName,
				department: this.department,
				skill:skill,
			};
			if (this.id && this.id != 0) {
				expect.id = this.id;
			}
			let res = await this.$apis.updateWorkExp(expect);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		async remove(){
			let res=await this.$apis.deleteWorkExpById({id:this.id});
			if(res){
				uni.navigateBack({
					delta:1
				})
			}
		},
		
		
		/**
		 * 打开提交信息
		 */
		confirmDialog() {
			this.dialogTitle="添加技能标签";
			this.value=null;
			this.$refs.dialogInput.open();
		},
		
		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(done, val) {
			console.log(val);
			// this.value = val;
			// if(!this.value){
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:"请输入内容"
			// 	})
			// 	return;
			// }
			// if(this.value.length<3 || this.value.length >8){
			// 	uni.showToast({
			// 		icon:'none',
			// 		title:"请输入3-8个字"
			// 	})
			// 	return;
			// }
			// this.skills.push(this.value);
			this.skills.push(val);
			this.$refs.dialogInput.close();
		},
		
		select(index){
			this.dialogTitle="修改技能标签";
			this.value=this.skills[index];
			// this.value=null;
			this.$refs.dialogInput.open();
		},
		
		deleteImg(index){
			this.skills.splice(index,1);
		},
	}
};
</script>

<style lang="scss" scoped>
input {
	width: 90%;
}
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 120upx;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	background: #fff;
	justify-content: space-between;
	align-items: center;
	padding: 15upx 10upx;
}

.input-row .title {
	width: 25%;
	padding: 20upx 0;
	padding-left: 20upx;
	line-height: 50upx;
}

.border-bottom-1px {
	position: relative;

	&::after {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		left: 20upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e2e2e2;
	}
}

.header {
	display: flex;
	flex-direction: column;
	.tip {
		font-size: $uni-font-size-sm;
		color: $font-color-666;
		margin-left: 20upx;
	}
}

.head-img {
	margin-right: 15upx;
	image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}
}

radio-group {
	margin-right: 10upx;
}

.radio {
	margin-left: 20upx;
}

.input-column {
	display: flex;
	flex-direction: column;
	background-color: $bgcolor_white;
	padding: 30upx 20upx 10upx 20upx;

	.title {
		margin-left: 10upx;
	}

	.input-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.picker {
		padding: 30upx 0;
		margin-left: 10upx;
		position: relative;
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
			position: absolute;
		}
	}
	.yzb-next {
		float: right;
		color: $font-color-999;
	}
}

.content {
	background: $bgcolor_white;
}

.btn-row {
	position: fixed;
	z-index: 99;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
		width: 30%;
	}

	.btn-save {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
	.width-55 {
		width: 55%;
	}

	.width-90 {
		width: 90%;
	}
}


.text-blue {
	color: $main-color;
	border: 1upx solid $main-color;
	background-color: $main-color;
	color: #ffffff;
}
.text-normal {
	color: $font-color-666;
	border: 1upx solid $border-color-base;
}

.skill-item {
	padding: 20upx;
	flex-wrap: wrap;
	display: flex;
	.skill-item-item{
		position: relative;
		margin-right: 20upx;
	}
	.item {
		font-size: $uni-font-size-sm;
		padding: 12upx 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		// background-color: $border-color-base;
		border-radius: 8upx;
		// color: $font-color-666;
	}
}
</style>
