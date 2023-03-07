<template>
	<view class="help-bg">
		<view class="help-item" v-for="(item, index) in list" :key="index" @click="navTo(item)">
			<text>{{ item.name }}</text>
			<text class="chengguo chengguo-right"></text>
		</view>
	</view>
</template>
<script>
// import Api from '@/common/api';
export default {
	data() {
		return {
			list: [
				{id:0,name: '一、简历相关'},
				{id:1,name: '二、沟通相关'},
				{id:2,name: '三、隐私与安全'},
				{id:3,name: '四、账号信息'},
				{id:4,name: '五、职位相关'},
				{id:5,name: '六、面试相关'},
				{id:6,name: '七、其他问题'},
			]
		};
	},
	async onLoad() {
		let params = {type: 0};
		// let data = await Api.apiCall('get', Api.cms.getPlatformInfoCategory, params);
		// if(data){
		// 	this.list = data
		// }
		// console.log(data)
	},
	methods: {
		navTo(obj) {
			// uni.navigateTo({
			// 	url: '/pages/user/helpcenterDetails?id='+obj.id
			// });
		},
	},
};
</script>

<style>
page{background-color: #F3F3F3;}
.help-bg {
	width: 100%;
	height: 100%;
	z-index: 0;
	flex-direction: column;
	overflow-y: hidden;
}
.help-item {
	display: flex;
	height: 100upx;
	font-size: 30upx;
	padding: 10upx 3%;
	overflow-y: hidden;
	background: #ffffff;
	align-items: center;
	box-sizing: border-box;
	justify-content: space-between;
	border-bottom: 1px solid #f8f8f9;
}
.vone {
	width: 70%;
	text-align: right;
}

.icon-right1 {
	align-items: center;
	width: 40upx;
	height: 40upx;
	justify-content: center;
	align-items: center;
	border-radius: 10upx;

	margin-left: auto;
	padding-right: 10upx;
}

.adbs {
	margin-top: 0.5upx;
}
</style>
