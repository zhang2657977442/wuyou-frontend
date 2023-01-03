<template>
	<joy-page class="">
		<view class="mp-search">
			<view class="mp-search-input" @click="search">
				<text class="yzb yzb-search" style="font-size: 36upx;margin-right: 15upx;"></text>
				<text>搜索岗位或关键词</text>
			</view>
		</view>
		<view style="position: relative;top: 80upx;">
			<m-swiper :list="banner"></m-swiper>
			<view style="padding: 20upx 0;background-color: #FFFFFF;"><uni-grid :columnNum="5" :data="grid" show-border="false" @click="handleClickGrid"></uni-grid></view>
			<view class="notice">
				<view class="content">
					<text class="yzb yzb-notice notice-icon"></text>
					<view class="notice-text">
						<text>益源科技</text>
						正在招聘
						<text>项目经理</text>
						职位
					</view>
					<text class="yzb yzb-next notice-next"></text>
				</view>
			</view>
			<view class="post">
				<text class="title">热门工作</text>
				<view class="post-list">
					<view v-for="(item, index) in postList" :key="index" @click="toPost(item)">
						<text class="post-item" :class="index % 4 != 0 ? 'post-item-left' : ''">{{ item.name }}</text>
					</view>
				</view>
				<view class="all" @click="toAllPost">
					<text class="all-text">查看全部职位</text>
					<text class="yzb yzb-next post-next"></text>
				</view>
			</view>
			<!-- <m-ad :list="adList"></m-ad> -->
			<template v-if="hasLogin==false ||( hasLogin && userInfo.role=='求职者')">
				<view class="expect">
					<scroll-view class="items" :scroll-x="true">
						<text v-for="(item, index) in JobExpectList" :key="index" :class="item.selected ? 'selected' : ''" @click="selectExpect(index)">{{ item.name }}</text>
					</scroll-view>
					<text class="yzb yzb-bianji1 expect-icon"></text>
				</view>
				<m-position :positions="list" @click="positionDetail"></m-position>
			</template>
			<template v-if="hasLogin && userInfo.role=='招聘者'">
				<view class="expect">
					<scroll-view class="items" :scroll-x="true">
						<text v-for="(item, index) in JobExpectList" :key="index" :class="item.selected ? 'selected' : ''" @click="selectExpect(index)">{{ item.name }}</text>
					</scroll-view>
					<text class="yzb yzb-bianji1 expect-icon"></text>
				</view>
				<yzb-resume :list="list" @click="resumeDetail"></yzb-resume>
			</template>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
	</joy-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mSwiper from '@/components/m-swiper/m-swiper.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import mPosition from '@/components/m-position/m-position.vue';
import yzbResume from '@/components/yzb/yzb-resume.vue';
import mAd from '@/components/m-ad/m-ad.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		mSwiper,
		uniGrid,
		mPosition,
		mAd,
		uniLoadMore,
		yzbResume
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			status: '',
			page: 1,
			limit: 10,
			banner: ['https://pan.whiteones.cn/d/PicGo/wuyou/job-high.png','https://pan.whiteones.cn/d/PicGo/wuyou/job-new.png'],
			grid: [],
			ka: [],
			adList: [],
			postList: [
				{ name: '销售', selected: false, type: 1 },
				{ name: '技工/普工', selected: false, type: 1 },
				{ name: '餐饮', selected: false, type: 1 },
				{ name: '销售管理', selected: false, type: 1 },
				{ name: '市场/营销', selected: false, type: 1 },
				{ name: '销售', selected: false, type: 1 },
				{ name: '技工/普工', selected: false, type: 1 },
				{ name: '餐饮', selected: false, type: 1 },
				{ name: '销售管理', selected: false, type: 1 },
				{ name: '市场/营销', selected: false, type: 1 },
				{ name: '销售', selected: false, type: 1 },
				{ name: '影视媒体', selected: false, type: 1 }
			],
			JobExpectList: [{ name: '销售', selected: true, type: 1 }],
			list: [],
			selectExpected: null
		};
	},
		
	async onLoad(query) {
		await this.$AppEntryController.main(query);
		this.getGrids();
	},
	
	onShow() {
		if(this.hasLogin && this.userInfo.role==='招聘者'){
			this.getCompanyPositionList();
		}else{
			this.getJobExpectList();
		}
	},

	onReachBottom() {
		this.page++;
		this.getPositionList();
	},
	methods: {
	
		async getJobExpectList() {
			let data = await this.$apis.getJobExpectList();
			if (data) {
				for (let i in data) {
					data[i].selected = false;
					if (i == 0) {
						data[i].selected = true;
					}
				}
				this.JobExpectList = data;
				this.selectExpected = this.JobExpectList[0];
				this.getPositionList();
			}
		},

		async getPositionList() {
			let param = {
				page: this.page,
				limit: this.limit
			};
			if (this.selectExpected) {
				param = {
					page: this.page,
					limit: this.limit,
					postName: this.selectExpected.postName
				};
			}
			this.status = '请求中';
			let res = await this.$apis.getPositionList(param);
			if (res) {
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},
		
		async getCompanyPositionList(){
			let param={
				page:1,
				limit:30
			}
			console.log("---===getCompanyPositionList")
			let res = await this.$apis.getCompanyPositionList(param);
			if(res){
				let data=res.data;
				for (let i in data) {
					data[i].selected = false;
					if (i == 0) {
						data[i].selected = true;
					}
				}
				this.JobExpectList = data;
				this.selectExpected = this.JobExpectList[0];
				this.getResumeList();
			}
		},
		
		async getResumeList() {
			let param = {
				page: this.page,
				limit: this.limit
			};
			if (this.selectExpected) {
				param = {
					page: this.page,
					limit: this.limit,
					postName: this.selectExpected.postName
				};
			}
			this.status = '请求中';
			let res = await this.$apis.getResumeList(param);
			if (res) {
				let data = res.data;
				// for (let i in data) {
				// 	if (data[i].skill) {
				// 		data[i].skill = data[i].skill.split(',');
				// 	}
				// }
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},
		

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据';
			} else if (this.page >= Math.ceil(data.count / this.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},

		getGrids() {
			this.grid = [
				{
					image: this.$mAssetsPath.grid_1,
					text: '最新发布',
					path: this.$mRoutesConfig.positionList,
					type: 1
				},
				{
					image: this.$mAssetsPath.grid_7,
					text: '全部职位',
					path: this.$mRoutesConfig.type,
					type: 999
				},
				{
					image: this.$mAssetsPath.grid_5,
					text: '热门公司',
					path: this.$mRoutesConfig.companyList,
					type: 2
				},
				{
					image: this.$mAssetsPath.grid_2,
					text: '高薪优选',
					path: this.$mRoutesConfig.positionList,
					type: 2
				},
				{
					image: this.$mAssetsPath.grid_6,
					text: '简历列表',
					path: this.$mRoutesConfig.resumeList,
					type: 2
				}
			];
		},

		handleClickGrid(o) {
			if (this.grid[o.index].type == 999) {
				uni.switchTab({
					url: '../type/type'
				});
				return;
			}
			this.$mRouter.push({
				route: this.grid[o.index].path,
				query: {
					type: this.grid[o.index].type
				}
			});
		},

		selectExpect(index) {
			for (let i in this.JobExpectList) {
				if (index == i) {
					this.JobExpectList[i].selected = true;
				} else {
					this.JobExpectList[i].selected = false;
				}
			}
			this.selectExpected = this.JobExpectList[index];
			this.page = 1;
			this.list = [];
			if(this.hasLogin && this.userInfo.memberRole==1){
				this.getResumeList();
			}else{
				this.getPositionList();
			}
		},

		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},
		
		resumeDetail(item){
			this.$mRouter.push({
				route: this.$mRoutesConfig.resumeDetail,
				query: {
					id: item.id
				}
			});
		},

		toAllPost() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
				query: {
					id: 1
				}
			});
		},
		toPost(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
				query: {
					id: item.id
				}
			});
		},

		search() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.search
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.ka {
	width: 100%;
	height: 260upx;
	position: relative;

	&:after {
		content: '';
		position: absolute;
		transform-origin: center;
		box-sizing: border-box;
		pointer-events: none;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-bottom: 1px solid #c8c7cc;
		transform: scale(0.5);
	}
}

// 搜索框
.mp-search {
	position: fixed;
	top: 0;
	z-index: 100;
	margin-bottom: 80upx;
	background: $main-color;
	height: 80upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-bottom: 1upx solid #eeeeee;
	.mp-search-input {
		font-size: 28upx;
		background: #f5f5f5;
		// background: #FFFFFF;
		height: 60upx;
		width: 94%;
		border-radius: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #909399;
	}
}

.notice {
	width: 100%;
	// padding: 3%;
	margin-top: 20upx;
	padding: 20upx 0;
	background-color: #ffffff;
	.content {
		width: 90%;
		padding: 20upx 15upx;
		margin: 0 auto;
		border-radius: $uni-border-radius-lg;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.notice-icon {
			color: $main-color;
			font-size: $font-size-36;
		}
		.notice-text {
			color: $font-color-light;
			text {
				color: $font-color-dark;
				font-weight: bold;
				padding: 0 15upx;
			}
		}
		.notice-next {
			font-size: $font-size-34;
			color: $font-color-light;
		}
	}
}

.post {
	margin-top: 20upx;
	// margin-top: 2upx;
	background-color: #ffffff;
	padding: 20upx;
	.title {
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}

	.post-list {
		overflow: hidden;
		white-space: nowrap;
		flex-wrap: wrap;
		width: 96%;
		padding: 2%;
	}
	.post-item {
		// background-color: #F7F7F7;
		border: 1upx solid $border-color-base;
		font-size: $uni-font-size-sm;
		float: left;
		width: 20%;
		padding: 15upx 1%;
		border-radius: 8upx;
		margin-top: 20upx;
		text-align: center;
		
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.post-item-left {
		margin-left: 3%;
	}

	.all {
		margin-top: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.all-text {
			color: $main-color;
			font-weight: bold;
		}
		.post-next {
			font-size: $font-size-34;
			color: $main-color;
			margin-left: 5upx;
		}
	}
}

.expect {
	padding: 25upx 2%;
	margin-top: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	background-color: $bgcolor_white;
	border-bottom: 1upx solid $border-color-base;
	.items {
		width: 85%;
		padding: 0 3%;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		white-space: nowrap;
		align-items: center;
		text {
			padding: 0 10upx;
			font-size: $uni-font-size-lg;
			color: $font-color-base;
		}
		.selected {
			font-weight: bold;
			color: $font-color-000;
			font-size: $font-size-34;
		}
	}
	.expect-icon {
		size: $uni-font-size-lg;
		color: $font-color-gray;
		margin-right: 10upx;
	}
}
.load-more-box {
	// height: 120upx;
}
</style>
