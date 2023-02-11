<template>
	<joy-page class="">
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
import mPosition from '@/components/m-position/m-position.vue';
export default {
	components: {
		mPosition,
	}, 
	data() {
		return {
			positionList: [],
			status: '',
			page: 1,
			limit: 10,
			type:1,
			bgImg:"",
		};
	},
	async onLoad(query) {
		this.type=query.type;
		if(this.type==1){
			this.bgImg="https://pan.whiteones.cn/d/PicGo/wuyou/jobnew_banner.png";
			uni.setNavigationBarTitle({
				title:"最近发布"
			})
		}else if(this.type==2){
			this.bgImg="https://pan.whiteones.cn/d/PicGo/wuyou/jobhigh_banner.png";
			uni.setNavigationBarTitle({
				title:"高薪优选"
			})
		}
		this.getJobList();
	},
	
	onReachBottom() {
		this.page++;
		this.getJobList();
	},
	
	methods: {
		
		async getJobList() {
			let param = {
				current: this.page,
				pageSize: this.limit,
				jobName: ""
			};
			this.status = '请求中';
			let res = await this.$apis.getJobList(param);
			if (res) {
				let data = res.list;
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
			} else if (this.page >= Math.ceil(data.total / this.limit)) {
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
</style>
