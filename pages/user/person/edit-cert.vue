<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<view class="header">
					<text class="title">头像</text>
					<text class="tip">上传真实头像，BOSS回复率翻倍哦！</text>
				</view>
				<view class="head-img">
					<!-- <image src="../../static/img/ad-2.png"></image> -->
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">姓名</text>
				<view class="input-item">
					<m-input type="text" clearable v-model="params.userName" placeholder="请输入姓名" :maxLength="30">
					</m-input>
					<!-- <text class="yzb yzb-next"></text> -->
				</view>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">性别</text>
				<radio-group @change="radioChange">
					<label class="radio">
						<radio value="1" checked="true" />
						男
					</label>
					<label class="radio">
						<radio value="2" />
						女
					</label>
				</radio-group>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">参加工作时间</text>
				<view class="picker">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<picker @change="bindPickerChange" :value="index" :range="workStatusArray">
						<view class="uni-input">{{workStatusArray[index]}}</view>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>

			<view class="input-column border-bottom-1px">
				<text class="title">出生年月</text>
				<view class="picker">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ date }}</view>
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>

		<view class="btn-row"><button type="primary" class="primary" @tap="register">保存</button></view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import mInput from '@/components/m-input/m-input.vue';
	import mCell from '@/components/m-cell/m-cell.vue';
	import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue';
	import cityData from '@/common/cityData.js';
	import graceChecker from '@/common/graceChecker.js';
	import mUpimg from '@/components/m-upimg/m-upimg.vue';
	import mCodedialog from '@/components/m-codedialog/m-codedialog.vue';
	import formRuleConfig from '@/config/formRule.config.js';
	export default {
		components: {
			mInput,
			mCell,
			mpvuePicker,
			mUpimg,
			mCodedialog
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
				date: currentDate
			};
		},
		onLoad(query) {
			this.initPage(query);
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value;
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

			// 点击注册按钮
			async register() {
				/*
				 * 注册和修改时共用 修改时需要商编
				 */
				this.reqBody['openId'] = this.openId;
				this.reqBody['referrer'] = this.referrer;
				this.reqBody['userName'] = this.params['userName'];
				this.reqBody['idCard'] = this.params['idCard'];
				this.reqBody['cardNo'] = (this.params['cardNo'] + '').replace(/\s+/g, '');
				this.reqBody['cityNo'] = this.params['cityNo'];
				this.reqBody['bankName'] = this.params['bankName'];
				this.reqBody['phoneNo'] = this.params['phoneNo'];
				this.reqBody['settleCardImgId'] = this.params['settleCardImgId'];
				this.reqBody['cardHolderBackImgId'] = this.params['cardHolderBackImgId'];
				this.reqBody['cardHolderIdImgId'] = this.params['cardHolderIdImgId'];

				let checkRes = graceChecker.check(this.reqBody, formRuleConfig.regCustomerRule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
					return;
				}

				// 发送验证码
				await this.$apis.getMsgCode({
					phoneNo: this.params.phoneNo,
					type: '0'
				});
				// 打开验证码dialog
				this.openCodeDialog();
			},

			// 打开地区picker
			async showMulLinkageThreePicker() {
				this.$refs.cityPicker.show();
			},

			// 地区选择完成
			async onCityConfirm(e) {
				this.org = e;
				this.params.cityNo = e.value[1];
			},

			// 验证码输入完成后或点击重新发送
			async codedialogChange(res) {
				if (res.type == 1) {
					this.showCodeDialog = false;
					this.btnType == 'SUBMIT' && this.submitRegApi(res.code);
					this.btnType == 'RESET_SUBMIT' && this.resetSubmitRegApi(res.code);
				} else if (res.type == -1) {
					uni.showToast({
						icon: 'none',
						title: '已关闭'
					});
					this.showCodeDialog = false;
				} else {
					res.resendCall();
					await this.$apis.getRegCode({
						phoneNo: this.params.phoneNo
					});
				}
			},

			// 打开验证码dialog
			async openCodeDialog() {
				this.showCodeDialog = true;
			},

			// 图片上传完成 返回参数key 和 服务器图片id
			async upImgData(obj) {
				this.params[obj.paramsKey] = obj.id;
			},

			// 银行卡号失去焦点事件
			async cardNoBlur(e) {
				let inputVal = e.detail.value.replace(/\s+/g, '');
				if (!inputVal) return;
				let cardBin = await this.$apis.getCardBin({
					cardNo: inputVal
				});
				this.params['bankName'] = cardBin.name;
			},

			// 重新提交 回显表单
			async echoForm(o) {
				// 修改页面标题
				uni.setNavigationBarTitle({
					title: '重新编辑'
				});

				// 修改按钮类型
				this.btnType = 'RESET_SUBMIT';

				// 随意设置一个referrer推荐人ID,否则表单校验不通过
				this.referrer = 'referrer';

				this.params['userName'] = o.userName;
				this.params['idCard'] = o.idCard;
				this.params['cardNo'] = o.cardNo;
				this.params['cityNo'] = o.cityNo;
				this.params['bankName'] = o.bankName;
				this.params['phoneNo'] = o.phoneNo;

				// 查到地区名称
				this.org.label = this.$mUtils.getCityName(cityData, o.cityNo);

				// 下载图片
				let data = await this.$apis.downloadImg({
					id: o.settleCardImgId
				});
				this.$refs.settleCardImgId.setUpImg({
					url: data.imgString,
					id: data.imgType
				});

				// 下载图片
				let data1 = await this.$apis.downloadImg({
					id: o.cardHolderBackImgId
				});
				this.$refs.cardHolderBackImgId.setUpImg({
					url: data1.imgString,
					id: data1.imgType
				});

				// 下载图片
				let data2 = await this.$apis.downloadImg({
					id: o.cardHolderIdImgId
				});
				this.$refs.cardHolderIdImgId.setUpImg({
					url: data2.imgString,
					id: data2.imgType
				});
			},

			// 根据用户输入的验证码提交注册接口
			async submitRegApi(code) {
				this.reqBody['code'] = code;
				let customerNo = await this.$apis.postCustomer(this.reqBody);

				// 前端自动登录
				this.$store.commit('SET_TOKEN', this.$mConfig.tokenKey);
				this.$mRouter.reLaunch({
					route: this.$mRoutesConfig.regSuccess
				});
			},

			// 根据用户输入的验证码提交修改接口
			async resetSubmitRegApi(code) {
				this.reqBody['code'] = code;
				this.reqBody['customerNo'] = this.customerInfo['customerNo'];
				let res = await this.$apis.upDateCustomerInfo(this.reqBody);

				this.$mRouter.push({
					route: this.$mRoutesConfig.regSuccess
				});
			},

			// 格式化银行卡
			formatCardNo(e) {
				this.params.cardNo = this.$mUtils.formatCardNo(e);
			}
		}
	};
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
