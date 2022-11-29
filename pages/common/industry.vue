<template>
	<view class="content">
		<view class="column body">
			<view class="column padding-20">
				<text class="text-size-40 font-bold">期望行业</text>
				<text>请选择行业，最多3个</text>
			</view>
			<uni-collapse :accordion="true">
				<uni-collapse-item style="background-color: #FFFFFF;"  v-for="(item, index) in types" :key="item.id" 
				:title="item.name" :number="item.number" :show-animation="item.animation">
					<view class="items">
						<text v-for="(item2, index2) in item.child" :key="index2" @click="select(index,index2)" class="item" :class="item2.selected == true ? 'text-blue' : 'text-normal'">
							{{ item2.name }}
						</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="bottom">
			<view class="selected row align-height">
				<text>已选</text>
				<scroll-view class="margin-left-20 row scroll-view-item" :scroll-x="true" >
					<view class="align-height selected-item" v-for="(item, index) in selected" :key="index">
						<text>{{item.name}}</text>
						<text class="yzb yzb-shanchu"></text>
					</view>
				</scroll-view>
			</view>
			<view class="row btn">
				<view class="btn-clear center-algin" >清除</view>
				<view class="btn-ensure center-algin" @click="submit()">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [{ name: '测试', selected: false }, { name: '测试', selected: true }, { name: '测试' }, { name: '测试' }, { name: '测试' }, { name: '测试' }, { name: '测试' }],
			accordion: [
				{
					id: 0,
					title: '标题文字',
					content: '手风琴效果',
					animation: true
				},
				{
					id: 1,
					title: '标题文字',
					content: '手风琴效果',
					animation: true
				},
				{
					id: 2,
					title: '标题文字',
					content: '手风琴效果',
					animation: true
				}
			],
			types:[],
			selected:[],
			name:'',
			ids:'',
		};
	},

	onLoad() {
		this.getTypes();
	},
	methods: {
			
		async getTypes() {
			this.types = await this.$apis.getIndustryList();
			console.log(this.types);
		},

		select(index,index2) {
			if(this.types[index].child[index2].selected ==false && this.selected.length==3){
				uni.showToast({
					icon:"none",
					title:"最多选择三个"
				})
				return;
			}
			this.types[index].child[index2].selected = !this.types[index].child[index2].selected;
			//获取已选择的
			this.selected=[];
			this.name="";
			this.ids="";
			for(let i=0;i<this.types.length;i++){
				this.types[i].number=0;
				for(let j=0;j<this.types[i].child.length;j++){
					if(this.types[i].child[j].selected==true){
						this.selected.push(this.types[i].child[j]);
						this.types[i].number+=1;
						this.name=this.name+","+this.types[i].child[j].name
						this.ids=this.ids+","+this.types[i].child[j].id
					}
				}
			}
			this.name=this.name.substr(1,this.name.length);
			this.ids=this.ids.substr(1,this.ids.length);
			this.$forceUpdate();
		},
		
		submit(){
			if(!this.name){
				this.name="行业不限"
			}
			if(!this.ids){
				this.ids="0"
			}
			this.$page.prePage().selectIndustrys = this.selected;
			this.$page.prePage().selectIndustryName = this.name;
			this.$page.prePage().selectIndustryIds = this.ids;
			
			this.$page.prePage().company.industryName = this.name;
			this.$page.prePage().company.industryId = this.ids;
			uni.navigateBack({
				delta:1
			})
		}
	}
};
</script>

<style lang="scss">
.body{
	margin-bottom: 200upx;
}
.text-blue {
	color: $main-color;
	border: 1upx solid $main-color;
}
.text-normal {
	color: $font-color-666;
	border: 1upx solid  $border-color-base;
}

.items {
	display: flex;
	flex-wrap: wrap;
	padding: 20upx;
	text {
		font-size: $uni-font-size-sm;
		padding: 10upx 40upx;
		margin-right: 20upx;
		margin-bottom: 15upx;
		background-color: $border-color-base;
		border-radius: 8upx;
	}
}

.bottom{
	position: fixed;
	bottom: 0;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	width: 100%;
	padding: 20upx;
	box-sizing: border-box;
	border-top: 1upx solid $border-color-base;
	height: 200upx;
	.selected{
		height: 80upx;
		.scroll-view-item{
			width: 90%;
			flex-wrap: wrap;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			white-space: nowrap;
			align-items: center;
		}
		.selected-item{
			display: inline-block;
			padding: 0 30upx;
			height: 60upx;
			flex-direction: row;
			align-items: center;
			background-color: $bg-grey;
			border-radius: 30upx;
			margin-left: 20upx;
			color: $main-color;
		}
		.yzb-shanchu{
			text-align: center;
			font-size: $font-size-36;
			padding-top: 8upx;
			margin-left: 7upx;
			color: $main-color;
		}
	}
	
	.btn{
		height:80upx;
		padding: 20upx;
		.btn-clear{
			width: 36%;
			text-align: center;
			border-radius: 10upx;
			background-color: $bg-grey;
		}
		
		.btn-ensure{
			width: 60%;
			margin-left: 3%;
			text-align: center;
			background-color: $main-color;
			color: #FFFFFF;
			border-radius: 10upx;
		}
	}
}
</style>
