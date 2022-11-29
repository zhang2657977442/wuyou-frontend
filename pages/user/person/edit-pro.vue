<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px">
				<text class="title">项目名称</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请输入项目名称" v-model="name" />
					<!-- <m-input type="text" clearable v-model="params.userName" placeholder="请输入公司名称" :maxLength="30"></m-input> -->
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">担任角色</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请输入担任角色" v-model="role" />
					<!-- <m-input type="text" clearable v-model="params.userName" placeholder="请输入公司名称" :maxLength="30"></m-input> -->
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">项目时间</text>
				<view class="row space-between-algin">
					<picker mode="date" v-model="date1" :start="startDate" :end="endDate" @change="bindDate1Change">
						<input class="padding-10" placeholder="开始时间" :value="formatDates(date1)" />
					</picker>
					至
					<picker mode="date" v-model="date2" :start="startDate" :end="endDate" @change="bindDate2Change">
						<input class="padding-10" style="text-align: center;" placeholder="结束时间" :value="formatDates(date2)" />
					</picker>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toWorkContent(1,descr)">
				<text class="title">项目描述</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请输入项目描述" v-model="descr" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toWorkContent(2,performance)">
				<text class="title">项目业绩</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="选填 请输入项目业绩" v-model="performance" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">项目链接</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" placeholder="选填 请填入项目链接" v-model="url" /></view>
			</view>
		</view>
		<view class="btn-row row">
			<button v-if="id" type="warn" class="btn-delete" @tap="remove">删除</button>
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>
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
			date1: null,
			date2: null,
			name: null,
			role: null,
			descr: null,
			performance: null,
			url:null,
		};
	},
	onLoad(query) {
		console.log(this.date1);
		console.log(this.date2);
		this.id = query.id;
		if (this.id) {
			this.getDetail();
		}
	},
	methods: {
		
		
		formatDates(time){
			if (time == null || time === '') {
			  return null;
			}
			let date = new Date(time);
			// return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			return formatDate(date, 'yyyy-MM-dd')
		},
		
		async getDetail() {
			let res = await this.$apis.getProExpDetail({ id: this.id });
			if (res) {
				this.date1 = res.startDate;
				this.date2 = res.endDate;
				this.name = res.name;
				this.role = res.role;
				this.descr = res.descr;
				this.performance = res.performance;
				this.url = res.url;
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

		toWorkContent(type,content) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editProContent,
				query: {
					type: type,
					content:content
				}
			});
		},

		// 点击注册按钮
		async register() {
			console.log(this.date1);
			console.log(this.date2);
			if (!this.name) {
				uni.showToast({
					icon: 'none',
					title: '请输入项目名称'
				});
				return;
			}
			if (!this.role) {
				uni.showToast({
					icon: 'none',
					title: '请输入担任角色'
				});
				return;
			}
			if (!this.descr) {
				uni.showToast({
					icon: 'none',
					title: '请输入项目描述'
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
			let expect = {
				id: null,
				startDate: this.date1,
				endDate: this.date2,
				name: this.name,
				role: this.role,
				descr: this.descr,
				performance: this.performance,
				url: this.url
			};
			if (this.id && this.id != 0) {
				expect.id = this.id;
			}
			let res = await this.$apis.updateProExp(expect);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		async remove(){
			let res=await this.$apis.deleteProExpById({id:this.id});
			if(res){
				uni.navigateBack({
					delta:1
				})
			}
		}
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
	z-index: 999;
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
</style>
