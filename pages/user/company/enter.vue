<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px" @click="uploadImgs">
				<view class="header">
					<text class="title">公司Logo</text>
					<text class="tip">公司Logo将出现在公司主页、公司职位等位置！</text>
				</view>
				<view class="head-img"><image :src="company.logo || '/static/img/company.png'"></image></view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司简称</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请输入公司简称" v-model="company.name" />
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司全称</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请输入公司全称" v-model="company.fullName" />
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toIndustry()">
				<text class="title">所在行业</text>
				<view class="picker">
					<picker @change="industryChange" :value="company.industryName" :range="industryArray" range-key="name">
						<input class="padding-10" placeholder="请选择所在行业" :value="company.industryName" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">公司性质</text>
				<view class="picker">
					<picker @change="natureChange" :value="company.nature" :range="natureArray">
						<input class="padding-10" placeholder="请选择公司性质" :value="company.nature" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">人员规模</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="company.staffSize" :range="array">
						<input class="padding-10" placeholder="请选择人员规模" :value="company.staffSize" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>
		<view class="btn-row row">
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate, calCurrentYear } from '@/common/date'
import formRuleConfig from '@/config/formRule.config.js'
import graceChecker from '@/common/graceChecker.js'
export default {
	components: {},
	computed: {
		...mapState(['userInfo'])
	},

	data() {
		return {
			array: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
			industryArray:[],
			natureArray: ['私营/民营企业', '国有企业', '合资企业', '其他'],
			company: {
				logo: null,
				name: null,
				fullName: null,
				industryId: null,
				industryName: null,
				staffSize: null,
				introduce:'',
				address:'',
				workTime:'',
				restTime: '',
				workOvertime:'',
				cityId:null,
				nature:null,
			}
		}
	},
	onLoad(query) {
		this.getIndustryList()
	},
	methods: {
		async getIndustryList() {
			let param = {
				current: 1,
				pageSize: 999
			}
			let res = await this.$apis.getIndustryList(param)
			if (res) {
				this.industryArray = res.list.filter(item => item.pid === null)
			}
		},
		
		bindPickerChange: function(e) {
			this.company.staffSize = this.array[e.target.value]
		},
		industryChange:function(e){
			this.company.industryId = this.industryArray[e.target.value].id
			this.company.industryName = this.industryArray[e.target.value].name
		},
		natureChange: function(e) {
			this.company.nature = this.natureArray[e.target.value]
		},

		

		// 选择图片
		uploadImgs() {
			let that = this
			uni.chooseImage({
				success(res) {
					let tempFilePaths = res.tempFilePaths
					that.tmpImageUrl = tempFilePaths[0]
					that.uploadFile()
				}
			})
		},

		// 上传图片
		uploadFile() {
			uni.showLoading({
				title: '图片上传中'
			})
			uploadImage(0, this.tmpImageUrl, 'job/user/', result => {
				console.log('图片上传结果：', result)
				this.company.logo = result
				uni.hideLoading()
			})
		},

		// 点击注册按钮
		async register() {
			let checkRes = graceChecker.check(this.company, formRuleConfig.regCompanyRule)
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				})
				return
			}
			let res = null
			if(this.userInfo.companyId){
			res = await this.$apis.updateCompanyInfo(this.company)
			}
			else{
			res = await this.$apis.addCompany(this.company)
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
		},

		async remove() {
			let res = await this.$apis.deleteEduExpById({ id: this.id })
			if (res) {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
}
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
