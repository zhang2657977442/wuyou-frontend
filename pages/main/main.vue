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
			<view style="padding: 20upx 0;background-color: #FFFFFF;">
				<yzb-grid :columnNum="4" :data="grid" show-border="false" @click="handleClickGrid"></yzb-grid>
			</view>
			<view class="notice">
				<view class="content">
					<text class="yzb yzb-notice notice-icon"></text>
					<view class="notice-text">
						<text>北京世佳科技</text>
						正在招聘
						<text>项目经理</text>
						职位
					</view>
					<text class="yzb yzb-next notice-next"></text>
				</view>
			</view>
			<view class="post">
				<text class="title">热门岗位</text>
				<view class="post-list">
					<view v-for="(item, index) in postList" :key="index" @click="toAllPost">
						<text class="post-item" :class="index % 4 != 0 ? 'post-item-left' : ''">{{ item.name }}</text>
					</view>
				</view>
				<view class="all" @click="toAllPost">
					<text class="all-text">查看全部职位</text>
					<text class="yzb yzb-next post-next"></text>
				</view>
			</view>
			<template v-if="hasLogin == false || (hasLogin && userInfo.role == '求职者')">
				<view class="expect">
					<scroll-view class="items" :scroll-x="true"><text class="title">热门工作</text></scroll-view>
				</view>
				<m-position :positions="list" @click="positionDetail"></m-position>
			</template>
			<template v-if="hasLogin && userInfo.role == '招聘者'">
				<view class="expect">
					<scroll-view class="items" :scroll-x="true"><text class="title">推荐简历</text></scroll-view>
				</view>
				<yzb-resume :list="list" @click="resumeDetail"></yzb-resume>
			</template>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more
					v-if="status == '请求失败'"
					status="加载失败，点我重试"
					:showIcon="false"
					@click="reLoad"
				></uni-load-more>
			</view>
		</view>
	</joy-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mSwiper from '@/components/m-swiper/m-swiper.vue'
import mPosition from '@/components/m-position/m-position.vue'
import yzbResume from '@/components/yzb/yzb-resume.vue'
import yzbGrid from '@/components/yzb/yzb-grid.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
export default {
	components: {
		mSwiper,
		mPosition,
		yzbGrid,
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
			banner: [
				'https://pan.whiteones.cn/d/PicGo/wuyou/jobhigh_banner.png',
				'https://pan.whiteones.cn/d/PicGo/wuyou/jobnew_banner.png',
				'https://pan.whiteones.cn/d/PicGo/wuyou/company_banner.png',
				'https://pan.whiteones.cn/d/PicGo/wuyou/resume_banner.png'
			],
			grid: [],
			adList: [],
			postList: [
				{ name: '销售', selected: false, type: 1 },
				{ name: '技工/普工', selected: false, type: 1 },
				{ name: '餐饮', selected: false, type: 1 },
				{ name: '后端开发', selected: false, type: 1 },
				{ name: '市场/营销', selected: false, type: 1 },
				{ name: '地产中介', selected: false, type: 1 },
				{ name: '助教', selected: false, type: 1 },
				{ name: '产品经理', selected: false, type: 1 },
				{ name: '工程造价', selected: false, type: 1 },
				{ name: '证券/基金', selected: false, type: 1 },
				{ name: '律师顾问', selected: false, type: 1 },
				{ name: '影视媒体', selected: false, type: 1 }
			],
			JobExpectList: [{ name: '后端开发', selected: true, type: 1 }],
			list: []
		}
	},

	async onLoad(query) {
		await this.$AppEntryController.main(query)
		this.getGrids()
	},

	onShow() {
		this.page = 1
		this.limit = 10
		this.list = []
		if (this.hasLogin && this.userInfo.role === '招聘者') {
			this.getResumeList()
		} else {
			this.getJobList()
		}
		this.getGrids()
	},

	onReachBottom() {
		this.page++
		if (this.hasLogin && this.userInfo.role === '招聘者') {
			this.getResumeList()
		} else {
			this.getJobList()
		}
	},
	methods: {
		async getJobList() {
			let param = {
				current: this.page,
				pageSize: this.limit,
				jobName: ''
			}
			this.status = '请求中'
			let res = await this.$apis.getJobList(param)
			if (res) {
				let data = res.list
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',')
					}
				}
				this.list = this.list.concat(data || [])
				this.changeStatus(res)
			}
		},

		async getResumeList() {
			let param = {
				current: this.page,
				pageSize: this.limit
			}
			this.status = '请求中'
			let res = await this.$apis.getResumeList(param)
			if (res) {
				let data = res.list
				this.list = this.list.concat(data || [])
				this.changeStatus(res)
			}
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据'
			} else if (this.page >= Math.ceil(data.total / this.limit)) {
				this.status = '没有更多'
			} else {
				this.status = '请求更多'
			}
		},

		handleClickGrid(o) {
			if (this.grid[o.index].type == 999) {
				uni.switchTab({
					url: '../type/type'
				})
				return
			}
			this.$mRouter.push({
				route: this.grid[o.index].path,
				query: {
					type: this.grid[o.index].type
				}
			})
		},
		getGrids(){
			this.grid = [{
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
					image: this.$mAssetsPath.grid_2,
					text: '高薪优选',
					path: this.$mRoutesConfig.positionList,
					type: 2
				}]
			if (this.hasLogin && this.userInfo.role === '招聘者') {
				this.grid.push({
					image: this.$mAssetsPath.grid_6,
					text: '简历列表',
					path: this.$mRoutesConfig.resumeList,
					type: 2
				})
			} else {
				this.grid.push({
					image: this.$mAssetsPath.grid_5,
					text: '热门公司',
					path: this.$mRoutesConfig.companyList,
					type: 2
				})
			}
		},
		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					details: encodeURIComponent(JSON.stringify(item))
				}
			})
		},

		resumeDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.resumeDetail,
				query: {
					id: item.id
				}
			})
		},

		toAllPost() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
			})
		},

		search() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.search
			})
		}
	}
}
</script>

<style lang="scss" scoped>
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
		text-overflow: ellipsis;
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
		.title {
			font-weight: bold;
			font-size: $uni-font-size-lg;
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
