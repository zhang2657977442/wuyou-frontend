<template>
	<view>
		<yzb-notice :detail="data" />
		<view v-if="loading" class="loading"><text>加载中...</text></view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import yzbNotice from '@/components/yzb/yzb-notice';

export default {
	components: {
		yzbNotice
	},
	computed: {
		...mapGetters({
			userInfo: 'user/info',
			hasLogin: 'user/hasLogin'
		})
	},
	data() {
		return {
			detail: {},
			where: {},
			id: null,
			data: {
				title: '应用新版本上线通知',
				content: '人才直聘新版本即将上线，敬请期待~~~~',
				createTime: '2022-04-26'
			}
		};
	},
	onLoad(options) {
		console.log(options);
		this.id = options.id;
		// this.getNoticeDetail()
	},
	methods: {
		
		async getNoticeDetail() {
			let res = await this.$apis.getNoticeDetail({noticeId:this.id});
			console.log('getNoticeDetail===', res);
			if (res) {
				this.data = res;
				console.log('data===', this.data);
			}
		},
		
		async addNoticeRead() {}
	}
};
</script>

<style></style>
