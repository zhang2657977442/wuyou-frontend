<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="result-dairenzheng" v-if="companyAuth.verifyStatus == 1">
				<text class="yzb yzb-dairenzheng"></text>
				<text>认证审核中</text>
			</view>
			<view class="result-renzheng" v-if="companyAuth.verifyStatus == 3">
				<text class="yzb yzb-renzheng"></text>
				<text>认证通过</text>
			</view>
			<view class="result-shibai" v-if="companyAuth.verifyStatus == 2">
				<text class="yzb yzb-gerenrenzhengchenggo"></text>
				<text>认证失败</text>
			</view>
			<view class="failure-reason" v-if="companyAuth.verifyStatus == 2">
				<text class="yzb yzb-tixing"></text>
				<text>失败原因：{{ companyAuth.refuseReason }}</text>
			</view>
			<!-- <view class="notice">
				<text class="yzb yzb-tixing"></text>
				<text>温馨提示：</text>
				<text>完成实名认证可提高成功率哦！</text>
			</view> -->
			<view style="padding: 20upx;">
				<uni-forms ref="baseForm" :modelValue="companyAuth">
					<uni-forms-item label="公司名称" required><uni-easyinput v-model="companyAuth.realName" placeholder="请输入公司名称" /></uni-forms-item>
					<uni-forms-item label="法人姓名" required><uni-easyinput v-model="companyAuth.legalPerson" placeholder="请输入法人姓名" /></uni-forms-item>
					<uni-forms-item label="信用代码" required><uni-easyinput v-model="companyAuth.identity" placeholder="请输入统一社会信用代码" /></uni-forms-item>
				</uni-forms>
				<uni-forms-item label="营业执照" required label-position="top">
					<!-- 	<uni-file-picker @select="select()" v-model="companyAuth.license" limit="4" title="请上传相关照片信息"></uni-file-picker>
					<text style="color: #666;">认证资料包括：\n1、带有企业的公章的营业执照复印件；\n2、招聘员的在职证明；\n3、招聘员身份证；\n4、招聘委托书</text>
				 -->
					<view class="module-image">
						<view class="image_view" v-for="(item, index) in ablumList" :key="index" v-if="ablumList.length > 0">
							<image :src="item" class="release_img" @click="uploadImgs(index)"></image>
							<view class="im'g_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
						</view>
						<view class="release_img center-algin release_img_dottedLine" @click="uploadImgs()" v-if="ablumList.length < 1"><text class="text-grey">+</text></view>
					</view>
				</uni-forms-item>
			</view>
		</view>
		<view class="btn-row" v-if="!companyAuth.verifyStatus || companyAuth.verifyStatus == 0 || companyAuth.verifyStatus == 2">
			<button type="primary" class="primary" @tap="update">提交</button>
		</view>
	</view>
</template>

<script>
import mInput from '@/components/m-input/m-input.vue';
import graceChecker from '@/common/graceChecker.js';
import formRuleConfig from '@/config/formRule.config.js';
export default {
	components: {
		mInput
	},
	computed: {
	},

	data() {
		return {
			companyAuth: {
				verifyStatus: 0, //认证状态：0 未认证 1 等待认证 2 认证失败,3 认证通过
				realName: '',
				legalPerson: '',
				identity: '',
				companyLicense: null,
			},
			ablumList:[],
			imgList: [],
			mediaType:0,
		};
	},
	async onLoad() {
		this.getDetail();
	},
	methods: {

		async getDetail(){
			uni.showLoading();
			let res = await this.$apis.getCompanyDetail();
			console.log("getDetail====",res);
			if (res) {
				this.companyAuth = res;
				if(res.businessLicense){
					this.ablumList = res.businessLicense.split(',');
				}
				this.$forceUpdate();
				console.log(this.companyAuth);
			}
			uni.hideLoading();
		},

		async update() {
			var img = '';
			for (var i in this.ablumList) {
				img += this.ablumList[i] + ',';
			}
			if (img.length > 0) {
				img = img.substr(0, img.length - 1);
			}
			this.companyAuth.businessLicense=img;
			let checkRes = graceChecker.check(this.companyAuth, formRuleConfig.regCompanyAuthRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			let param=JSON.parse(JSON.stringify(this.companyAuth));
			param.verifyStatus=1;
			let res = await this.$apis.updateCompanyAuth(param);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
			
		},
		
		// 选择图片
		uploadImgs() {
			let that = this;
			this.cover = '';
			uni.chooseMedia({
				count: 9 - that.ablumList.length,
				mediaType: ['image'],
				sourceType: ['album', 'camera'],
				maxDuration: 30,
				camera: 'back',
				success(res) {
					console.log(res);
					console.log(res.tempFiles);
					let tmpFiles = res.tempFiles;
					if (res.type == 'video') {
						that.mediaType = 1;
						let data = that.imgList;
						if (data.length < 9) {
							data.push(tmpFiles[0].tempFilePath);
						}
						that.imgList = data;
					} else {
						let data = that.imgList;
						if (data.length < 9) {
							for (var i = 0; i < tmpFiles.length; i++) {
								data.push(tmpFiles[i].tempFilePath);
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '最多只能有九张图片'
							});
							return;
						}
						that.imgList = data;
					}
					that.uploadFiles();
				}
			});
		},
		
		// 上传图片
		uploadFiles() {
			uni.showLoading();
			for (var i in this.imgList) {
				if (this.mediaType == 1) {
					uploadImage(1, this.imgList[i], 'hjy/auth/', result => {
						this.videoUrl = result;
						this.cover = result + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_800,h_600,m_fast,ar_auto';
						this.ablumList.push(result);
					});
				} else {
					uploadImage(0, this.imgList[i], 'hjy/auth/', result => {
						console.log('图片上传结果：', result);
						this.ablumList.push(result);
					});
				}
			}
			this.imgList = [];
			uni.hideLoading();
			console.log('ablumList===', this.ablumList);
		},
		
		// 查看图片
		previewImg(index) {
			uni.previewImage({
				indicator: 'number',
				loop: true,
				current: this.ablumList[index],
				urls: this.ablumList
			});
		},
		
		// 删除图片
		deleteImg(index) {
			if (this.mediaType == 0) {
				this.ablumList.splice(index, 1);
			} else {
				this.imgList = [];
				this.mediaType = 0;
				this.$forceUpdate();
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
	margin-bottom: 100upx;
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
	margin: 0 20upx;
	border-bottom: 1upx solid #e2e2e2;
}

.border-top-1px {
	margin: 0 20upx;
	border-top: 1upx solid #e2e2e2;
}
.result-dairenzheng {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20upx;

	text:first-child {
		font-size: 100upx;
		color: $font-color-orange;
		font-weight: bold;
	}
	text:nth-child(2) {
		font-size: 40upx;
		color: $font-color-orange;
		font-weight: bold;
	}
}
.result-renzheng {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20upx;

	text:first-child {
		font-size: 100upx;
		color: $uni-color-success;
		font-weight: bold;
	}
	text:nth-child(2) {
		font-size: 40upx;
		color: $uni-color-success;
		font-weight: bold;
	}
}
.result-shibai {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20upx;

	text:first-child {
		font-size: 100upx;
		color: $uni-color-error;
		font-weight: bold;
	}
	text:nth-child(2) {
		font-size: 40upx;
		color: $uni-color-error;
		font-weight: bold;
	}
}

.failure-reason {
	color: $uni-color-error;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-size: $uni-font-size-lg;
	text:nth-child(1) {
		margin-right: 10upx;
	}
}

.notice {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 20upx;
	.yzb-tixing {
		margin-right: 10upx;
		color: $uni-color-warning;
		font-weight: bold;
		font-size: $font-size-40;
	}
	text:last-child {
		color: $font-color-666;
	}
}

.bind-phone {
	color: $font-color-666;
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

.module-image {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20upx 0;
	view {
		display: flex;
	}
	.image_view{
		width:100%
	}
	.release_img {
		width: 95%;
		height: 300upx;
		margin-left: 20upx;
		margin-bottom: 10upx;
	}
	.release_img_dottedLine {
		border: 1px dashed rgba(138, 138, 138, 1);
	}
	.release_img text {
		font-size: 50upx;
	}
}
</style>
