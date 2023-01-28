<template>
	<view>
		<view class="header">
			<view class="userinfo" @click="toLogin">
				<view class="face"><image :src="userInfo.avatar || '/static/img/head.png'"></image></view>
				<view class="info" v-if="hasLogin">
					<view class="username">{{ userInfo.username }}</view>
					<view class="integral">{{userInfo.role}}</view>
				</view>
				<view class="info" v-else>
					<view class="username">未登录/注册</view>
					<view class="integral">点击可登陆/注册</view>
				</view>
			</view>
			<view class="setting" @click="toUserInfo"><image src="../../static/img/setting.png"></image></view>
		</view>
		<view class="orders">
			<view class="box" v-if="userInfo.role==undefined || userInfo.role=='求职者'">
				<view class="label" v-for="(row, index) in orderTypeLise" :key="row.name" hover-class="hover" @tap="toOrderType(index)">
					<view class="icon">
						<view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
						<text class="yzb label-icon" :class="row.icon"></text>
					</view>
					{{ row.name }}
				</view>
			</view>
			<view class="box" v-else>
				<view class="label" v-for="(row, index) in orderTypeLise2" :key="row.name" hover-class="hover" @tap="toOrderType2(index)">
					<view class="icon">
						<view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
						<text class="yzb label-icon" :class="row.icon"></text>
					</view>
					{{ row.name }}
				</view>
			</view>
		</view>
		<view class="list" v-if="userInfo.role==undefined || userInfo.role=='求职者'" v-for="(list, list_i) in severList" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="icon"><image :src="'../../static/img/my/' + li.icon"></image></view>
				<view class="text">{{ li.name }}</view>
				<text class="yzb yzb-next icon-next"></text>
			</view>
		</view>
		<view class="list" v-if="userInfo.role=='招聘者'" v-for="(list, list_i) in severList2" :key="list_i">
			<view class="li" v-for="(li, li_i) in list" @tap="toPage2(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
				<view class="icon"><image :src="'../../static/img/my/' + li.icon"></image></view>
				<view class="text">{{ li.name }}</view>
				<text class="yzb yzb-next icon-next"></text>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			orderTypeLise: [
				//name-标题 icon-图标 badge-角标
				{ name: '我的简历', show:true, icon: 'yzb-jianli', badge: 0, url: this.$mRoutesConfig.personReume },
				{ name: '我的投递', show:true,icon: 'yzb-mianshiyaoqing', badge: 0, url: this.$mRoutesConfig.apply},
				{ name: '我的收藏', show:true,icon: 'yzb-ziyuan141', badge: 2, url: this.$mRoutesConfig.collect },
				{ name: '谁看过我', show:true,icon: 'yzb-liulanjilu', badge: 1, url: this.$mRoutesConfig.connected }
			],
			orderTypeLise2: [
				//name-标题 icon-图标 badge-角标
				{ name: '公司主页', show:true,icon: 'yzb-liulanjilu', badge: 0, url: this.$mRoutesConfig.companyDetail},
				{ name: '已沟通过', show:true, icon: 'yzb-jianli', badge: 1, url: this.$mRoutesConfig.connected },
				{ name: '收到简历', show:true,icon: 'yzb-mianshiyaoqing', badge: 0, url:this.$mRoutesConfig.apply},
				{ name: '我的收藏', show:true,icon: 'yzb-ziyuan141', badge: 2, url: this.$mRoutesConfig.collect },
				// { name: '谁看过我', show:true,icon: 'yzb-liulanjilu', badge: 1, url: null }
			],
			severList: [
				[
					{ name: '隐私设置', show:true,icon: 'faxian.png', url:this.$mRoutesConfig.hideSetting}, 
					{ name: '我要招聘', show:true,icon: 'switch.png', url:"zhaopin" }],
				[
					{ name: '客服中心', show:true,icon: 'contactus.png', url: this.$mRoutesConfig.robot },
					{ name: '帮助中心', show:true,icon: 'help.png', url: this.$mRoutesConfig.help},
					{ name: '关于我们', show:true,icon: 'aboutus.png', url: this.$mRoutesConfig.aboutUs},
					{ name: '系统设置', show:true,icon: 'setting.png', url: this.$mRoutesConfig.setting},
				]
			],
			severList2: [
				[
					{ name: '公司认证', show: true, icon: 'auth.png', url: this.$mRoutesConfig.companyAuth },
					{ name: '公司管理', show:true,icon: 'company.png', url:  this.$mRoutesConfig.company}, 
					{ name: '职位管理', show:true,icon: 'yijian.png', url:this.$mRoutesConfig.positions}, 
					{ name: '我要求职', show:false,icon: 'switch.png', url:"qiuzhi"}],
				[
					{ name: '客服中心', show:true,icon: 'contactus.png', url: this.$mRoutesConfig.robot },
					{ name: '帮助中心', show:true,icon: 'help.png', url: this.$mRoutesConfig.help},
					{ name: '关于我们', show:true,icon: 'aboutus.png', url: this.$mRoutesConfig.aboutUs},
					{ name: '系统设置', show:true,icon: 'setting.png', url: this.$mRoutesConfig.setting},
				]
			]
		};
	},
	onShow() {
		if (this.hasLogin) {
			this.getUserInfo();
		}
		console.log('是否一登录', this.hasLogin);
	},
	methods: {
		// 获取用户信息
		async getUserInfo() {
			let userInfo = await this.$apis.getUserInfo();
			this.$store.commit("SET_USERINFO", userInfo);
		},

		//用户点击订单类型
		toOrderType(index) {
			// uni.showToast({ title: this.orderTypeLise[index].name });
			this.$mRouter.push({
				route: this.orderTypeLise[index].url,
				query: {
					id: 1
				}
			});
		},
		
		toOrderType2(index) {
			// uni.showToast({ title: this.orderTypeLise[index].name });
			this.$mRouter.push({
				route: this.orderTypeLise2[index].url,
				query: {
					id: 0
				}
			});
		},

		toLogin() {
			if (this.hasLogin) {
				if(this.userInfo.role==='求职者'){
						this.toUserInfo()
				}else{
					this.$mRouter.push({
						route: this.$mRoutesConfig.enter
					});
				}
			} else {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login,
					query: {
						id: 1
					}
				});
			}
		},
		
		async switchRole(role){
			let res = await this.$apis.switchRole({id:this.userInfo.id,role:role});
			this.getUserInfo();
			console.log("res======",res);
			if(this.userInfo.companyId){
				// 存在，直接切换
				console.log("存在，直接切换")
			}else{
				//不存在，跳转编辑
				console.log("不存在，跳转编辑")
				if(role=="DEFAULT"){
					//跳转到简历编辑页面。
					this.$mRouter.push({
						route: this.$mRoutesConfig.personReume,
						query: {
							id: 1
						}
					});
				}else{
					this.$mRouter.push({
						route: this.$mRoutesConfig.enter
					});
				}
			}
		},

		//用户点击列表项
		toPage(list_i, li_i) {
			let that=this;
			if(this.severList[list_i][li_i].url=="zhaopin"){
				uni.showModal({
					title: '',
					content: '确定切换到招聘？',
					success: res => {
						if (res.confirm) {
							that.switchRole("BOSS");
						}
					}
				});
				return;
			}
			this.$mRouter.push({
				route:this.severList[list_i][li_i].url,
				query: {
					id: 1
				}
			});
		},
		
		//用户点击列表项
		toPage2(list_i, li_i) {
			let that=this;
			if(this.severList2[list_i][li_i].url=="qiuzhi"){
				uni.showModal({
					title: '',
					content: '确定切换到求职？',
					success: res => {
						if (res.confirm) {
							that.switchRole("DEFAULT");
						}
					}
				});
				return;
			}
			this.$mRouter.push({
				route:this.severList2[list_i][li_i].url,
				query: {
					id: 1
				}
			});
		},
		
		toUserInfo() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.userInfo,
				query: {
					id: 1
				}
			});
		},

		toResume() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.personReume,
				query: {
					id: 1
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.header {
	&.status {
		padding-top: var(--status-bar-height);
	}
	background-color: #12ae85;
	width: 92%;
	height: 30vw;
	padding: 0 4%;
	display: flex;
	align-items: center;
	.userinfo {
		width: 90%;
		display: flex;
		.face {
			flex-shrink: 0;
			width: 17vw;
			height: 17vw;
			image {
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
		}
		.info {
			display: flex;
			flex-flow: wrap;
			padding-left: 30upx;
			.username {
				width: 100%;
				color: #fff;
				font-size: 40upx;
				margin-left: 10upx;
			}
			.integral {
				display: flex;
				align-items: center;
				padding: 0 20upx;
				height: 40upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 20upx;
				font-size: 24upx;
			}
		}
	}
	.setting {
		flex-shrink: 0;
		width: 6vw;
		height: 6vw;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.hover {
	background-color: #eee;
}
.orders {
	background-color: #12ae85;
	width: 92%;
	height: 11vw;
	padding: 0 4%;
	margin-bottom: calc(11vw + 40upx);
	display: flex;
	align-items: flex-start;
	border-radius: 0 0 100% 100%;
	margin-top: -1upx;
	.box {
		width: 98%;
		padding: 0 1%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 24upx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
		margin-bottom: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		.label {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: wrap;
			width: 100%;
			height: 16vw;
			color: #666666;
			font-size: 26upx;
			.icon {
				position: relative;
				width: 7vw;
				height: 7vw;
				margin: 0 1vw;
				.badge {
					position: absolute;
					width: 4vw;
					height: 4vw;
					background-color: #ec6d2c;
					top: -1vw;
					right: -1vw;
					border-radius: 100%;
					font-size: 20upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 10;
				}
				image {
					width: 7vw;
					height: 7vw;
					z-index: 9;
				}
			}

			.label-icon {
				font-size: 48upx;
				color: $main-color;
			}
		}
	}
}
.list {
	width: 100%;
	border-bottom: solid 26upx #f1f1f1;
	.li {
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: solid 1upx #e7e7e7;
		display: flex;
		align-items: center;
		&.noborder {
			border-bottom: 0;
		}
		.icon {
			flex-shrink: 0;
			width: 50upx;
			height: 50upx;
			image {
				width: 50upx;
				height: 50upx;
			}
		}
		.text {
			padding-left: 30upx;
			width: 100%;
			color: #666;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
		.icon-next {
			font-size: $font-size-34;
			color: $font-color-999;
		}
	}
}
</style>
