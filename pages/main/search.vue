<template>
	<view class="column ">
		<view class="search">
			<view class="search-input">
				<text class="yzb yzb-search"></text>
				<input class="text-normal" type="text" :value="searchValue" :placeholder="placeholder" @input="searchInput" />
			</view>
			<view class="btn-search" v-if="popularShow == false" @click="search">搜索</view>
			<view class="btn-cancel" v-if="popularShow == true" @click="cancelSearch">取消</view>
		</view>
		<!-- 占位 -->
		<view class="placeholder-90"></view>
		<view class="center-algin" style="margin-top: 40%;" v-if="list.length == 0 && searchRecent == false">
			<m-empty-data :coverUrl="no_order_1" noTxt="暂无搜索记录"></m-empty-data>
		</view>
		<view class="searchRecent padding-20" v-if="searchRecent == true">
			<view class="searchRecent-title text-grey space-between-algin">
				<text>最近搜索</text>
				<text class="" @click="clearRecent">清空</text>
			</view>
			<view class="history">
				<view class="searchRecent-content" v-for="(item, index1) in searchRecentList" :key="index1" @click="recentClick(item)">
					<text class="text-size-mim">{{ item }}</text>
				</view>
			</view>
		</view>
		<view style="background-color:#efefef ;width: 100%;" class="top-line" v-if="list.length > 0">
			<m-position v-if="role==0" :positions="list" @click="positionDetail"></m-position>
			<yzb-resume v-else :list="list" @click="detail"></yzb-resume>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import yzbResume from '@/components/yzb/yzb-resume.vue';
import mPosition from '@/components/m-position/m-position.vue';
export default {
	components: {
		mEmptyData,
		yzbResume,
		mPosition
	},
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			searchValue: '',
			placeholder: '请输入关键词搜索相关内容',
			popularShow: false, // 热门搜索
			searchRecent: false, // 最近搜索
			searchRecentList: [], // 最近搜索
			page: 1,
			limit: 15,
			currentIndex: 0,
			type: 1, // 1-札记，2-曲谱，3-视频
			list: [], //搜索结果列表
			role:0,//0-求职，1-招聘
		};
	},
	onLoad() {
		this.searchRecentList = this.$db.get('historySearch');
		if (this.searchValue == '' && this.searchRecentList != null && this.searchRecentList != '') {
			this.searchRecent = true;
		}
		if(this.hasLogin && this.userInfo.memberRole==1){
			this.role=1;
		}else{
			this.role=0
		}
	},
	onReachBottom() {
		this.pages++;
		this.getPositionList();
	},
	methods: {
		
		getList(){
			if(this.role==0){
				this.getPositionList();
			}else{
				this.getResumeList();
			}
		},
		
		async getPositionList() {
			let param = {
				page: this.page,
				limit: this.limit,
				postName:this.searchValue,
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
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},
		
		async getResumeList() {
			let param = {
				page: this.page,
				limit: this.limit
			};
			this.status = '请求中';
			let res = await this.$apis.getResumeList(param);
			if (res) {
				let data = res.data;
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
		
		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					id: item.id
				}
			});
		},
		
		detail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.resumeDetail,
				query: {
					id: item.id
				}
			});
		},

		// 最近搜索点击
		recentClick(item) {
			this.searchValue = item;
			this.search();
		},

		// 搜索
		search() {
			if (this.searchValue) {
				this.searchRecent = false;
				this.historySearch();
				this.list = [];
				this.getList();
			} else {
				uni.showToast({
					icon: 'none',
					title: '请输入要搜索的关键字'
				});
			}
		},

		// 清空最近搜索
		clearRecent() {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确定清空搜索记录吗',
				success(res) {
					if (res.confirm) {
						uni.removeStorageSync('historySearch');
						// 隐藏最近搜索
						that.searchRecent = false;
						that.currentIndex = 0;
					}
				}
			});
		},

		// 保存最近搜索
		historySearch() {
			var history = this.$db.get('historySearch');
			console.log(history);
			if (history == null || history == '') {
				history = [];
			}
			//判定是否已经看过,先删除
			for (var i = 0; i < history.length; i++) {
				if (history[i] == this.searchValue) {
					console.log('删除该元素' + history[i]);
					history.splice(i, 1);
				}
			}
			//控制最多保存10个
			if (history.length == 10) {
				history.splice(9, 1);
			}
			history.unshift(this.searchValue);
			this.$db.set('historySearch', history);
		},

		popular(item) {
			console.log(item);
			this.searchValue = item.text;
		},

		// 取消搜索
		cancelSearch() {
			this.popularShow = true;
		},

		searchInput(e) {
			this.searchValue = e.detail.value;
			this.searchRecentList = this.$db.get('historySearch');
			if (this.searchValue == '' && this.searchRecentList != null && this.searchRecentList != '') {
				this.searchRecent = true;
				this.currentIndex = 0;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background: #fff;
}
.search {
	height: 90upx;
	position: fixed;
	top: 0;
	z-index: 5;
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: $main-color;
	color: #ffffff;
	align-items: center;
	justify-content: center;
}

.yzb-search {
	color: $font-color-999;
	font-size: $uni-font-size-base;
	margin: 0 15upx;
	margin-top: 8upx;
}
.search-input {
	width: 77%;
	height: 65upx;
	border-radius: 50upx;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;
	align-items: center;
}
.search-input image {
	width: 35upx;
	height: 35upx;
	margin-right: 10upx;
}
.search-input input {
	width: 65%;
	font-size: 28upx;
	color: $font-color-333;
}

.btn-search {
	margin-left: 20upx;
}

.btn-cancel {
	margin-left: 20upx;
}

.searchRecent{
}

.searchRecent-title {
	height: 60upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	text {
		font-size: $uni-font-size-lg;
		color: $font-color-666;
	}
}

.history {
	flex-wrap: wrap;
	display: flex;
	flex-direction: row;
}

.searchRecent-content {
	margin: 15upx 20upx 15upx 0;
	padding: 8upx 30upx;
	background-color: $bg-grey;
	display: flex;
	border-radius: 5upx;
}

.type {
	width: 100%;
	height: 80upx;
	position: fixed;
	top: 90upx;
	z-index: 5;
}
.type-view {
	width: 25%;
	height: 80upx;
}
.type-view-line {
	width: 45upx;
	height: 4upx;
	border-radius: 15upx;
}

.wonderful {
	width: 95%;
	flex-wrap: wrap;
}

.wonderful-content {
	width: 47%;
	height: 340upx;
	position: relative;
}

.wonderful-playImg {
	width: 80upx;
	height: 80upx;
	position: absolute;
	top: 60upx;
	left: 125upx;
}

.wonderful-content-img {
	width: 100%;
	height: 190upx;
	border-radius: 12upx;
}

.placeholder-90 {
	width: 100%;
	height: 90upx;
}

.placeholder-170 {
	width: 100%;
	height: 170upx;
}

.forum {
	/* margin-top: 100upx; */
}

.forum-line {
	border-top: 5upx #efefef solid;
}

.forum-top {
	width: 94.5%;
}
.forum-top-left image {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
.share {
	width: 50upx;
	height: 50upx;
}
.forum-top-content {
	width: 94.5%;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
.forum-img {
	width: 94.5%;
	flex-wrap: wrap;
	padding-bottom: 0;
	/* justify-content: space-around; */
}
.forum-img-image {
	width: 226upx;
	height: 226upx;
	margin-right: 15upx;
	margin-bottom: 15upx;
}
.forum-img-image:nth-of-type(3n) {
	margin-right: 0upx;
}
.forum-btn {
	height: 100upx;
}
.btn {
	width: 250upx;
}
.btn image {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
}
</style>
