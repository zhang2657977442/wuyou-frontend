<template>
	<form class='loginView' @submit="login" :model="ReginForm" ref="ReginForm">
		<!-- <image class="login-bg" src="../../../static/temp/login_bg.png"></image> -->

		<view class="login-mian" style="padding-top: 200px;box-sizing: border-box;">
			<view class="login-name">
				<text>绑定手机号，体验更多快捷登录</text>
			</view>

			<view class="phone">
				<view class="phone-head center-algin">
					<text class="head">+86</text>
					<input class="input" type="number" maxlength="11" v-model.number="ReginForm.tel" placeholder="请输入手机号" name="phone" />
				</view>
			</view>

			<view class="phone pws">
				<view class="phone-head center-algin">
					<text class="head"></text>
					<input class="input" type="number" maxlength="11" placeholder="请输入验证码" name="verify" />
				</view>
				<view class="code textgreen center-algin" >
					<text v-if="coding==false" @tap="getCode()">获取验证码</text>
					<text class="text-red" v-if="coding==true">{{auth_time}} 秒</text>
				</view>
			</view>
			<button type="default" class="loginbutton log" hover-class="hover" formType="submit">确认绑定</button>
		</view>
	</form>
</template>

<script>
	// import api from '../../utils/api.js'
	// import userUtils from '../../utils/userUtils.js';
	export default {
		data: {
			coding: false,
			auth_time: 60,
			ReginForm: {
				password: '',
				tel: '',
			},
			phoneNumber: 0,
			verify: 0,
			
			type:0,//0-微信 1-qq 2-微博
			openid:"",//第三方授权key
		},

		onLoad:function(option){
			console.log("onload==="+JSON.stringify(option));
			this.type=option.type;
			this.openid=option.openid;
		},

		methods: {

			getCode() {
				console.log(this);
				console.log("-----------------------------------------")
				this.phoneNumber = this.ReginForm.tel;
				var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				console.log("得到账号:" + this.ReginForm.tel);
				var that = this;
				if (this.phoneNumber === "") {
					uni.showToast({
						icon: 'none',
						title: "手机号不能为空",
					});

				} else if (!Number.isInteger(this.phoneNumber)) {
					uni.showToast({
						icon: 'none',
						title: "手机号码必须是数字",
					});
				} else if (this.phoneNumber.toString().length !== 11) {
					uni.showToast({
						icon: 'none',
						title: "手机号码必须是11位数字",
					});
				} else if (!myreg.test(this.phoneNumber)) {
					uni.showToast({
						icon: 'none',
						title: "请输入正确的手机号码",
					});
				} else {
					this.coding = true;
					console.log("-------------------")
					//设置倒计时秒
					this.auth_time = 60;
					var auth_timetimer = setInterval(() => {
						this.auth_time--;
						if (this.auth_time < 0) {
							this.coding = false;
							clearInterval(auth_timetimer);
						}
					}, 1000);
					//获取验证码
					// api.getCode(this.phoneNumber,
					// 	res => {
					// 		console.log(JSON.stringify(res));
					// 		this.verify = res.data.verify;
					// 		console.log("验证码1：" + res.data.verify);
					// 		if(res.data.result==1){
					// 			uni.showToast({
					// 				title:'获取成功'
					// 			})
					// 		}else{
					// 			uni.showToast({
					// 				title:'获取失败'
					// 			})
					// 		}
					// 	});
				}
			},

			/**
			 * 注册登录
			 */
			login(e) {
				var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				console.log(e);
				console.log(e.detail.value);
				if (e.detail.value.phone === "") {
					uni.showToast({
						title: "手机号不能为空",
						icon: 'none',
					});
				} else if (!reg.test(e.detail.value.phone)) {
					uni.showToast({
						title: "请输入正确的手机号码",
						icon: 'none',
					});
				} else if (e.detail.value.phone != this.phoneNumber) {
					uni.showToast({
						title: "前后输入的手机号不一致",
						icon: 'none',
					});
				} else if (e.detail.value.verify === "") {
					uni.showToast({
						title: "验证码不能为空",
						icon: 'none',
					});
				} else if (e.detail.value.verify != this.verify) {
					uni.showToast({
						title: "输入的验证码有误",
						icon: 'none',
					});
				} else {
					console.log("-----------------------------------------");
					// api.bindPhoneForThird(this.openid,this.type,this.phoneNumber , res => {
					// 	console.log("登录结果：" + JSON.stringify(res));
					// 	console.log(res);
					// 	if (res.data.result == 1) { //登陸成功
					// 		console.log(res.data.userId);
					// 		this.getUserInfo(res.data.userId);
					// 	} else {
					// 		uni.showToast({
					// 			icon: 'none',
					// 			title: "登录失败"
					// 		});
					// 	}
					// });
				}
			},
			
			getUserInfo(userId) {
				// api.getUserInfo(userId, res => {
				// 	console.log('------------更新--用户信息---------------');
				// 	console.log(res);
				// 	var userInfo = res.data.data;
				// 	if (userInfo == null) {
				// 		return;
				// 	}
				// 	userInfo = {
				// 		isLogin: true,
				// 		...userInfo
				// 	};
				// 	console.log(userInfo);
				// 	uni.setStorageSync('userInfo', userInfo);
				// 	uni.redirectTo({
				// 		url:'/pages/forum/forum'
				// 	})
				// });
			},
			

			storeEnter() {
				uni.navigateTo({
					url: "../tenants/tenants"
				})
			},

			register() {
				uni.navigateTo({
					url: "../login/register"
				})
			},
			goForgotpwd() {
				uni.navigateTo({
					url: "../login/forgot-pwd"
				})
			},

			qqlogin() {
				console.log("QQ授权登录----")
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						console.log("qq授权结果：")
						console.log(loginRes.authResult);
						console.log(JSON.stringify(loginRes.authResult));
						console.log(loginRes.authResult.openid);
						uni.showToast({
							title: "授权成功"
						})
					},
					fail: function(res) {
						console.log("qq授权失败结果：")
						console.log(res.errMsg);
						uni.showToast({
							title: "授权失败"
						})
					}

				});
			},

			wxlogin() {
				console.log("wx授权登录----")
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log("微信授权结果：")
						console.log(JSON.stringify(loginRes.authResult));
						console.log(loginRes.authResult.openid);
						uni.showToast({
							title: "授权成功"
						})
					},
					fail: function(res) {
						console.log("微信授权失败结果：")
						console.log(res.errMsg);
						uni.showToast({
							title: "授权失败"
						})
					}

				});
			},
		}
	}
</script>

<style>
	@import './login.css';
</style>
