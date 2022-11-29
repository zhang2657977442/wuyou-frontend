<template>
	<view>
		<template>
			<m-empty-data :coverUrl="no_order_1" noTxt="暂无记录"></m-empty-data>
		</template>
	</view>
</template>

<script>
import mEmptyData from "@/components/m-empty-data/m-empty-data.vue"

export default {
	components: {
		mEmptyData
	},
	data() {
		return {
			no_order_1:this.$mAssetsPath.no_order_1,
		};
	},
	methods: {
	}
};
</script>

<style scoped>
</style>
