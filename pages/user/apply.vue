<template>
	<yzb-page :loadStatus="loadStatus">
		<m-position v-if="list.length > 0 && query.type === 0" :positions="list" @click="positionDetail"></m-position>
		<yzb-resume v-if="list.length > 0 && query.type === 1" :list="list" @click="resumeDetail"></yzb-resume>
		<m-empty-data v-if="list.length === 0" :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		<view class="load-more-box">
			<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
			<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
			<uni-load-more v-if="status == '请求失败'" status="加载失败，点我重试" :showIcon="false"></uni-load-more>
		</view>
	</yzb-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue'
import mPosition from '@/components/m-position/m-position.vue'
import yzbResume from '@/components/yzb/yzb-resume.vue'
export default {
	computed: {
		...mapState(['userInfo']),
		...mapGetters(['hasLogin'])
	},
	components: {
		mPosition,
		mEmptyData,
		yzbResume
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
			list: [],
			status: '暂无数据',
			query: {
				userId: '',
				current: 1,
				pageSize: 10,
				type: 0 //0-投递方，1-接收方
			},
			loadStatus: 'loading' //loading、fail、success
		}
	},

	onLoad() {
		this.query.userId = this.userInfo.id
		if (this.userInfo.role == '求职者') {
			this.query.type = 0
			uni.setNavigationBarTitle({
				title: '我的投递'
			})
		} else {
			this.query.type = 1
			uni.setNavigationBarTitle({
				title: '面试邀请'
			})
		}
	},

	onShow() {
		this.query.current = 1
		this.list = []
		this.getList()
	},

	onReachBottom() {
		this.query.current++
		this.getList()
	},

	onPullDownRefresh() {
		this.query.current = 1
		this.list = []
		this.getList()
	},

	methods: {
		async getList() {
			this.status = '请求中'
			let res = await this.$apis.getApplyList(this.query)
			console.log('-------', res)
			if (res) {
				let data = res.list
				this.list = this.list.concat(data || [])
				this.changeStatus(res)
				this.loadStatus = 'success'
			} else {
				this.loadStatus = 'fail'
			}
			uni.stopPullDownRefresh()
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

		// 修改请求状态
		changeStatus(data) {
			if (this.list.length === 0) {
				this.status = ''
			} else if (this.query.current >= Math.ceil(data.total / this.query.pageSize)) {
				this.status = '没有更多'
			} else {
				this.status = '请求更多'
			}
			console.log('this.status', this.status)
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	background-color: #fff;
}
</style>
