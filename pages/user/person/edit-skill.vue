<template>
	<view class="content reg-page">
		<view class="column">
			<text class="title">我的优势</text>
			<text class="text-color">一句话介绍自己，突出核心优势</text>
			<!-- <mTextarea :content="content" style="margin-top: 10upx;" ref="content" pl="请输入内容" :len='150'>
			</mTextarea> -->
			<view class="r-top">
				<textarea :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="pl" />
				<view class="r-top-t">
				 	<view></view>
					<view> {{contentLength}}/{{len}}</view>
				 </view>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">保存</button></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import mTextarea from '@/components/m-textarea/m-textarea.vue';
import formRuleConfig from '@/config/formRule.config.js';
import graceChecker from '@/common/graceChecker.js';
export default {
	components: {
		mTextarea,
	},
	computed: {
		...mapState(['openId', 'customerInfo']),
		contentLength(){
			return this.content.length;
		}
	},
	data() {
		return {
			id:0,
			content:'',
			len:150,
		}
	},
	onLoad(query) {
		console.log("query====",query);
		this.id=query.id;
		this.content=query.content;
		console.log(this.id);
	},
	
	methods: {
		async register() {
			// this.content=this.$refs.content.content;
			let reqBody = {"content":this.content};
			let checkRes = graceChecker.check(reqBody, formRuleConfig.regContentRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			// console.log(this.$page.prePage());
			// this.$page.prePage().skillContent = this.$refs.content.content;
			
			let param={
				id:this.id,
				personalSkill:this.content
			}
			let res = await this.$apis.updateResumeBasic(param);
			if(res){
				this.$page.prePage().resume.personalSkill = this.content;
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
