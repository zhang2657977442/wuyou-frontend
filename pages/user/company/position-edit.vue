<template>
	<view class="content reg-page">
		<view class="input-group">
			<view class="input-column border-bottom-1px" @click="toPost()">
				<text class="title">职位名称</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请选择职位名称" :value="selectPost.name" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">学历</text>
				<view class="picker">
					<picker @change="bindPickerChange2" :value="position.minEducation" :range="educations"><input class="padding-10" placeholder="请选择学历" :value="position.minEducation" /></picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">经验要求</text>
				<view class="picker">
					<picker @change="bindPickerChange3" :value="position.expRequire" :range="expRequires">
						<input placeholder="请选择经验要求" :value="position.expRequire" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">薪资要求</text>
				<view class="picker">
					<picker @change="bindPickerChange" :value="position.salary" :range="salaeyArray">
						<input placeholder="请选择薪资要求" :value="position.salary" />
					</picker>
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="toWorkContent">
				<text class="title">职位描述</text>
				<view class="space-between-algin row padding-height-20">
					<input class="padding-10" disabled="true" placeholder="请输入职位描述" v-model="position.descr" />
					<text class="yzb yzb-next"></text>
				</view>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="super-title">职位关键词</text>
				<view class="skill-item">
					<view class="center-algin skill-item-item" v-for="(item, index) in keys" :key="index">
						<text class="item text-blue" @click="select(index)">
							{{item}}
						</text>
						<view class="img_delete center-algin" @click="deleteImg(index)"><text class="text-white text-size-base text-color-inverse">X</text></view>
					</view>
					<text class="item text-normal" @click="confirmDialog">
						   + 添加  
					</text>
				</view>
			</view>
			<view class="input-column border-bottom-1px" @click="selectAddress">
				<text class="title">工作地点</text>
				<view class="input-item">
					<input class="padding-10" placeholder="请选择工作地点" disabled="true" v-model="position.addressName" />
					<text class="yzb yzb-next"></text>
				</view>
				<text class="padding-width-10 text-color-grey text-size-base">{{ position.address }}</text>
			</view>
			<view class="input-column border-bottom-1px">
				<text class="title">工作点门牌号</text>
				<view class="input-item"><input class="padding-10" placeholder="请输入门牌号" v-model="position.addressHouse" /></view>
			</view>
		</view>
		<view class="btn-row row top-line">
			<button v-if="id" type="warn" class="btn-delete" @tap="remove">删除</button>
			<button type="primary" class="btn-save" :class="id ? 'width-55' : 'width-90'" @tap="register">保存</button>
		</view>
		
		<!-- 提交信息 -->
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="添加关键词" value="" placeholder="请输入内容(3-8字)" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import graceChecker from '@/common/graceChecker.js';
import formRuleConfig from '@/config/formRule.config.js';
export default {
	components: {
	},
	computed: {
		...mapState(['openId', 'customerInfo'])
	},

	data() {
		return {
			position:{
				postId:0,
				postName:'',
				minEducation:'',
				expRequire:'',
				phone:'',
				salary:'',
				descr:'',
				address:"",
				addressName:"",
				addressHouse:"",
				latitude:"",
				longitude:"",
			},
			id: 0,
			selectPost: {
				name: '',
				id: ''
			},
			current: 0,
			salaryValue: null,
			salaeyArray: [ '面议','1-3K','3-5K','5-8K','8-12K','12-15K','15-20K','20K以上'],
			expRequires:["不限","1年以内","1-3年","3-5年","5-10年","10年以上"],
			keys: [],
			educations: ['高中以下', '高中', '中专/技校', '大专', '本科', '硕士', '博士'],
		};
	},
	onLoad(query) {
		console.log(query);
		this.id = query.id;
		console.log(this.id);
		if (this.id) {
			this.getDetail();
		}else{
			this.getCompanyDetail();
		}
	},
	methods: {
		
		async getDetail() {
			let res = await this.$apis.getPositionDetail({ id: this.id });
			console.log('res====', res);
			if (res) {
				this.position = res;
				this.selectPost.name=res.postName;
				this.selectPost.id=res.postId;
				if(res.skill){
					this.keys=res.skill.split(",");
				}
			}
		},
		
		async getCompanyDetail() {
			let res = await this.$apis.getCompanyDetail();
			if (res) {
				this.position.address=res.address;
				this.position.addressName=res.addressName;
				this.position.addressHouse=res.addressHouse;
				this.position.latitude=res.latitude;
				this.position.longitude=res.longitude;
			}
		},
		
		/**
		 * 打开提交信息
		 */
		confirmDialog() {
			console.log(this.$refs.dialogInput);
			this.$refs.dialogInput.open();
		},
		
		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(done, val) {
			console.log(val);
			this.value = val;
			if(!this.value){
				uni.showToast({
					icon:'none',
					title:"请输入内容"
				})
				return;
			}
			if(this.value.length<3 || this.value.length >8){
				uni.showToast({
					icon:'none',
					title:"请输入3-8个字"
				})
				return;
			}
			this.keys.push(this.value);
			this.$refs.dialogInput.close();
		},
		
		select(index){
			this.value=this.keys[index];
			this.$refs.dialogInput.open();
		},
		
		deleteImg(index){
			this.keys.splice(index,1);
		},
		
		selectAddress() {
			uni.chooseLocation({
				success: res => {
					console.log('选择详细地址结果');
					console.log(res);
					console.log(res.name);
					console.log(res.address);
					if (res.address == '') {
						this.address = '请选择详细地址';
						return;
					}
					this.position.addressName = res.name;
					this.position.address = res.address;
					this.position.latitude = res.latitude;
					this.position.longitude = res.longitude;
				}
			});
		},

		toWorkContent() {
			this.$mRouter.push({
				route: this.$mRoutesConfig.editProContent,
				query: {
					type: 5,
					content:this.position.descr
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

		bindPickerChange2: function(e) {
			this.position.minEducation = this.educations[e.target.value];
		},
		
		bindPickerChange3: function(e) {
			this.position.expRequire = this.expRequires[e.target.value];
		},
		
		bindPickerChange: function(e) {
			this.position.salary=this.salaeyArray[e.target.value];
		},
		
		// 点击注册按钮
		async register() {
			console.log(this.position);
			let skill="";
			for(let i in this.keys){
				skill=skill+","+this.keys[i];
			}
			skill=skill.substr(1,skill.length);
			this.position.postId=this.selectPost.id;
			this.position.postName=this.selectPost.name;
			this.position.skill=skill;
			let checkRes = graceChecker.check(this.position, formRuleConfig.regPositionRule);
			if (!checkRes) {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
				return;
			}
			if (this.id && this.id != 0) {
				this.position.id = this.id;
			}
			let res = await this.$apis.updatePosition(this.position);
			if (res) {
				uni.navigateBack({
					delta: 1
				});
			}
		},

		async remove() {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				success: res => {
					if (res.confirm) {
						this.$apis.deletePositionById({
							id: this.id
						}).then(() => {
							uni.showToast({
								title: "操作成功"
							})
							setTimeout(() => {
								this.$mRouter.back();
							}, 1000)
						})
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
input {
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
		padding: 20upx 0;
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
	margin-bottom: 120upx;
}

.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 0;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
		width: 30%;
	}

	.btn-save {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
	}
	.width-55 {
		width: 55%;
	}

	.width-90 {
		width: 90%;
	}
}

.text-blue {
	color: $main-color;
	border: 1upx solid $main-color;
	background-color: $main-color;
	color: #ffffff;
}
.text-normal {
	color: $font-color-666;
	border: 1upx solid $border-color-base;
}

.skill-item {
	padding: 20upx;
	flex-wrap: wrap;
	display: flex;
	.skill-item-item{
		position: relative;
		margin-right: 20upx;
	}
	.item {
		font-size: $uni-font-size-sm;
		padding: 12upx 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		// background-color: $border-color-base;
		border-radius: 8upx;
		// color: $font-color-666;
	}
}

.img_delete {
	width: 45upx;
	height: 45upx;
	border-radius: 50%;
	background: rgba(234, 178, 178, 0.5);
	position: absolute;
	right: -15upx;
	top: -15upx;
	z-index: 10;
	align-items: center;
}
</style>
