<template>
	<joy-page class="">
		<view class="body">
			<view class="top">
				<view class="space-between">
					<view class="company">
						<text class="name">{{company.name}}</text>
						<text class="require">{{company.industryName}} · {{company.staffSize}}</text>
					</view>
					<image class="logo" :src="company.logo"></image>
				</view>
			</view>
			<view class="time">
				<!-- <text class="title">福利待遇</text> -->
				<view class="require">
					<view class="item">
						<text class="yzb yzb-location top-icon"></text>
						<text>{{company.startTime}}-{{company.endTime}}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-gongzuobao top-icon"></text>
						<text>{{company.restTime}}</text>
					</view>
					<view class="item">
						<text class="yzb yzb-xueli top-icon"></text>
						<text>{{company.workOvertime}}</text>
					</view>
				</view>
				<view class="welfare">
					<text class="items" v-for="(item, index) in company.welfare" :key="index" >{{item}}</text>
					<!-- <text class="items">包吃包住</text>
					<text class="items">五险一金</text>
					<text class="items">节日福利</text> -->
				</view>
			</view>
			
			<!-- <view class="welfare">
				<text class="title">福利待遇</text>
				<view class="item">
					<text>社保</text>
					<text>包吃包住</text>
					<text>五险一金</text>
					<text>节日福利</text>
				</view>
			</view> -->
			
			<view class="address">
				<text class="title">公司地址</text>
				<view class="space-between">
					<view class="column">
						<text class="info">{{company.addressName}}{{company.addressHouse}}</text>
						<text class="margin-left-10 text-color-grey">{{company.address}}</text>
					</view>
					<view class="nav" @click="toMap()">
						<text class="yzb yzb-daohang"></text>
						<text style="margin-left: 5upx;">导航</text>
					</view>
				</view>
				
			</view>
			<view class="detail">
				<text class="title">公司介绍</text>
				<view class="desc"><sunui-grand :content="company.companyProfile" color="#1D82FE" bg="#fff" :clamp="3" expandText="点击展开全文" shinkText="收起"></sunui-grand></view>
			</view>
			
			<view class="detail">
				<text class="title">公司照片</text>
				<view class="margin-top-20">
					<m-swiper :list="ablumList" @clickImg="clickImg"></m-swiper>		
				</view>
			</view>

			<view class="others">
				<text class="title">招聘岗位</text>
				<m-position></m-position>
			</view>
		</view>
	</joy-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import sunUiGrand from '@/components/sunui-grand/sunui-grand.vue';
export default {
	components: {
		sunUiGrand
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			company:{},
			ablumList:[],
			list:[],
			desc:
				'1、带领实施团队完成软件项目实施，完成从软件项目立项需求调研、需求分析，到系统开发，系统测试、系统实施部署等过程的管理；' +
				'2、置顶项目计划和实施部署，负责整个项目开发进度、质量的管理、控制以及推进；有效的保证项目节点达成。' +
				'3、置顶项目计划和实施部署，负责整个项目开发进度、质量的管理、控制以及推进；有效的保证项目节点达成。'
		};
	},
	async onLoad(query) {
		console.log('APP进入首页');
		if(query.id>0){
			this.getDetail(query.id);
		}else{
			this.getDetail(this.userInfo.companyId);
		}
	},
	methods: {
		
		async getDetail(id) {
			let res = await this.$apis.getCompanyDetail({id:id});
			if (res) {
				this.company = res;
				if(this.company.welfare){
					this.company.welfare=this.company.welfare.split(",");
				}
				this.list = res.album.split(',');
				for(let i in this.list){
					let item={
						pic:''
					}
					item.pic=this.list[i];
					this.ablumList.push(item);
				}
			}
		},
		
		clickImg(index){
			console.log(index);
			this.previewImg(index);
		},
		
		// 查看图片
		previewImg(index) {
			console.log("预览=="+index)
			uni.previewImage({
				indicator: 'number',
				loop: true,
				current: this.list[index],
				urls: this.list
			});
		},
		
		toCompany() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.companyDetail,
				query: {
					id: 1
				}
			});
		},

		toMap() {
			console.log("地图");
			// let latitude=this.company.latitude;
			// let longitude=this.company.longitude;
			uni.openLocation({
				latitude: parseFloat(this.company.latitude),
				longitude: parseFloat(this.company.longitude),
				success: function() {
					console.log('success');
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.center-align {
	display: flex;
	align-items: center;
}

.body {
	padding: 20upx;
	box-sizing: border-box;
	background-color: $bgcolor_white;
}

.top {
	padding: 30upx 0;
	.company {
		display: flex;
		flex-direction: column;
	}
	.name {
		font-size: $font-size-40;
		font-weight: bold;
		color: $font-color-000;
	}
	.logo {
		width: 150upx;
		height: 150upx;
		border: 1upx solid $border-color-base;
		border-radius: 10upx;
	}
	.require {
		font-size: $uni-font-size-base;
		margin-top: 15upx;
		color: $font-color-666;
	}
}

.time {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	padding-top: 20upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 20upx 0;
	}
	.require {
		display: flex;
		flex-direction: row;
		margin-top: 15upx;
		.item {
			margin-right: 30upx;
		}
		.top-icon {
			font-size: $font-lg;
			margin-right: 10upx;
		}
	}
	
	.welfare{
		display: flex;
		flex-direction: row;
		margin-top: 25upx;
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
}
.address {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 20upx 0;
	}
	.info {
		font-size: $uni-font-size-lg;
		padding: 10upx;
		line-height: 1.5;
	}
	.nav {
		width: 20%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: 1upx solid $border-color-base;
		padding: 0upx 20upx;
		height: 70upx;
		border-radius: 35upx;
	}
}

.detail {
	display: flex;
	flex-direction: column;
	padding-bottom: 30upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx 0 0 0;
	}
	.desc {
		line-height: 1.8;
	}
	.skill {
		margin-top: 25upx;
		text {
			font-size: $uni-font-size-base;
			padding: 10upx 20upx;
			margin-right: 15upx;
			background-color: $border-color-base;
			border-radius: 5upx;
			color: $font-color-666;
		}
	}
}

.others {
	display: flex;
	flex-direction: column;
	margin-top: 30upx;
	border-top: 1upx solid $border-color-base;
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bold;
		padding: 30upx;
		border-bottom: 1upx solid $border-color-base;
	}
}
</style>
