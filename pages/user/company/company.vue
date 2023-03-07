<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px"><text class="super-title">基本信息</text></view>
			<!-- 			<view class="input-row border-bottom-1px" @click="uploadImg">
				<text class="title">公司Logo</text>
				<view class="align-height row">
					<view class="head-img"><image :src="company.logo || '/static/img/company.png'"></image></view>
					<text class="yzb yzb-next"></text>
				</view>
			</view> -->
			<view class="input-row border-bottom-1px">
				<text class="title">公司名称</text>
				<view class="input-row-item"><input class="padding-10" v-model="company.name" /></view>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">公司全称</text>
				<view class="input-row-item"><input class="padding-10" v-model="company.fullName" /></view>
			</view>
			<view class="input-row border-bottom-1px" @click="toIndustry()">
				<text class="title">所属行业</text>
				<view class="row">
					<input
						class="padding-10"
						disabled="true"
						style="text-align: right;"
						placeholder="请选择所属行业"
						:value="company.industryName"
					/>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">公司性质</text>
				<view class="picker row align-width">
					<picker @change="natureChange" :value="nature" :range="natureArray">
						<input
							class="padding-10"
							style="text-align: right;"
							placeholder="请选择公司性质"
							:value="company.nature"
						/>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-row border-bottom-1px">
				<text class="title">人员规模</text>
				<view class="picker row align-width">
					<picker @change="staffSizeChange" :value="staffSize" :range="staffSizeArray">
						<input
							class="padding-10"
							style="text-align: right;"
							placeholder="请选择人员规模"
							:value="company.staffSize"
						/>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px"><text class="super-title">福利待遇</text></view>
			<view class="welfare">
				<!-- <text class="items" v-for="(item, index) in company.welfare" :key="index" >{{item}}</text> -->
				<text class="items">社保</text>
				<text class="items">五险一金</text>
				<text class="items">节日福利</text>
			</view>
			<view class="input-column border-bottom-1px"><text class="super-title">工作时间</text></view>
			<view class="input-column border-bottom-1px">
				<text class="title">工作时间</text>
				<view class="row space-between-algin">
					<picker mode="time" v-model="date1" @change="bindDate1Change">
						<input class="padding-10" placeholder="开始时间" :value="date1" />
					</picker>
					至
					<picker mode="time" v-model="date2" @change="bindDate2Change">
						<input class="padding-10" style="text-align: center;" placeholder="结束时间" :value="date2" />
					</picker>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">休息时间</text>
				<view class="skill-item">
					<text
						v-for="(item, index) in restTimes"
						:key="index"
						@click="selectRest(index)"
						class="item"
						:class="item.name == company.restTime ? 'text-blue' : 'text-normal'"
					>
						{{ item.name }}
					</text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">加班情况</text>
				<view class="skill-item">
					<text
						v-for="(item, index) in overTimes"
						:key="index"
						@click="selectOverTime(index)"
						class="item"
						:class="item.name == company.workOvertime ? 'text-blue' : 'text-normal'"
					>
						{{ item.name }}
					</text>
				</view>
			</view>
			<view class="input-column border-bottom-1px"><text class="super-title">公司位置</text></view>
			<view class="input-column border-bottom-1px" @click="selectAddress">
				<text class="title">工作地点</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请选择工作地点" disabled="true" v-model="company.address" />
					<text class="yzb yzb-next"></text>
				</view>
				<text class="padding-width-10 text-color-grey text-size-base">{{ company.address }}</text>
			</view>
			<view class="input-column border-bottom-1px">
				<view class="space-between-algin" style="display: flex;">
					<text class="super-title">公司介绍</text>
					<text class="yzb yzb-bianji2" @click="toWorkContent(company.introduce)"></text>
				</view>

				<view class="skill width-100 padding-height-30 column bottom-line">
					<text class="item-content">{{ company.introduce }}</text>
				</view>
			</view>
			<!-- 			<view class="input-column border-bottom-1px"><text class="super-title">公司相册</text></view>
			<view class="module-image">
				<view class="image_view" v-for="(item, index) in ablumList" :key="index" v-if="ablumList.length > 0">
					<image :src="item" class="release_img" @click="previewImg(index)"></image>
					<view class="img_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
				</view>
				<view class="release_img center-algin release_img_dottedLine" @click="uploadImgs()" v-if="ablumList.length < 9"><text class="text-grey">+</text></view>
			</view> -->
		</view>
		<view class="btn-row row">
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { formatDate, calCurrentYear } from '@/common/date'
import uploadImage from '@/common/ossutil/uploadFile'
export default {
	components: {},
	computed: {
		...mapState(['userInfo'])
	},

	data() {
		return {
			id: 0,
			date1: '',
			date2: '',
			staffSizeArray: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
			natureArray: ['私营/民营企业', '国有企业', '合资企业', '其他'],
			industryArray: [],
			restTimes: [
				{
					name: '双休',
					selected: false
				},
				{
					name: '单休',
					selected: false
				},
				{
					name: '大小周',
					selected: false
				},
				{
					name: '排班轮休',
					selected: false
				}
			],
			overTimes: [
				{
					name: '不加班',
					selected: false
				},
				{
					name: '偶尔加班',
					selected: false
				},
				{
					name: '弹性工作',
					selected: false
				}
			],
			staffSize: null,
			nature: null,
			company: null,
			starttime: null,
			endtime: null,
			imgList: [],
			ablumList: [],
			welfareList: [],
			welfareName: '',
			welfareId: ''
		}
	},
	onLoad() {
		this.getCompanyInfo(this.userInfo.companyId)
		this.getIndustryList()
	},
	methods: {
		async getCompanyInfo(id) {
			let res = await this.$apis.getCompanyInfo(id)
			if (res) {
				this.company = res
				this.date1 = this.company.workTime.split('-')[0]
				this.date2 = this.company.workTime.split('-')[1]
			} else {
				this.company = {
					address: '',
					authId: null,
					cityId: null,
					enableStatus: true,
					fullName: '',
					id: '',
					industryId: '623bcdbb',
					introduce: '',
					logo: 'https://pan.whiteones.cn/d/PicGo/wuyou/company_avatar.png',
					name: '',
					nature: '',
					restTime: '',
					staffSize: '',
					workOvertime: '',
					workTime: ''
				}
			}
		},
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
		initSelectDatas() {
			for (let i = 0; i < this.restTimes.length; i++) {
				if (this.company.restTime == this.restTimes[i].name) {
					this.restTimes[i].selected = true
				} else {
					this.restTimes[i].selected = false
				}
			}
			for (let i = 0; i < this.overTimes.length; i++) {
				if (this.company.workOvertime == this.overTimes[i].name) {
					this.overTimes[i].selected = true
				} else {
					this.overTimes[i].selected = false
				}
			}
		},

		// async getWelfareList() {
		// 	let res = await this.$apis.getWelfareList()
		// 	if (res) {
		// 		this.welfareList = res
		// 		let selectWelfare = this.company.welfare.split(',')
		// 		for (let i = 0; i < this.welfareList.length; i++) {
		// 			for (let j = 0; j < selectWelfare.length; j++) {
		// 				if (this.welfareList[i].name == selectWelfare[j]) {
		// 					this.welfareList[i].selected = true
		// 				}
		// 			}
		// 		}
		// 	}
		// },

		staffSizeChange: function(e) {
			this.company.staffSize = this.staffSizeArray[e.target.value]
		},
		natureChange: function(e) {
			this.company.nature = this.natureArray[e.target.value]
		},

		bindDate1Change: function(e) {
			this.date1 = e.target.value
			console.log(this.date1)
		},
		bindDate2Change: function(e) {
			this.date2 = e.target.value
			console.log(this.date2)
		},

		// 选择图片
		uploadImg() {
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

		// 选择图片
		uploadImgs() {
			let that = this
			this.cover = ''
			uni.chooseMedia({
				count: 9 - that.ablumList.length,
				mediaType: ['image'],
				sourceType: ['album', 'camera'],
				maxDuration: 30,
				camera: 'back',
				success(res) {
					console.log(res)
					console.log(res.tempFiles)
					let tmpFiles = res.tempFiles
					if (res.type == 'video') {
						that.mediaType = 1
						let data = that.imgList
						if (data.length < 9) {
							data.push(tmpFiles[0].tempFilePath)
						}
						that.imgList = data
					} else {
						let data = that.imgList
						if (data.length < 9) {
							for (var i = 0; i < tmpFiles.length; i++) {
								data.push(tmpFiles[i].tempFilePath)
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '最多只能有九张图片'
							})
							return
						}
						that.imgList = data
					}
					that.uploadFiles()
				}
			})
		},

		// 上传图片
		uploadFiles() {
			uni.showLoading()
			for (var i in this.imgList) {
				if (this.mediaType == 1) {
					uploadImage(1, this.imgList[i], 'video/', result => {
						// console.log('视频上传结果：', result);
						this.videoUrl = result
						this.cover = result + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_800,h_600,m_fast,ar_auto'
						this.ablumList.push(result)
						if (this.imgList.length == this.ablumList.length) {
							// 图片上传完调用提交帖子
							// this.addPost();
						}
					})
				} else {
					uploadImage(0, this.imgList[i], 'images/', result => {
						// console.log('图片上传结果：', result);
						// this.imageUrl = result;
						this.ablumList.push(result)

						if (this.imgList.length == this.ablumList.length) {
							// 图片上传完调用提交帖子
							// this.addPost();
						}
					})
				}
			}
			this.imgList = []
			uni.hideLoading()
			console.log('ablumList===', this.ablumList)
		},

		// 查看图片
		previewImg(index) {
			uni.previewImage({
				indicator: 'number',
				loop: true,
				current: this.ablumList[index],
				urls: this.ablumList
			})
		},

		// 删除图片
		deleteImg(index) {
			if (this.mediaType == 0) {
				this.ablumList.splice(index, 1)
				// this.imgList.splice(index, 1);
			} else {
				this.imgList = []
				this.mediaType = 0
				this.$forceUpdate()
			}
		},

		selectAddress() {
			uni.chooseLocation({
				success: res => {
					console.log('选择详细地址结果')
					console.log(res)
					console.log(res.name)
					console.log(res.address)
					if (res.address == '') {
						this.address = '请选择详细地址'
						return
					}
					this.company.addressName = res.name
					this.company.address = res.address
					console.log(this.company.address)
					this.company.latitude = res.latitude
					this.company.longitude = res.longitude
				}
			})
		},

		toWorkContent(content) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editProContent,
				query: {
					type: 4,
					content: this.company.introduce
				}
			})
		},

		async save() {
			this.company.workTime = this.date1 + '-' + this.date2
			let res = await this.$apis.updateCompanyInfo(this.company)
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
		select(index) {
			this.welfareList[index].selected = !this.welfareList[index].selected
			this.$forceUpdate()
			//获取已选择的
			// this.selected=[];
			this.welfareName = ''
			this.welfareId = ''
			for (let i = 0; i < this.welfareList.length; i++) {
				if (this.welfareList[i].selected == true) {
					// this.selected.push(this.welfareList[i]);
					this.welfareName = this.welfareName + ',' + this.welfareList[i].name
					this.welfareId = this.welfareId + ',' + this.welfareList[i].id
				}
			}
			this.welfareName = this.welfareName.substr(1, this.welfareName.length)
			this.welfareId = this.welfareId.substr(1, this.welfareId.length)
			console.log(this.welfareName)
			this.company.welfare = this.welfareName
		},

		/**
		 * 选择休息时间
		 */
		selectRest(index) {
			if (this.restTimes[index].selected == false) {
				//选中
				//把其他的全部关闭
				for (let i = 0; i < this.restTimes.length; i++) {
					if (i == index) {
						this.restTimes[index].selected = true
						this.company.restTime = this.restTimes[index].name
					} else {
						this.restTimes[i].selected = false
					}
				}
			} else {
				this.restTimes[index].selected = false
				this.company.restTime = ''
			}
			this.$forceUpdate()
		},

		/**
		 * 选择加班情况
		 */
		selectOverTime(index) {
			if (this.overTimes[index].selected == false) {
				//选中
				//把其他的全部关闭
				for (let i = 0; i < this.overTimes.length; i++) {
					if (i == index) {
						this.overTimes[index].selected = true
						this.company.workOvertime = this.overTimes[index].name
					} else {
						this.overTimes[i].selected = false
					}
				}
			} else {
				this.overTimes[index].selected = false
				this.company.workOvertime = ''
			}
			this.$forceUpdate()
		},
		toIndustry() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.industry
			})
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
	box-sizing: border-box;
	.input-row-item {
		width: 100%;
		input {
			text-align: right;
		}
	}
}

.welfare {
	display: flex;
	flex-direction: row;
	margin-top: 25upx;
	padding-left: 30upx;
	flex-wrap: wrap;
	.items {
		font-size: $uni-font-size-base;
		padding: 10upx 20upx;
		margin-right: 15upx;
		background-color: $border-color-base;
		border-radius: 5upx;
		color: $font-color-666;
		margin-top: 15upx;
	}
}

.yzb-next {
	color: $font-color-999;
	text-align: center;
	margin-top: 5upx;
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
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
}

radio-group {
	margin-right: 10upx;
}

.radio {
	margin-left: 20upx;
}

.super-title {
	font-size: $font-size-36;
	font-weight: bold;
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
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
		}
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

	text {
		font-size: $uni-font-size-sm;
		padding: 12upx 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		// background-color: $border-color-base;
		border-radius: 8upx;
		// color: $font-color-666;
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

.module-image {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20upx 0;
	view {
		display: flex;
	}
}
.release_img {
	width: 220upx;
	height: 220upx;
	margin-left: 20upx;
	margin-bottom: 10upx;
}
.release_img_dottedLine {
	border: 1px dashed rgba(138, 138, 138, 1);
}
.release_img text {
	font-size: 50upx;
}

.release_img2 {
	width: 700upx;
	height: 450upx;
	margin-left: 20upx;
	margin-bottom: 10upx;
}

.image_view {
	position: relative;
}

.image_view2 {
	position: relative;
	width: 94%;
	margin: 0 3%;
}

.img_delete {
	width: 45upx;
	height: 45upx;
	border-radius: 50%;
	background: rgba(234, 178, 178, 0.5);
	position: absolute;
	right: -15upx;
	top: -15upx;
	z-index: 10;
}
.release-bottom {
	width: 100%;
	height: 100upx;
	position: fixed;
	bottom: 0;
	left: 0;
}
.item-content {
	font-size: 30upx;
}
</style>
