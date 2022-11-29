<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px">
				<text class="title">学校名称</text>
				<view class="input-item"><input class="padding-10" placeholder="请输入学校名称" v-model="school" /></view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">学历</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="education" :range="array">
						<!-- <view class="uni-input">{{ education}}</view> -->
						<input class="padding-10" placeholder="请选择学历" :value="education" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">专业</text>
				<view class="input-item"><input class="padding-10" placeholder="请输入专业名称" v-model="major" /></view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">时间段</text>
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
			<view class="input-column border-bottom-1px" @click="toWorkContent(content)">
				<text class="title">在校经历</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="选填 请输入" v-model="content" />
					<text class="yzb yzb-next"></text>
				</view>
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
import { formatDate, calCurrentYear } from '@/common/date';
export default {
	components: {},
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
			content: null,
			school: null,
			major:null,
			array: ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士'],
			education: null,
			
		};
	},
	onLoad(query) {
		console.log(query);
		this.id = query.id;
		if (this.id) {
			this.getDetail();
		}
	},
	methods: {
		formatDates(time) {
			if (time == null || time === '') {
				return null;
			}
			let date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd');
		},

		async getDetail() {
			let res = await this.$apis.getEduExpDetail({ id: this.id });
			if (res) {
				this.date1 = res.startTime;
				this.date2 = res.endTime;
				this.content = res.jobContent;
				this.school = res.school;
				this.major = res.major;
				this.content=res.schoolExp;
				this.education=res.education;
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

		bindPickerChange: function(e) {
			console.log(e.target.value);
			this.education = this.array[e.target.value];
		},

		bindDate1Change: function(e) {
			console.log(e.target.value);
			this.date1 = e.target.value;
		},
		bindDate2Change: function(e) {
			this.date2 = e.target.value;
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
		
		toWorkContent(content) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editProContent,
				query: {
					type: 3,
					content:content
				}
			});
		},

		// 点击注册按钮
		async register() {
			if (!this.school) {
				uni.showToast({
					icon: 'none',
					title: '请输入学校名称'
				});
				return;
			}
			if (!this.major) {
				uni.showToast({
					icon: 'none',
					title: '请输入专业名称'
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
			if (!this.date2) {
				uni.showToast({
					icon: 'none',
					title: '请选择结束时间'
				});
				return;
			}
			let expect = {
				id: null,
				school: this.school,
				major:this.major,
				education: this.education,
				startTime: this.date1,
				endTime: this.date2,
				schoolExp: this.content
			};
			if (this.id && this.id != 0) {
				expect.id = this.id;
			}
			let res = await this.$apis.updateEduExp(expect);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		async remove() {
			let res = await this.$apis.deleteEduExpById({ id: this.id });
			if (res) {
				uni.navigateBack({
					delta: 1
				});
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
