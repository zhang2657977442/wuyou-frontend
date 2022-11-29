<template>
	<view>
		<view class="helpcenterList">
			<view class="mb10">{{ list.title }}</view>
			<view class="with-100">{{ list.content }}</view>
		</view>
	</view>
</template>

<script>
// import Api from '@/common/api';
export default {
	data() {
		return {
			list: '',
			categoryId: '',
		};
	},
	async onLoad(option) {
		if(option){
			this.categoryId = option.id
		}
		// let params = {categoryId: this.categoryId};
		// let data = await Api.apiCall('get', Api.cms.getPlatformInfo, params);
		// if(data){
		// 	this.list = data[0];
		// }
	}
};
</script>

<style>
.helpcenterList {
	padding: 20upx;
	display: flex;
	flex-direction: column;
	/* border: 1px solid #f8f8f9; */
	/* color: #918f8f; */
	font-size: 14px;
	background: #fff;
}
.mb10 {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #333;
	margin-bottom: 10px;
}
.with-100{width: 100%;}
</style>
