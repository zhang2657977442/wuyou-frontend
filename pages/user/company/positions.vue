<template>
	<view class="content">
<!-- 		<view class="QS-tabs-box">
			<QSTabs
				ref="tabs"
				:tabs="tabs"
				animationMode="line3"
				:current="current"
				@change="change"
				activeColor="#ffffff"
				lineColor="#ffffff"
				background-color="#12ae85"
				defaultColor="#ebedef"
				:font-size="30"
				swiperWidth="750"
			></QSTabs>
		</view> -->
		<swiper :style="{ height: scrollHeight + 'px' }" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view
					scroll-y
					style="width: 100%;"
					:style="{ height: scrollHeight + 'px' }"
					@scrolltolower="loadBottom"
					:refresher-triggered="triggered"
					@refresherrestore="onRestore"
					@refresherrefresh="onRefresh"
					refresher-enabled
				>
					<view class="scroll-items" v-if="datas[index].length > 0">
						<view class="item bottom-line" v-for="(item2, index2) in datas[index]" :key="index2"
						 @click="toDetail(item2)">
							<view class="title space-between">
								<text :class="true ? 'left' : 'left-close'">{{ item2.postName }}</text>
								<!-- <text class="right">已关闭</text> -->
							</view>
							<view class="company">
								{{ item2.expRequire }}
								<view class="height-line"></view>
								{{ item2.minEducation }}
								<view class="height-line"></view>
								{{ item2.salary }}
							</view>
<!-- 							<view class="desc">
								<text v-for="(item3, index3) in item2.skill" :key="index3">{{item3}}</text>
								<text>需求分析</text>
								<text>软件开发</text>
								<text>团队管理</text>
							</view> -->
						</view>
					</view>
					<template v-else>
						<m-empty-data :coverUrl="no_order_1" noTxt="空空如也"></m-empty-data>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="btn-row top-line">
			<button type="primary" class="btn-save" @tap="addNew()">发布新职位</button>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
const Sys = uni.getSystemInfoSync();
const wH = Sys.windowHeight;
let n = 1;

export default {
	components: {
		QSTabs,
		mEmptyData
	},
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			// tabs: ['全部', '开放中', '待开放', '审核失败', '已关闭'],
			tabs: ['全部'],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			no_order_1: this.$mAssetsPath.no_order_1,
			datas: [],
			scrollHeight: 0,

			status: '',
			query: {
				pageSize: 10,
				current: 1,
				id:'',
			},
			list: [],
			triggered: false
		};
	},
	onLoad() {
		this.scrollHeight = wH - uni.upx2px(200);
		this.query.id = this.userInfo.companyId
	},

	onShow() {
		this.list=[];
		this.initPage();
	},

	onPullDownRefresh() {
		this.loadTop();
	},
	onReachBottom() {
		this.loadBottom();
	},

	methods: {
		onRefresh() {
			this.triggered = false;
			if (this._freshing) return;
			// this._freshing = true;
			// setTimeout(() => {
			// 	this.triggered = false;
			// 	this._freshing = false;
			// }, 3000);
		},
		onRestore() {
			// this.triggered = 'restore'; // 需要重置
			this.triggered = false;
		},
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},

		addNew() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionEdit
			});
		},

		toDetail(item) {
			// this.$mRouter.push({
			// 	route: this.$mRoutesConfig.positionDetail
			// });
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionEdit,
				query: {
					item: encodeURIComponent(JSON.stringify(item))
				}
			});
		},

		async initPage() {
			try {
				this.query.current = 1;
				let data = await this.$apis.getCompanyJob(this.query);
				this.list = this.list.concat(data.list || []);
				this.datas[this.current] = this.list;
				console.log(this.list);
				this.changeStatus(data);
				// this.joyPageStatus = 'success';
			} catch (e) {
				// this.joyPageStatus = 'fail';
			}
		},

		//下拉刷新操作
		async loadTop() {
			try {
				this.query.current = 1;
				let data = await this.$apis.getCompanyJob(this.query);
				setTimeout(() => {
					this.list = data.list || [];
					this.datas[this.current] = this.list;
					this.changeStatus(data);
					uni.stopPullDownRefresh();
				}, 500);
			} catch (e) {
				uni.stopPullDownRefresh();
			}
		},

		//上拉加载操作
		async loadBottom() {
			console.log('infiniteDisabled:', this.infiniteDisabled);
			if (this.infiniteDisabled) {
				return;
			}
			if (this.status == '请求失败') {
				this.reLoad();
				return;
			}
			try {
				this.query.current++;
				this.status = '请求中';
				let data = await this.$apis.getCompanyJob(this.query);
				this.list = this.list.concat(data.list || []);
				this.datas[this.current] = this.list;
				this.changeStatus(data);
			} catch (error) {
				this.status = '请求失败';
			}
		},

		// 网络错误 重新加载
		async reLoad() {
			try {
				if (this.query.current == 1) this.query.current++;
				this.status = '请求中';
				let data = await this.$apis.getCompanyJob(this.query);
				this.list = this.list.concat(data.list || []);
				this.datas[this.current] = this.list;
				this.changeStatus(data);
			} catch (error) {
				this.status = '请求失败';
			}
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据';
			} else if (this.query.current >= Math.ceil(data.total / this.query.pageSize)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	height: 100vh;
}

.QS-tabs-box {
	position: fixed;
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 1000;
	background-color: white;
}
.swiper-item {
	background-color: #fff;
}
.scroll-items {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10upx 20rpx;
	box-sizing: border-box;
	.item {
		padding: 20upx;
	}
}
.scroll-item {
	margin-top: 15rpx;
	padding: 25rpx;
	background-color: white;
	border-radius: 8rpx;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	/* border: 1px solid #f8f8f8; */
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.title {
	.left {
		font-weight: bold;
		font-size: $uni-font-size-lg;
	}
	.left-close {
		font-weight: bold;
		color: $font-color-999;
		font-size: $uni-font-size-lg;
	}

	.right {
		color: $font-color-999;
		font-weight: bold;
	}
}

.company {
	color: $font-color-666;
	margin-top: 15upx;
	font-size: $uni-font-size-base;
	display: flex;
	flex-direction: row;
	align-items: center;
	.height-line {
		height: 20upx;
		width: 4upx;
		background-color: $font-color-ccc;
		margin: 0 15upx;
	}
}

.desc {
	margin: 10upx 0;
	text {
		font-size: $uni-font-size-base;
		padding: 5upx 10upx;
		margin-right: 15upx;
		background-color: $border-color-base;
		border-radius: 5upx;
		color: $font-color-666;
	}
}

.user {
	margin-top: 35upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 60upx;
		height: 60upx;
	}
	.left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: $uni-font-size-base;
		.name {
			margin: 0 20upx;
		}
		.post {
			// color: $font-color-666;
		}
	}
	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: $font-color-666;
		font-size: $uni-font-size-base;
		.area {
			margin-right: 15upx;
		}
	}
}

.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;

	.btn-save {
		background-color: $main-color;
		height: 80upx;
		line-height: 80upx;
		font-size: $font-size-34;
		width: 90%;
	}
}
</style>
