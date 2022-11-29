<template>
	<view class="content reg-page">
		<view class="column padding-20">
			<!-- <text class="title"></text> -->
			<!-- <text class="text-color">一句话介绍自己，突出核心优势</text> -->
			<!-- <mTextarea :content="content" style="margin-top: 10upx;" ref="content" pl="请输入内容" :len='150'>
			</mTextarea> -->
			<view class="r-top">
				<textarea :style="{height:height+'px'}" :maxlength="len" placeholder-style="color:rgba(153,153,153,1);" v-model="content" :placeholder="placeholder" />
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
			height:0,
			id:0,
			content:'',
			len:1500,
			placeholder:"如:\n1、主要负责新员工入职培训。\n2、分析制定员工每个月的个人销售业绩；\n3、帮助员工提高每日客单价，整体店面管理等工作"
		}
	},
	onLoad(query) {
		console.log("query====",query);
		this.id=query.id;
		if(query.content){
			this.content=query.content;
		}
		console.log(this.id);
		let height = uni.getSystemInfoSync().windowHeight;
		this.height=height-uni.upx2px(200);
	},
	
	methods: {
		async register() {
			let reqBody = {"content":this.content};
			let checkRes = graceChecker.check(reqBody, formRuleConfig.regContentRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			this.$page.prePage().workContent = this.content;
			uni.navigateBack({
				delta:1
			})
		},

	}
};
</script>

<style lang="scss" scoped>
.content {
	background: $bgcolor_white;
	box-sizing: border-box;
}

.title{
	font-size: $font-size-40;
	font-weight: bold;
}

.btn-row {
	position: fixed;
	bottom: 20upx;
	width: 100%;
	box-sizing: border-box;
	button {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		width: 90%;
	}
}

textarea{
		// height: 600upx;
		width: 100%;
		font-size: $uni-font-size-base;
	}
.r-top{
	margin-top: 20upx;
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
