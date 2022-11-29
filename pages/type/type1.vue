<template>
	<view class="content">
		<yzbClassification
			ref="yzb"
			:list="types"
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
			types: [],
			index: 0,
			color: '#12ae85',
			size1: '12px',
			size2: '14px',
			size3: '10px',
			heigth1: '90rpx',
			lineheight1: '90rpx'
			// type11: []
		};
	},
	onLoad() {
		this.getTypes();
	},
	methods: {
		async getTypes() {
			this.types = await this.$apis.getPostList();
			this.$refs.yzb.init();
		},

		select(n1, n2, n3) {
			console.log('点击传来的值为', n1, n2, n3);
			console.log('点击的值为', this.types[n1].child[n2].child[n3].name);
		}
	}
};
</script>

<style></style>
