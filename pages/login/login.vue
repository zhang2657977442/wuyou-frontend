<template>
	<view class="wx-auth">
		<view class="wx-auth" v-if="canIUse">
			<view class="header"><image src="../../static/img/logo.png"></image></view>
			<view class="content2">
				<view class="text-size-max">申请获取以下权限</view>
				<text>获得您的公开信息(昵称，头像等)</text>
			</view>
			<view class="bottom">
				<!-- 					<button  class='cancel-login' type='default' lang="zh_CN" @click="cancle()">
						暂不登录
					</button> -->
				<button class="auth" open-type="getUserInfo" lang="zh_CN" @click="bindGetUserInfo">授权登录</button>
			</view>
			<!-- <view class="phone-login" @tap="toPhoneLogin()">
					<text class="phone-login-text">手机号注册/登录</text>
				</view> -->
		</view>
		<view v-else>请升级微信版本</view>
	</view>
</template>

<script>

// import api from '../../utils/api.js';
// import userUtils from '../../utils/userUtils.js';
export default {
	data() {
		return {
			//判断小程序的API，回调，参数，组件等是否在当前版本可用。
			canIUse: uni.canIUse('button.open-type.getUserInfo'),
			bindUserInfo:null,
		};
	},

	onShow: function() {
		// this.verifyPro();
	},

	methods:{

		verifyPro(){
			var v=userUtils.getPrivacyVersion();
			if(v=="" || v==null){
				uni.navigateTo({
					url:'/pages/my/protocol/protocol?type=1'
				})
			}
		},

		async wxAuth() {
			var that = this;
			// 查看是否授权
			uni.getSetting({
				success: function(res) {
					console.log(res);
					if (res.authSetting['scope.userInfo']) {
						uni.getUserInfo({
							success: function(res) {
								// 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
								// 根据自己的需求有其他操作再补充
								// 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
								uni.login({
									success: res => {
										// 获取到用户的 code 之后：res.code
										console.log("用户的code:" + res.code);
										// 可以传给后台，再经过解析获取用户的 openid
										// 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
										that.getOpenId(res.code);
									}
								});
							}
						});
					} else {
						// 用户没有授权
						// 改变 isHide 的值，显示授权页面
					}
				}
			});
		},


		async getOpenId(codeId){
			let res = await this.$apis.getOpenId({codeId:codeId});
			this.openid = res.openid;
			this.session_key = res.session_key;
			this.$store.commit("SET_OPENID", this.openid);
			uni.setStorage({
				key: "session_key",
				data: this.session_key
			})

			if (res != null) {
				this.xcxLogin(this.openid);
			}
		},


		bindGetUserInfo(e) {
			wx.getUserProfile({
			      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			      success: (res) => {
					  console.log(res)
					  if (res.userInfo) {
					  	var that = this;
					  	this.bindUserInfo=res.userInfo;
					  	that.isHide = true;
					  	that.isPhoneShow = true;
					  	uni.showLoading({
					  		title:'授权登录中···'
					  	});
					  	console.log('用户信息:',this.bindUserInfo)
					  	this.wxAuth();
					  } else {
					  	//用户按了拒绝按钮
					  	uni.showModal({
					  		title: '警告',
					  		content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
					  		showCancel: false,
					  		confirmText: '返回授权',
					  		success: function(res) {
					  			// 用户没有授权成功，不需要改变 isHide 的值
					  			if (res.confirm) {
					  				console.log('用户点击了“返回授权”');
					  			}
					  		}
					  	});
					  }
				  }
				  })
			
		},

		async xcxLogin(openid) {
			var that = this;
			let param={
				openid:openid,
				avatar:this.bindUserInfo.avatarUrl,
				nickName:this.bindUserInfo.nickName
			}
			let res = await this.$apis.xcxUserLogin(param);
			if(res){
				this.$store.commit("SET_USERINFO", res.currMember || {});
				// 前端自动登录
				this.$store.commit("SET_TOKEN", res.token);
				uni.navigateBack({
					delta:1
				})
				// 更新用户信息
				// uni.redirectTo({
				// 	url:'/pages/login/authphonelogin?nickName='+this.bindUserInfo.nickName+"&avatar="+this.bindUserInfo.avatarUrl
				// })
			}
		},

		toPhoneLogin(){
			uni.redirectTo({
				url:'./phonelogin'
			})
		},

		cancle(){
			uni.navigateBack({
				delta:1
			})
		},

		updateMember(){
			if(this.bindUserInfo!=null){
				var member = {
					avatar: this.bindUserInfo.avatarUrl,
					name: this.bindUserInfo.nickName,
					sex: this.bindUserInfo.gender,
					nickName: this.bindUserInfo.nickName
				}
				api.getUpdateMemberInfo(member,res=>{
					if(res.data.code == 200){
						uni.showToast({title: res.data.message})
					}
				})
			}
		},
	}
}
</script>

<style>
/* 微信授权 */

.wx-auth {
	height: calc(100vh);
	width: 100%;
}

.header {
	margin: 50upx 0 50upx 0;
	border-bottom: 1px solid #eee;
	text-align: center;
	width: 100%;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200upx;
	height: 200upx;
}

.content2 {
	padding: 30upx 80upx;
}

.content2 text {
	display: block;
	color: #9d9d9d;
	margin-top: 40rpx;
}

.bottom {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.auth {
	border-radius: 15rpx;
	margin: 70rpx 50rpx 50rpx 50rpx;
	font-size: 35rpx;
	width: 60%;
	background-color: #2c8cf0;
	color: #ffffff;
}

.cancel-login {
	border-radius: 15rpx;
	margin: 70rpx 20rpx 50rpx 50rpx;
	font-size: 35rpx;
	background-color: #eeeeee;
	width: 30%;
}

.phone-login {
	width: 100%;
	justify-content: center;
}

.phone-login-text {
	color: #666666;
	border-bottom: #999999 solid 2upx;
}
</style>
