<template>
	<view class="content reg-page">
		<view class="column padding-20">
			<text class="title">{{title}}</text> 
			 <text class="text-color">{{desc}}</text>
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
			title:"项目描述",
			desc:"简单介绍项目，突出核心优势",
			height:0,
			type:1,
			content:'',
			len:1500,
			placeholder:"请输入"
		}
	},
	onLoad(query) {
		console.log("query====",query);
		this.type=query.type;
		if(query.content && query.content!="undefined"){
			this.content=query.content;
		}
		let height = uni.getSystemInfoSync().windowHeight;
		this.height=height-uni.upx2px(320);
		if(this.type==1){
			this.title="项目描述";
			this.desc="简单介绍项目，突出核心优势";
		}else if(this.type==2){
			this.title="项目业绩";
			this.desc="简单介绍项目成果，突出核心优势";
		}else if(this.type==3){
			this.title="在校经历";
			this.desc="简单介绍在校经历，突出核心优势";
		}else if(this.type==4){
			this.title="公司简介";
			this.desc="简单介绍公司信息，突出核心优势";
		}else if(this.type==5){
			this.title="职位描述";
			this.desc="详细清晰的职位描述，能获得更多关注";
		}
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
			if(this.type==1){
				this.$page.prePage().descr = this.content;
			}else if(this.type==2){
				this.$page.prePage().performance = this.content;
			}else if(this.type==3){
				this.$page.prePage().content = this.content;
			}else if(this.type==4){
				this.$page.prePage().company.companyProfile = this.content;
			}else if(this.type==5){
				this.$page.prePage().position.descr = this.content;
			}
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
