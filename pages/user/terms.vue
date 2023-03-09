<template>
	<view class="column bg-white with-100">
		<yzb-about :data="data"></yzb-about>
	</view>
</template>

<script>
import yzbAbout from '@/components/yzb/yzb-about.vue';
export default {
	components: {
		yzbAbout
	},
	data() {
		return {
			data: [],
		};
	},

	onLoad() {
		this.getAbouts()
	},

	methods: {
		async getAbouts(){
			let param = {
				  "current": 1,
				  "pageSize": 999,
				  "type": 0
			};
			let res = await this.$apis.getCmsList(param);
			this.data = res.list[0]
		},
	}
};
</script>

<style>
</style>
