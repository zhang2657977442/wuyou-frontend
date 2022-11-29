<template>
	<view class="column with-100">
		<view class="bg-white column padding-height-20 margin-bottom-20">
			<view class="service-top-service">
				<view class="service-top-service-content" @tap="copyText(aboutus.qqNumber)">
					<!-- <image src="../../../static/service-qq.png"></image> -->
					<text>QQ咨询</text>
					<text>{{ aboutus.qqNumber || '暂无' }}</text>
					<text class="copy">点击复制</text>
				</view>
				<view class="service-top-service-content" @tap="copyText(aboutus.wechatNumber)">
					<!-- <image src="../../../static/service-wechat.png"></image> -->
					<text>微信咨询</text>
					<text class="text-ellipsis">{{ aboutus.wechatNumber || '暂无' }}</text>
					<text class="copy">点击复制</text>
				</view>
				<view class="service-top-service-content" @tap="copyText(aboutus.servicePhone)">
					<!-- <image src="../../../static/service-icon.png"></image> -->
					<text>电话咨询</text>
					<text class="text-ellipsis">{{ aboutus.servicePhone || '暂无' }}</text>
					<text class="copy">点击复制</text>
				</view>
			</view>
			<view class="service-bottom-data"><text>咨询时间：9:00-20:00</text></view>
		</view>

		<view class="bg-white center-algin" style="padding: 40upx 0;"><textarea :value="opinion" placeholder="请输入反馈意见" @input="opinionInput"></textarea></view>

		<view class="bg-blue button center-algin" @click="submit()"><text class="text-white text-size-below-max">提交反馈</text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			opinion: '',
			aboutus: '',
		};
	},
	onLoad() {
		console.log("1111111111111111111111111111111");
		this.getContactUs()
	},
	methods: {
		// 获取联系我们
		async getContactUs(){
			console.log("联系我们")
			this.aboutus = await this.$apis.getContactUs();
		},
		
		opinionInput(e) {
			this.opinion = e.detail.value;
		},

		async submit() {
			if (this.opinion == '') {
				uni.showToast({
					title: '反馈意见不能为空',
					icon: 'none'
				});
				return false;
			}
			var params = {
				content: this.opinion
			}
			let res= await this.$apis.getFeedbackAdd(params);
			if(res){
				uni.showToast({title: '提交成功'})
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					})
				},1200)
			}else{
				uni.showToast({title: '提交失败'})
			}
		},
		copyText(content) {
			uni.setClipboardData({
				data: content,
				success: function(res) {
					uni.getClipboardData({
						success: function(res) {
							uni.showToast({
								title: '复制成功',
								duration: 2000
							});
						}
					});
				}
			});
		},
	}
};
</script>

<style>
.service-top-service{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 20upx;
	font-size: 24upx;
}
.service-top-service image{
	width: 350upx;
	height: 160upx;
}
.service-top-service-content{
	width: 31%;
	/* height: 240upx; */
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 15upx;
	background: rgba(236, 236, 236, 1);
}
.service-top-service-content image{
	height: 100upx;
	width: 100upx;
	margin-top: 15upx;
}
.service-bottom-data{
	height: 80upx;
	line-height: 80upx;
	border-radius: 12upx;
	background-color: rgba(255, 237, 210, 1);
	display: flex;
	justify-content: center;
	width: 94%;
	margin-top: 30upx;
	margin-left: 20upx;
}
.copy{
	font-size: 24upx;
}

textarea{
	width: 660upx;
	height: 200upx;
	line-height: 20px;
	border-radius: 10upx;
	background-color: rgba(242, 242, 242, 1);
	color: rgba(136, 136, 136, 1);
	font-size: 28upx;
	border: 2upx solid rgba(255, 255, 255, 0);
	padding: 20upx;
}

.button{
	width: 700upx;
	height: 90upx;
	border-radius: 8upx;
	border: 1px solid rgba(255, 255, 255, 0);
	margin-top: 40upx;
	margin-left: 25upx;
}
</style>
