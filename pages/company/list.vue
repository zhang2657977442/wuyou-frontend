<template>
	<joy-page class="">
		<image class="top" :src="bgImg"></image>
		<view style="position: relative;">
			<m-company :list="list" @click="detail"></m-company>
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
import mCompany from '@/components/m-company/m-company.vue';
export default {
	components: {
		mSwiper,
		mCompany,
	}, 
	computed: {
		...mapState(['forcedLogin']),
		...mapGetters(['hasLogin'])
	},
	data() {
		return {
			list: [],
			page: 1,
			limit: 10,
			status:"",
			bgImg:"https://gitee.com/zsj265/my-pic-go/raw/master/wuyou/company_banner.png"
		};
	},
	async onLoad(query) {
		this.getList();
	},
	
	onReachBottom() {
		this.page++;
		this.getList();
	},
	
	methods: {
		async getList() {
			let param = {
				current: this.page,
				pageSize: this.limit,
			};
			this.status = '请求中';
			let res = await this.$apis.getCompanyList(param);
			if (res) {
				let data = res.list;
				this.list = this.list.concat(data || []);
				this.changeStatus(res);
			}
		},
		
		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = '暂无数据';
			} else if (this.page >= Math.ceil(data.total / this.limit)) {
				this.status = '没有更多';
			} else {
				this.status = '请求更多';
			}
		},
		
		detail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.companyDetail,
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
