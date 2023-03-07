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
import yzbClassification from '@/components/yzb/yzb-classification.vue'
export default {
	components: {
		yzbClassification
	},
	data() {
		return {
			list: [],
			index: 0,
			isSearch: true,
			color: '#12ae85',
			size1: '12px',
			size2: '14px',
			size3: '10px',
			heigth1: '90rpx',
			lineheight1: '90rpx'
		}
	},
	onLoad(query) {
		this.getTypes()
		if (query.id) {
			this.isSearch = false
		}

	},
	methods: {
		async getTypes() {
			const params = {
				current: 1,
				pageSize: 999
			}
			const res = await this.$apis.getPositionList(params)
			this.list = this.$mUtils.transData(res.list, 'id', 'pid', 'child')
		},

		select(n1, n2, n3) {
			console.log('点击传来的值为', n1, n2, n3)
			console.log('点击的值为', this.list[n1].child[n2].child[n3].name)
			if (this.isSearch) {
				this.$mRouter.redirectTo({
					route: this.$mRoutesConfig.search,
					query: {
						keyword: this.list[n1].child[n2].child[n3].name
					}
				})
			} else {
				this.$page.prePage().position.id = this.list[n1].child[n2].child[n3].id
				this.$page.prePage().position.postName = this.list[n1].child[n2].child[n3].name
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
}
</script>

<style></style>
