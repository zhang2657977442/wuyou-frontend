<template>
	<view class="content reg-page">
		<view class="column">
			<text class="title">我的优势</text>
			<text class="text-color">一句话介绍自己，突出核心优势</text>
			<view class="r-top">
				<textarea :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="pl" />
				<view class="r-top-t">
				 	<view></view>
					<view> {{contentLength}}/{{len}}</view>
				 </view>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="save">保存</button></view>
	</view>
</template>

<script>
import mTextarea from '@/components/m-textarea/m-textarea.vue';
import formRuleConfig from '@/config/formRule.config.js';
import graceChecker from '@/common/graceChecker.js';
export default {
	components: {
		mTextarea,
	},
	computed: {
		contentLength(){
			return this.content.length;
		}
	},
	data() {
		return {
			resume:{},
			content:"1231",
			len:150,
		}
	},
	onLoad(query) {
		this.resume=JSON.parse(query.resume);
		this.content=this.resume.skill
	},
	
	methods: {
		async save() {
			let reqBody = {"content":this.content};
			let checkRes = graceChecker.check(reqBody, formRuleConfig.regContentRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			this.resume.skill = this.content
			let res = await this.$apis.updateResume(this.resume);
			if(res){
				this.$page.prePage().resume.skill = this.content;
				uni.navigateBack({
					delta:1
				})
			}
		},

	}
};
</script>

<style lang="scss" scoped>
.content {
	background: $bgcolor_white;
	padding: 20upx;
	box-sizing: border-box;
}

.title{
	font-size: $font-size-40;
	font-weight: bold;
}

.btn-row {
	position: fixed;
	bottom: 10upx;
	width: 100%;
	background-color: #ffff;
	box-sizing: border-box;
	button {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
}

textarea{
		height: 400upx;
		width: 100%;
	}
.r-top{
	margin-top: 50upx;
	padding: 10rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	height: 100%;
}
.r-top-t{
	display: flex;
	justify-content: space-between;
	font-family:PingFang SC;
	font-weight:400;
	line-height:20px;
	color:rgba(153,153,153,1);
	opacity:1;
}
</style>
