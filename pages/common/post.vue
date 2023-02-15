<template>
	<view class="content">
		<yzbClassification
			ref="yzb"
			:dataList="list"
			:index="index"
			:selectedColor="color"
			:type1LineHeight="lineheight1"
			:type1Size="size1"
			:type2Size="size2"
			:type3Size="size3"
			:type1Height="heigth1"
			@selectType="select"
		></yzbClassification>
	</view>
</template>

<script>
import yzbClassification from '@/components/yzb/yzb-classification.vue';
export default {
	components: {
		yzbClassification
	},
	data() {
		return {
			list:[],
			index: 0,
			color: '#12ae85',
			size1: '12px',
			size2: '14px',
			size3: '10px',
			heigth1: '90rpx',
			lineheight1: '90rpx'
		};
	},
	onLoad() {
		this.getTypes();
	},
	methods: {
		async getTypes() {
			const params = {
				current:1,
				pageSize:999
			}
			const res = await this.$apis.getPositionList(params)
			this.list = this.$mUtils.transData(res.list, 'id', 'pid', 'child')
		},

		select(n1, n2, n3) {
			console.log('点击传来的值为', n1, n2, n3);
			console.log('点击的值为', this.list[n1].child[n2].child[n3].name);
			this.$mRouter.redirectTo({
				route: this.$mRoutesConfig.search,
				query: {
					keyword: this.list[n1].child[n2].child[n3].name
				}
			})
		}
	}
};
</script>

<style></style>
