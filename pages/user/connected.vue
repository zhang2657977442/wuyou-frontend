<template>
	<yzb-page :loadStatus="loadStatus">
		<yzb-connected v-if="list.length>0" :list="list" :type="query.type" @click="toDetail" @onDelete="toDelete"></yzb-connected>
		<m-empty-data v-else :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		<view class="load-more-box">
			<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
			<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false" @click="reLoad"></uni-load-more>
		</view>
	</yzb-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import yzbConnected from '@/components/yzb/yzb-connected.vue';
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	components: {
		mEmptyData,
		yzbConnected
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			list:[],
			status: '暂无数据',
			query:{
				page: 1,
				limit: 10,
				type:0,
			},
			loadStatus:'loading',//loading、fail、success
		};
	},
	onLoad() {
		this.getList();
	},
	
	onReachBottom() {
		this.query.page++;
		this.getList();
	},
	
	onPullDownRefresh() {
		this.query.page=1;
		this.list=[];
		this.getList();
	},
	
	methods: {
		async getList() {
			if(this.userInfo.memberRole==1){
				this.query.type=1;
			}else{
				this.query.type=0;
			}
			this.status = '请求中';
			let res = await this.$apis.getCommList(this.query);
			console.log("-------",res);
			if (res) {
				let data = res.data;
				this.list = this.list.concat(data || []);
				console.log("xxxxxx",this.list);
				this.changeStatus(res);
				this.loadStatus='success';
			}else{
				this.loadStatus='fail';
			}
			uni.stopPullDownRefresh();
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
			console.log("this.status",this.status);
		},
		
		toDetail(item) {
			console.log(item);
			if(this.query.type==0){
				this.$mRouter.push({
					route: this.$mRoutesConfig.positionDetail,
					query: {
						id: item.position.id
					}
				});
			}else{
				this.$mRouter.push({
					route: this.$mRoutesConfig.resumeDetail,
					query: {
						id: item.resume.id
					}
				});
			}
		},
		
		toDelete(item){
			let that=this;
			uni.showModal({
				title: '提示',
				content: '确定删除该收藏记录吗？',
				success: res => {
					if (res.confirm) {
						that.doDelete(item);
					}
				}
			});
		},
		
		async doDelete(item){
			let param={
				id:item.id
			}
			let res = await this.$apis.deleteCollectById(param);
			if (res) {
				this.query.page=1;
				this.list=[];
				this.getList();
			}else{
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.content{
		background-color: #fff;
	}
</style>
