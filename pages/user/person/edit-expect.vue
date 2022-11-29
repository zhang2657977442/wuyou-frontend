<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-row border-bottom-1px">
				<text class="title">求职类型</text>
				<radio-group @change="radioChange" class="row">
					<label class="uni-list-cell uni-list-cell-pd row margin-right-20" v-for="(item, index) in items" :key="item.value">
						<view><radio :value="item.value" :checked="index === current" /></view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
			<view class="input-column border-bottom-1px" @click="toPost()">
				<text class="title">期望职位</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择期望职位" :value="selectPost.name" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toIndustry()">
				<text class="title">期望行业</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择期望行业" :value="selectIndustryName" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">薪资要求</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="salaryIndex" range-key="value" :range="salaeyArray">
						<input placeholder="请选择薪资要求" :value="salaryValue" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
		</view>
		<view class="btn-row row">
			<button v-if="id" type="warn" class="btn-delete" @tap="remove">删除</button>
			<button type="primary" class="btn-save" :class="id?'width-55':'width-90'" @tap="register">保存</button>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import mInput from '@/components/m-input/m-input.vue';
import mCell from '@/components/m-cell/m-cell.vue';
import mpvuePicker from '@/components/mpvue-picker/mpvue-picker.vue';
import cityData from '@/common/cityData.js';
import graceChecker from '@/common/graceChecker.js';
import mUpimg from '@/components/m-upimg/m-upimg.vue';
import mCodedialog from '@/components/m-codedialog/m-codedialog.vue';
import formRuleConfig from '@/config/formRule.config.js';
export default {
	components: {
		mInput,
		mCell,
		mpvuePicker,
		mUpimg,
		mCodedialog
	},
	computed: {
		...mapState(['openId', 'customerInfo'])
	},

	data() {
		return {
			id:0,
			selectPost:{
				name:'',
				id:''
			},
			selectIndustrys:null,
			selectIndustryName:'行业不限',
			selectIndustryIds:'0',
			current:0,
			items:[
				{value:0,name:'全职'},
				{value:1,name:'兼职'}
			],
			salaryValue: null,
			salaryIndex: 0,
			salaeyArray: [
					{
						id: 0,
						value: '面议'
					},
					{
						id: 1,
						value: '1-3K'
					},
					{
						id: 2,
						value: '3-5K'
					},
					{
						id: 3,
						value: '5-8K'
					},
					{
						id: 4,
						value: '8-12K'
					},
					{
						id: 5,
						value: '12-15K'
					},
					{
						id: 5,
						value: '15-20K'
					},
					{
						id: 5,
						value: '20K以上'
					}
			]
		};
	},
	onLoad(query) {
		console.log(query);
		this.id=query.id;
		if(this.id){
			this.getDetail();
		}
	},
	methods: {
		
		async getDetail(){
			let res=await this.$apis.getJobExpectDetail({id:this.id});
			console.log("res====",res);
			if(res){
				this.current=res.jobType;
				this.salaryValue=res.expectSalary;
				this.selectPost.id=res.postId;
				this.selectPost.name=res.postName;
			}
			console.log(res);
		},
		
		toIndustry() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.industry,
				query: {
					id: 1
				}
			});
		},

		toPost() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.post,
				query: {
					id: 1
				}
			});
		},

		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value == evt.target.value) {
					this.current = i;
					break;
				}
			}
			console.log(this.current)
		},

		bindDateChange: function(e) {
			this.date = e.target.value;
		},

		bindPickerChange: function(e) {
			this.salaryIndex = e.target.value;
			console.log(this.salaryIndex[0]);
			this.salaryValue = this.salaeyArray[this.salaryIndex].value;
		},

		// 点击注册按钮
		async register() {
			if(!this.selectPost.name){
				uni.showToast({
					icon:'none',
					title:"请选择职位"
				})
				return;
			}
			if(!this.selectIndustryIds){
				uni.showToast({
					icon:'none',
					title:"请选择行业"
				})
				return;
			}
			if(!this.salaryValue){
				uni.showToast({
					icon:'none',
					title:"请选择期望薪资"
				})
				return;
			}
			let expect={
				id:null,
				jobType:this.current,
				postId:this.selectPost.id,
				postName:this.selectPost.name,
				industryId:this.selectIndustryIds,
				industryName:this.selectIndustryName,
				expectSalary:this.salaryValue,
			}
			if(this.id && this.id !=0){
				expect.id=this.id;
			}
			let res=await this.$apis.updateJobExpect(expect);
			if(res){
				uni.navigateBack({
					delta:1
				})
			}
		},
		
		async remove(){
			let res=await this.$apis.deleteJobExpectById({id:this.id});
			if(res){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	input{
		width: 80%;
	}
.input-group {
	border-radius: 10upx;
	margin-top: 10upx;
	overflow: hidden;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	background: #fff;
	justify-content: space-between;
	align-items: center;
	padding: 15upx 10upx;
}

.input-row .title {
	width: 25%;
	padding: 20upx 0;
	padding-left: 20upx;
	line-height: 50upx;
}

.border-bottom-1px {
	position: relative;

	&::after {
		position: absolute;
		z-index: 1;
		right: 0;
		bottom: 0;
		left: 20upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e2e2e2;
	}
}

.header {
	display: flex;
	flex-direction: column;
	.tip {
		font-size: $uni-font-size-sm;
		color: $font-color-666;
		margin-left: 20upx;
	}
}

.head-img {
	margin-right: 15upx;
	image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}
}

radio-group {
	margin-right: 10upx;
}

.radio {
	margin-left: 20upx;
}

.input-column {
	display: flex;
	flex-direction: column;
	background-color: $bgcolor_white;
	padding: 30upx 20upx 10upx 20upx;

	.title {
		margin-left: 10upx;
	}

	.input-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.picker {
		padding: 30upx 0;
		margin-left: 10upx;
		position: relative;
		picker {
			font-size: $uni-font-size-lg;
			width: 100%;
			position: absolute;
		}
	}
	.yzb-next {
		float: right;
		color: $font-color-999;
	}
}

.content {
	background: $bgcolor_white;
}

.btn-row {
	position: fixed;
	bottom: 20upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	.btn-delete{
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
		width: 30%;
	}
	
	.btn-save{
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
	.width-55{
		width: 55%;
	}
	
	.width-90{
		width: 90%;
	}
}
</style>
