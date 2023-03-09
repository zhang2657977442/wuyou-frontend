<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px">
				<text class="title">姓名</text>
				<view class="input-item">
					<m-input
						type="text"
						clearable
						v-model="resumeInfo.name"
						placeholder="请输入姓名"
						:maxLength="30"
					></m-input>
					<!-- 					<text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">性别</text>
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="男" checked="true" />
						男
					</label>
					<label class="radio">
						<radio value="女" />
						女
					</label>
				</radio-group>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">出生年月</text>
				<view class="picker">
					<picker
						mode="date"
						:value="resumeInfo.birthday"
						:start="startDate"
						:end="endDate"
						@change="bindBirthdayChange"
					>
						<view class="uni-input">{{ resumeInfo.birthday }}</view>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">最高学历</text>
				<view class="picker">
					<picker :value="resumeInfo.education" :range="array" @change="bindPickerChange">
						<input class="padding-10" placeholder="请选择学历" :value="resumeInfo.education" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">工作经验</text>
				<view class="picker">
					<picker :value="resumeInfo.experience" :range="exparray" @change="bindExpChange">
						<input class="padding-10" placeholder="请选择学历" :value="resumeInfo.experience" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>

		<view class="btn-row"><button type="primary" class="primary" @tap="update">保存</button></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import mInput from '@/components/m-input/m-input.vue'
import mCell from '@/components/m-cell/m-cell.vue'
import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue'
import cityData from '@/common/cityData.js'
import graceChecker from '@/common/graceChecker.js'
import mUpimg from '@/components/m-upimg/m-upimg.vue'
import mCodedialog from '@/components/m-codedialog/m-codedialog.vue'
import formRuleConfig from '@/config/formRule.config.js'
export default {
	components: {
		mInput,
		mCell,
		mpvuePicker,
		mUpimg,
		mCodedialog
	},
	computed: {
			...mapState(['userInfo']),
		startDate() {
			return this.getDate('start')
		},
		endDate() {
			return this.getDate('end')
		}
	},

	data() {
		const currentDate = this.getDate({
			format: true
		})
		return {
			array: ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士'],
			exparray: ['1年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
			isCreate: true,
			resumeInfo: {
				userId: "",
				birthday: currentDate,
				experience: '',
				name: '',
				gender: '男',
				education: ''
			}
		}
	},
	onLoad() {
		this.getUserResume()
		this.resumeInfo.userId = this.userInfo.id
	},
	methods: {
		async getUserResume() {
			const res = await this.$apis.getUserResume()
			if (res) {
				this.resumeInfo = res
				this.isCreate = false
			} else {
				this.isCreate = true
			}
		},

		radioChange(e) {
			this.resumeInfo.gender = e.target.value
		},

		bindBirthdayChange: function(e) {
			this.resumeInfo.birthday = e.target.value
		},

		bindPickerChange: function(e) {
			this.resumeInfo.education = this.array[e.target.value]
		},

		bindExpChange: function(e) {
			this.resumeInfo.experience = this.exparray[e.target.value]
		},

		getDate(type) {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()

			if (type === 'start') {
				year = year - 60
			} else if (type === 'end') {
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			return `${year}-${month}-${day}`
		},

		// 更新
		async update() {
			let checkRes = graceChecker.check(this.resumeInfo, formRuleConfig.regResumeBaseRule)
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				})
				return
			}
			let res = null
			if (this.isCreate) {
				res = await this.$apis.addResume(this.resumeInfo)
			} else {
				res = await this.$apis.updateResume(this.resumeInfo)
			}
			if (res) {
				uni.showToast({
					title: '保存成功',
					icon: 'success',
					duration: 2000
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
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
		padding: 30upx 0 20upx 0;
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
	bottom: 10upx;
	width: 100%;
	box-sizing: border-box;
	button {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
}
</style>
