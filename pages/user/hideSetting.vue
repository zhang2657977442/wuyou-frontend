<template>
	<yzb-page :loadStatus="loadStatus">
		<view class="title" v-if="query.type==0">已屏蔽{{count}}家公司</view>
		<view class="title" v-else>已添加{{count}}家公司</view>
		<uni-list v-if="list.length > 0">
			<uni-list-item :title="item.companyName" :note="item.companyFullName" v-for="(item, index) in list" :key="index">
				<template v-slot:footer>
					<text class="unbind" @click="doRemove(item)">解除</text>
				</template>
			</uni-list-item>
		</uni-list>
		<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		<view class="load-more-box">
			<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
			<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
		</view>
		<view class="bottom" v-if="query.type==0"><button @click="addShield">添加屏蔽公司</button></view>
		<view class="bottom" v-else><button @click="addShield">添加不感兴趣公司</button></view>
	</yzb-page>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
export default {
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			list: [],
			status: '暂无数据',
			query: {
				page: 1,
				limit: 10,
				type:0,
			},
			loadStatus: 'loading' ,//loading、fail、success
			count:0,
		};
	},
	
	onLoad(options) {
		console.log(options);
		if(options.name=='隐私设置'){
			this.query.type=0;
			uni.setNavigationBarTitle({
				title:'隐私设置'
			})
		}else if(options.name=='不感兴趣'){
			this.query.type=1;
			uni.setNavigationBarTitle({
				title:'不感兴趣'
			})
		}
	},
	
	onShow() {
		this.getList();
	},
	onReachBottom() {
		this.getList('add');
	},

	onPullDownRefresh() {
		this.getList('refresh', true);
	},
	methods: {
		async getList(type = 'refresh', loadtop = false) {
			this.status = '请求中';
			if (type == 'refresh') {
				this.query.page = 1;
			} else {
				this.query.page++;
			}
			let res = await this.$apis.getShieldList(this.query);
			if (res) {
				this.loadStatus = 'success';
			} else {
				this.loadStatus = 'fail';
			}
			if (type == 'refresh') {
				this.list = [];
			}
			if (loadtop) {
				uni.stopPullDownRefresh();
			}
			this.count=res.count;
			this.list = this.list.concat(res.data || []);
			this.changeStatus(res);
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '';
			} else if (this.query.page >= Math.ceil(data.count / this.query.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
			console.log('this.status', this.status);
		},

		addShield() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.addShield,
				query: {
					type:this.query.type
				}
			});
		},

		doRemove(item) {
			uni.showModal({
				title: '提示',
				content: '确定要解除吗？',
				success: res => {
					if (res.confirm) {
						this.$apis
							.deleteShieldById({
								id: item.id
							})
							.then(() => {
								uni.showToast({
									icon:'none',
									title: '操作成功'
								});
								this.getList();
							});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.title {
	font-size: $uni-font-size-lg;
	padding: 30upx;
	font-weight: bold;
	background-color: $uni-bg-color-grey;
}
.unbind {
	color: $main-color;
	background-color: $uni-bg-color-grey;
	padding: 2upx 20upx;
	border-radius: 10upx;
	height: 55upx;
	line-height: 55upx;
}
.bottom {
	position: fixed;
	bottom: 30upx;
	width: 100%;
	button {
		width: 90%;
		background-color: $main-color;
		color: $font-color-white;
	}
}
</style>
