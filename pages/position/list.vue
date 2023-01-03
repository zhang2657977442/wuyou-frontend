<template>
	<joy-page class="">
		<!-- <view class="mp-search">
			<view class="mp-search-input" @click="search">
				<text class="yzb yzb-search" style="font-size: 36upx;margin-right: 15upx;"></text>
				<text>搜索商品或关键词</text>
			</view>
		</view> -->
		<!-- <view class="top"> -->
			<image class="top" :src="bgImg"></image>
		<!-- </view> -->
		<view class="">
			<m-position :positions="positionList" @click="positionDetail"></m-position>
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
import mAd from '@/components/m-ad/m-ad.vue';
export default {
	components: {
		mSwiper,
		uniGrid,
		mPosition,
		mAd
	}, 
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			positionList: [],
			status: '',
			page: 1,
			limit: 10,
			banner: [],
			grid: [],
			ka: [],
			adList: [],
			type:1,
			bgImg:"",
		};
	},
	async onLoad(query) {
		this.type=query.type;
		if(this.type==1){
			this.bgImg="https://pan.whiteones.cn/d/PicGo/wuyou/job-new.png";
			uni.setNavigationBarTitle({
				title:"最近发布"
			})
			console.log(this.bgImg);
		}else if(this.type==2){
			this.bgImg="https://pan.whiteones.cn/d/PicGo/wuyou/job-high.png";
			uni.setNavigationBarTitle({
				title:"高薪优选"
			})
		}
		this.getPositionList();
	},
	
	onReachBottom() {
		this.page++;
		this.getPositionList();
	},
	
	methods: {
		
		async getPositionList() {
			let param = {
				page: this.page,
				limit: this.limit,
				type:this.type,
			};
			this.status = '请求中';
			let res = await this.$apis.getPositionList(param);
			if (res) {
				let data = res.data;
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',');
					}
				}
				this.positionList = this.positionList.concat(data || []);
				this.changeStatus(res);
			}
		},
		
		// 修改请求状态
		changeStatus(data) {
			if (this.positionList.length === 0) {
				this.status = '暂无数据';
			} else if (this.page >= Math.ceil(data.count / this.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
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
	}
};
</script>

<style lang="scss" scoped>

.top{
	height: 320upx;
	width: 100%;
}
	
	
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
	margin-top: 2upx;
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
		width: 22%;
		padding: 15upx 0upx;
		border-radius: 8upx;
		margin-top: 20upx;
		text-align: center;
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
		width: 80%;
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
</style>
