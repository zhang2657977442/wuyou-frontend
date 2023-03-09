<template>
	<view class="content" style="height: 100vh;">
		<uni-list :border="true">
			<view v-if="loading" class="loading"><text>加载中...</text></view>
			<m-empty-data v-else-if="data.length == 0" noTxt="暂无记录"></m-empty-data>
			<uni-list-chat
				v-for="(item, index) in data"
				:key="index"
				title="系统通知"
				avatar="/static/img/logo.png"
				:note="item.text"
				:time="formatCreateTime(item.createTime)"
				@click="toDetail(item)"
				:clickable="clickable"
				badge-positon="left"
				badge-text="dot"
				:showBadge="item.ifRead"
			></uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import { formatDate } from '@/common/date';
export default {
	components: {
		mEmptyData
	},
	computed: {
		...mapGetters({
			currentUser: 'user/info',
			hasLogin: 'user/hasLogin'
		})
	},
	data() {
		return {
			clickable:true,
			unreadTotal: 0,
			where: {},
			data: [],
			loading: false,
		};
	},
	onPullDownRefresh() {
		console.log('---onPullDownRefresh---');
	},
	onReachBottom() {
		console.log('---onReachBottom---');
	},
	onLoad() {
		this.getNoticeList();
	},
	onShow() {},

	methods: {
		async getNoticeList() {
			let param = {
				  "current": 1,
				  "pageSize": 999,
				  "type": 3
			};
			let res = await this.$apis.getCmsList(param);
			if (res.list.length > 0) {
				this.data = res.list;

			}
		},

		toDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.noticeDetail,
				query: {
					item: encodeURIComponent(JSON.stringify(item))
				}
			});
		},
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'MM-dd hh:mm');
		},
	}
};
</script>

<style lang="scss">
.loading {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20upx;
	text {
		color: $font-color-666;
	}
}
</style>
