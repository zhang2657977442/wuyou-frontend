<template>
	<view class="content pad-10 reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<text class="title">姓名</text>
				<m-input type="text" clearable v-model="params.userName" placeholder="请输入姓名" :maxLength="30"></m-input>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">身份证</text>
				<m-input type="idcard" clearable v-model="params.idCard" placeholder="请输入身份证" :maxLength="18"></m-input>
			</view>

			<view class="input-row border-bottom-1px">
				<text class="title">银行账号</text>
				<m-input type="text" clearable v-model="params.cardNo" placeholder="请输入银行账号" :maxLength="30" @onblur="cardNoBlur"
				 @input="formatCardNo"></m-input>
			</view>

			<view class="input-row border-bottom-1px" v-if="params.bankName">
				<text class="title">银行名称</text>
				<m-input type="text" v-model="params.bankName" placeholder="" disabled :maxLength="50"></m-input>
			</view>

			<m-cell title="开户地区:" isLink bottomLine @click="showMulLinkageThreePicker">
				{{org.label || "请选择"}}
			</m-cell>

			<view class="input-row">
				<text class="title">预留手机号</text>
				<m-input type="number" clearable v-model="params.phoneNo" placeholder="请输入手机号" :maxLength="11"></m-input>
			</view>
			<!-- <m-cell title="银行名称:">
				{{params.bankName}}
			</m-cell> -->
		</view>

		<view class="">
			<m-upimg :api="$apis.upload" imgType="SETTLE_CARD_IMG" paramsKey="settleCardImgId" ref="settleCardImgId" @onUpImg="upImgData"
			 :cover="cover52" placeholder="请拍摄身份证和结算卡照片" />
			<m-upimg :api="$apis.upload" imgType="CARDHOLDER_ID_BACK" paramsKey="cardHolderBackImgId" ref="cardHolderBackImgId"
			 @onUpImg="upImgData" :cover="cover50" placeholder="请拍摄本人身份证国徽面" />
			<m-upimg :api="$apis.upload" imgType="CARDHOLDER_WITH_ID" paramsKey="cardHolderIdImgId" ref="cardHolderIdImgId"
			 @onUpImg="upImgData" :cover="cover51" placeholder="请拍摄本人手持身份证正面、银行卡正面照片" />
		</view>

		<view class="btn-row" v-if="btnType == 'SUBMIT'">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
		<view class="btn-row" v-if="btnType == 'RESET_SUBMIT'">
			<button type="primary" class="primary" @tap="register">重新提交</button>
		</view>

		<!-- 地区picker -->
		<mpvue-picker themeColor="#007AFF" ref="cityPicker" mode="multiLinkageSelector" :deepLength="2" :pickerValueDefault="[0, 0]"
		 @onConfirm="onCityConfirm" :pickerValueArray="cityData"></mpvue-picker>

		<!-- 验证码 dialog -->
		<m-codedialog :show="showCodeDialog" :len="6" :autoCountdown="true" :phone="params.phoneNo" v-on:change="codedialogChange"></m-codedialog>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import mInput from '@/components/m-input/m-input.vue'
	import mCell from '@/components/m-cell/m-cell.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue'
	import cityData from "@/common/cityData.js"
	import graceChecker from '@/common/graceChecker.js'
	import mUpimg from '@/components/m-upimg/m-upimg.vue'
	import mCodedialog from "@/components/m-codedialog/m-codedialog.vue"
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
			...mapState(["openId", "customerInfo"])
		},
		data() {
			return {
				cover50: this.$mAssetsPath.upload_1,
				cover51: this.$mAssetsPath.upload_2,
				cover52: this.$mAssetsPath.upload_3,
				cityData: cityData,
				showCodeDialog: false,
				org: {},
				btnType: "SUBMIT", // 按钮提交类型：SUBMIT（注册） || RESET_SUBMIT（编辑提交）
				referrer: "",
				params: {
					userName: "",
					idCard: "",
					cardNo: "",
					cityNo: "",
					bankName: "",
					phoneNo: "",
					settleCardImgId: "",
					cardHolderBackImgId: "",
					cardHolderIdImgId: ""
				},
				reqBody: {}
			}
		},
		onLoad(query) {
			this.initPage(query);
		},
		methods: {
			async initPage(query) {
				// 获取推广码
				this.referrer = query.referrer;

				// 如何是审核失败，重新提交的操作
				if (query.type == "RESET" && this.customerInfo.customerNo) {
					this.echoForm(this.customerInfo);
					return;
				}
			},

			// 点击注册按钮
			async register() {
				/* 
				 * 注册和修改时共用 修改时需要商编
				 */
				this.reqBody["openId"] = this.openId;
				this.reqBody["referrer"] = this.referrer;
				this.reqBody["userName"] = this.params["userName"];
				this.reqBody["idCard"] = this.params["idCard"];
				this.reqBody["cardNo"] = (this.params["cardNo"] + "").replace(/\s+/g, "");
				this.reqBody["cityNo"] = this.params["cityNo"];
				this.reqBody["bankName"] = this.params["bankName"];
				this.reqBody["phoneNo"] = this.params["phoneNo"];
				this.reqBody["settleCardImgId"] = this.params["settleCardImgId"];
				this.reqBody["cardHolderBackImgId"] = this.params["cardHolderBackImgId"];
				this.reqBody["cardHolderIdImgId"] = this.params["cardHolderIdImgId"];

				let checkRes = graceChecker.check(this.reqBody, formRuleConfig.regCustomerRule);
				if (!checkRes) {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					return;
				}

				// 发送验证码
				await this.$apis.getMsgCode({
					phoneNo: this.params.phoneNo,
					type: "0"
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
					this.btnType == "SUBMIT" && this.submitRegApi(res.code);
					this.btnType == "RESET_SUBMIT" && this.resetSubmitRegApi(res.code);
				} else if (res.type == -1) {
					uni.showToast({
						icon: "none",
						title: "已关闭"
					})
					this.showCodeDialog = false;
				} else {
					res.resendCall()
					await this.$apis.getRegCode({
						phoneNo: this.params.phoneNo
					})
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
				let inputVal = e.detail.value.replace(/\s+/g, "");
				if (!inputVal) return;
				let cardBin = await this.$apis.getCardBin({
					cardNo: inputVal
				});
				this.params["bankName"] = cardBin.name;
			},

			// 重新提交 回显表单
			async echoForm(o) {
				// 修改页面标题
				uni.setNavigationBarTitle({
					title: "重新编辑",
				})

				// 修改按钮类型
				this.btnType = "RESET_SUBMIT";

				// 随意设置一个referrer推荐人ID,否则表单校验不通过
				this.referrer = "referrer";

				this.params["userName"] = o.userName;
				this.params["idCard"] = o.idCard;
				this.params["cardNo"] = o.cardNo;
				this.params["cityNo"] = o.cityNo;
				this.params["bankName"] = o.bankName;
				this.params["phoneNo"] = o.phoneNo;

				// 查到地区名称
				this.org.label = this.$mUtils.getCityName(cityData, o.cityNo);

				// 下载图片
				let data = await this.$apis.downloadImg({
					id: o.settleCardImgId
				});
				this.$refs.settleCardImgId.setUpImg({
					url: data.imgString,
					id: data.imgType
				})

				// 下载图片
				let data1 = await this.$apis.downloadImg({
					id: o.cardHolderBackImgId
				});
				this.$refs.cardHolderBackImgId.setUpImg({
					url: data1.imgString,
					id: data1.imgType
				})

				// 下载图片
				let data2 = await this.$apis.downloadImg({
					id: o.cardHolderIdImgId
				});
				this.$refs.cardHolderIdImgId.setUpImg({
					url: data2.imgString,
					id: data2.imgType
				})
			},

			// 根据用户输入的验证码提交注册接口
			async submitRegApi(code) {
				this.reqBody["code"] = code;
				let customerNo = await this.$apis.postCustomer(this.reqBody);

				// 前端自动登录
				this.$store.commit("SET_TOKEN", this.$mConfig.tokenKey);
				this.$mRouter.reLaunch({
					route: this.$mRoutesConfig.regSuccess
				});
			},

			// 根据用户输入的验证码提交修改接口
			async resetSubmitRegApi(code) {
				this.reqBody["code"] = code;
				this.reqBody["customerNo"] = this.customerInfo["customerNo"];
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
	}
</script>

<style lang="scss" scoped>
	.input-group {
		border-radius: 10upx;
		margin-top: 10upx;
		overflow: hidden;
	}
</style>
