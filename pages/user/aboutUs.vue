<template>
	<view class="column bg-white with-100">
		<!-- 用户协议 -->
		<yzb-terms :termsList="helpDetail" v-if="mark == 1"></yzb-terms>

		<!-- 关于我们 -->
		<yzb-about :aboutData="aboutData" v-if="mark == 2"></yzb-about>
		
	</view>
</template>

<script>
import yzbTerms from '@/components/yzb/yzb-terms.vue';
import yzbAbout from '@/components/yzb/yzb-about.vue';
export default {
	components: {
		yzbTerms,
		yzbAbout
	},
	data() {
		return {
			mark: 1,
			title: '',
			aboutData: [],
			helpDetail: '',
		};
	},

	onLoad(option) {
		console.log(option);
		if (option.type == 1) {
			this.title = '用户协议';
			this.getHelpDetail();
			this.mark = 1;
		} else {
			this.title = '关于我们';
			this.getAbouts();
			this.mark=2;
		}
		uni.setNavigationBarTitle({
			title: this.title
		});
	},

	methods: {
		// 获取关于我们
		async getAbouts(){
			this.aboutData = await this.$apis.getAboutUs();
			console.log(this.aboutData)
		},
		// 获取用户协议
		async getHelpDetail(){
			this.helpDetail = await this.$apis.getHelpDetail({categoryId:1});
		},
	}
};
</script>

<style>
</style>
