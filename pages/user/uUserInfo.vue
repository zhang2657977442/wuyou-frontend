<template>
	<joy-page class="uUserInfo-page" :joyPageStatus="joyPageStatus">

		<template v-if="customerStatus == 'SUCCESS'">
			<view class="input-group">
				<view class="input-row border-bottom-1px">
					<text class="title">银行账号</text>
					<m-input type="text" clearable v-model="params.cardNo" placeholder="请输入银行账号" :maxLength="30" @onblur="onCardNoBlur"
					 :focus="true" @input="formatCardNo"></m-input>
				</view>

				<view class="input-row border-bottom-1px" v-if="params.bankName">
					<text class="title">银行名称</text>
					<m-input type="text" v-model="params.bankName" placeholder="" disabled :maxLength="50"></m-input>
				</view>

				<m-cell title="开户地区" isLink bottomLine @click="showMulLinkageThreePicker">
					{{org.label}}
				</m-cell>

				<view class="input-row">
					<text class="title">预留手机号</text>
					<m-input type="number" clearable v-model="params.phoneNo" placeholder="请输入手机号" :maxLength="11"></m-input>
				</view>
			</view>

			<view class="">
				<m-upimg :api="$apis.upload" imgType="SETTLE_CARD_IMG" paramsKey="settleCardImgId" @onUpImg="upImgData" :cover="cover52"
				 placeholder="请拍摄身份证和结算卡照片" />
				<m-upimg :api="$apis.upload" imgType="CARDHOLDER_WITH_ID" paramsKey="cardHolderIdImgId" @onUpImg="upImgData" :cover="cover51"
				 placeholder="请拍摄本人手持身份证正面、银行卡正面照片" />
			</view>

			<view class="btn-row">
				<button type="primary" class="primary" @click="submit">提交</button>
			</view>

			<!-- 地区picker -->
			<mpvue-picker themeColor="#007AFF" ref="cityPicker" mode="multiLinkageSelector" :deepLength="2" :pickerValueDefault="[0, 0]"
			 @onConfirm="onConfirm" :pickerValueArray="cityData"></mpvue-picker>

			<!-- 验证码 dialog -->
			<m-codedialog :show="showCodeDialog" :len="6" :autoCountdown="true" :phone="params.phoneNo" v-on:change="codedialogChange"></m-codedialog>
		</template>

		<!-- 商户审核失败 -->
		<template v-else>
			<m-fail :status="customerStatus"></m-fail>
		</template>

	</joy-page>
</template>

<script>
	import {
		mapState
	} from "vuex"
	import mInput from "@/components/m-input/m-input.vue"
	import mCell from '@/components/m-cell/m-cell.vue'
	import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue'
	import cityData from "@/common/cityData.js"
	import graceChecker from '@/common/graceChecker.js'
	import mUpimg from '@/components/m-upimg/m-upimg.vue'
	import formRuleConfig from '@/config/formRule.config.js'
	import mCodedialog from "@/components/m-codedialog/m-codedialog.vue"
	import mFail from "@/components/m-fail/m-fail.vue"
	export default {
		components: {
			mInput,
			mCell,
			mpvuePicker,
			mUpimg,
			mCodedialog,
			mFail
		},
		computed: {
			...mapState(["customerInfo"])
		},
		data() {
			return {
				joyPageStatus: "",
				customerStatus: "",
				cover50: this.$mAssetsPath.upload_1,
				cover51: this.$mAssetsPath.upload_2,
				cover52: this.$mAssetsPath.upload_3,
				showCodeDialog: false,
				cityData: cityData,
				org: {
					label: "请选择地区"
				},
				params: {
					cardNo: "",
					bankName: "",
					phoneNo: ""
				},
				reqBody: {}
			};
		},
		async onLoad() {
			this.initpage();
		},
		methods: {
			async initpage() {
				this.joyPageStatus = "loading";
				try {
					// 商户状态拦截
					this.customerStatus = await this.$AppEntryController.customerStatusInterceptor();
					this.joyPageStatus = "success";
					if (this.customerStatus != "SUCCESS") return;
					this.getCustomerInfo();
				} catch (e) {
					this.joyPageStatus = "fail";
				}
			},

			// 获取商户信息
			async getCustomerInfo() {
				// this.setForm(this.customerInfo);
				let customerInfo = await this.$apis.getCustomer();
				this.$store.commit("SET_CUSTOMERINFO", customerInfo);
				this.setForm(customerInfo);
			},

			// 回显表单
			setForm(o) {
				if (Object.keys(o).length === 0) return;
				// this.params["cardNo"] = o.cardNo;
				// this.params["cityNo"] = o.cityNo;
				// this.params["bankName"] = o.bankName;
				// this.params["phoneNo"] = o.phoneNo;
				// this.params["settleCardImgId"] = o.settleCardImgId;
				// this.params["cardHolderIdImgId"] = o.cardHolderIdImgId;

				// this.org.label = this.$mUtils.getCityName(cityData, o.cityNo);
			},

			// 提交修改 先校验表单，校验通过后发送验证码在提交
			async submit() {

				this.reqBody["customerNo"] = this.customerInfo["customerNo"];
				this.reqBody["userName"] = this.customerInfo["userName"];
				this.reqBody["idCard"] = this.customerInfo["idCard"];
				this.reqBody["cardNo"] = (this.params["cardNo"] + "").replace(/\s+/g, "");
				this.reqBody["cityNo"] = this.params["cityNo"];
				this.reqBody["bankName"] = this.params["bankName"];
				this.reqBody["phoneNo"] = this.params["phoneNo"];
				this.reqBody["settleCardImgId"] = this.params["settleCardImgId"];
				this.reqBody["cardHolderIdImgId"] = this.params["cardHolderIdImgId"];

				let checkRes = graceChecker.check(this.reqBody, formRuleConfig.updataCustomerCardRule);
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
			showMulLinkageThreePicker() {
				this.$refs.cityPicker.show();
			},

			// 地区选择完成
			onConfirm(e) {
				this.org = e;
				this.params.cityNo = e.value[1];
			},

			// 验证码输入完成后或点击重新发送
			async codedialogChange(res) {
				if (res.type == 1) {
					this.showCodeDialog = false;
					this.upDateCustomerInfo(res.code);
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

			// 根据用户输入的验证码提交修改接口
			async upDateCustomerInfo(code) {

				this.reqBody["code"] = code;

				await this.$apis.upDateCustomerInfo(this.reqBody);
				let newCustomerInfo = { ...this.customerInfo,
					...this.reqBody
				};
				this.$store.commit("SET_CUSTOMERINFO", newCustomerInfo);

				uni.showToast({
					title: '修改成功'
				});
				setTimeout(() => {
					this.$mRouter.redirectTo({
						route: this.$mRoutesConfig.userInfo
					})
				}, 800)
			},

			// 图片上传完成 返回参数key 和 服务器图片id
			upImgData(obj) {
				this.params[obj.paramsKey] = obj.id;
			},

			// 银行卡号失去焦点事件
			async onCardNoBlur(e) {
				let inputVal = e.detail.value.replace(/\s+/g, "");
				if (!inputVal) return;
				let cardBin = await this.$apis.getCardBin({
					cardNo: inputVal
				});
				this.params["bankName"] = cardBin.name;
			},

			// 格式化银行卡
			formatCardNo(e) {
				this.params.cardNo = this.$mUtils.formatCardNo(e);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.input-group {
		background-color: #fff;
		border-radius: 10upx;
		margin-top: 10upx;
	}
</style>
