<template>
	<view class="content with-100">
		<view class="list" v-for="(list, list_i) in severList2" :key="list_i">
			<template v-if="hasLogin">
				<view class="li" v-for="(li, li_i) in list" @tap="toPage2(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
					<view class="text">{{ li.name }}</view>
					<text class="text2">{{ li.content }}</text>
					<text class="yzb yzb-next icon-next" v-if="li.right"></text>
				</view>
			</template>
			<template v-else>
				<view class="li" v-if="list_i==1?li_i!=0:true" v-for="(li, li_i) in list" @tap="toPage2(list_i, li_i)" v-bind:class="{ noborder: li_i == list.length - 1 }" hover-class="hover" :key="li.name">
					<view class="text">{{ li.name }}</view>
					<text class="text2">{{ li.content }}</text>
					<text class="yzb yzb-next icon-next" v-if="li.right"></text>
				</view>
			</template>
		</view>
		<button class="btn" @click="loginOut" v-if="hasLogin">退出登录</button>
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
			severList2: [
				[
					{ name: '版本号', show: true, right: false, icon: '', content: '1.0.0', url: null },
					{ name: '发布日期', show: true, right: false, icon: '', content: '2023-05-01', url: null },
				],
				[
					// { name: '修改密码', show: true, right: true, icon: '', content: '', url: this.$mRoutesConfig.resetPwd },
					{ name: '用户协议', show: true, right: true, icon: 'mingxi.png', content: '', url: this.$mRoutesConfig.terms },
					{ name: '隐私政策', show: true, right: true, icon: 'choujiang.png', content: '', url: this.$mRoutesConfig.privacy },
					{ name: '关于我们', show: true, right: true, icon: 'addr.png', content: '', url: this.$mRoutesConfig.aboutUs }
				]
			]
		};
	},
	onLoad() {},
	methods: {
		loginOut() {
			let that=this;
			uni.showLoading({ mask: true });
			setTimeout(function() {
				uni.clearStorageSync();
				uni.hideLoading();
				that.$store.commit('SET_LOGOUT');
				if (that.goEasy.getConnectionStatus() === 'connected') {
					console.log('do  disconnect');
					//断开连接
					getApp().globalData.imService.disconnect();
				}
				uni.reLaunch({ url: '/pages/user/user' });
			}, 1500);
		},
		
		//用户点击列表项
		toPage2(list_i, li_i) {
			if(!this.severList2[list_i][li_i].url){
				return;
			}
			let that=this;
			this.$mRouter.push({
				route:this.severList2[list_i][li_i].url,
				query: {
					id: 1
				}
			});
		},
	}
};
</script>

<style lang="scss">
.system {
	width: 94.5%;
	height: 100upx;
}
.btn {
	border-radius: 20rpx;
	margin-top: 50upx;
	font-size: 35rpx;
	width: 90%;
	background-color: $uni-color-error;
	color: #ffffff;
}
.list {
	width: 100%;
	border-bottom: solid 26upx #f1f1f1;
	.li {
		width: 96%;
		height: 100upx;
		padding: 0 2%;
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
		.text2 {
			width: 40%;
			color: #666;
			text-align: right;
		}
		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
		.icon-next {
			font-size: $font-size-34;
			color: $font-color-999;
			margin-left: 15upx;
		}
	}
}
</style>
