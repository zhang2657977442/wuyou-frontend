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
			data: {}
		};
	},
	onLoad(query) {
		const data = decodeURIComponent(query.item)
		this.data = JSON.parse(data)
	},
	methods: {
	}
};
</script>

<style></style>
