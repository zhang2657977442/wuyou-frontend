<template>
	<view class="classification">
		<view class="left">
			<scroll-view class="leftScroll" style="height: 100vh;" :scroll-top="scrollTop" scroll-y="true">
				<view :class="{type1:true, current:(index1 === i)}" :style="{lineHeight: type1LineHeight, fontSize: type1Size, height: type1Height, color: selected(i)}" v-for="(item,i) in list" :key="i" @click="changeType1(item,i)">{{item.name}}</view>
			</scroll-view>
		</view>
		<view class="right">
			<scroll-view class="rightScroll" style="height: 100vh;" :scroll-top="scrollTop" scroll-y="true">
				<view class="type2" v-for="(item,i) in data2" :key="i">
					<p :style="{fontSize: type2Size}">{{ item.name }}</p>
					<view class="type3Box">
						<view class="type3" v-for="(item1,i1) in item.child" :key="i1" @click="selectType1(i,i1)">
							<!-- <image class="icon" mode="aspectFill" lazy-load="true" :src="item1.icon"></image> -->
							<text :style="{fontSize: type3Size}">{{item1.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type: Number,
				default: 0
			},
			list: {
				type: Array
			},
			selectedColor: {
				type: String,
				default: "#12ae85"
			},
			type1Size: {
				type: String,
				default: "10px"
			},
			type2Size: {
				type: String,
				default: "14px"
			},
			type3Size: {
				type: String,
				default: "10px"
			},
			type1Height: {
				type: String,
				default: "90rpx"
			},
			type1LineHeight: {
				type: String,
				default: "90rpx"
			}
		},
		data() {
			return {
				scrollTop: 0,
				data1: [], // 用来存储传来的数据
				index1: 0, // 标识当前选中的type1
				data2: [], // 用来存储当前选中的type2数据
				color: "", // 用来存储选中type1的颜色
				load: 0 // 用来判断是否是第一次加载数据
			}
		},
		mounted() {
		},
		beforeUpdate() {
			if(this.load == 0){
				this.index1 = this.index
				this.data1 = this.list
				this.color = this.selectedColor
				console.log("这个时候的数据",this.list)
				this.changeType1(this.data1[this.index1],this.index1)
				this.load++
			}
		},
		methods: {
			
			init(){
				console.log("init")
				this.index1 = this.index
				this.data1 = this.list
				this.color = this.selectedColor
				this.changeType1(this.data1[this.index1],this.index1)
			},
			
			changeType1(item,index) {
				console.log("现在的index",index)
				this.index1 = index
				if (item === undefined ||item === null || item.child === undefined || item.child === null){
					console.log("该内容为空！")
					this.data2 = []
				} else
					this.data2 = item.child				
			},
			selectType1(i, i1) {
				this.$emit("selectType", this.index1, i, i1)
			},
			// 更换颜色
			selected: function(val){
				return (val === this.index1?this.selectedColor+" !important":"")
			}
		}
	}
</script>

<style lang="less" scoped>
	.classification {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		
		/* 隐藏滚动条 */
		::-webkit-scrollbar {  
			display: none;  
			width: 0 !important;  
			height: 0 !important;  
			-webkit-appearance: none;  
			background: transparent;  
		}
		.left {
			width: 30%;
			background-color: #fff;
			border-right: 1upx solid #EBEEF5;
			.type1 {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
			}
			.current {
				color: #12ae85; 
				background-color: #FFFFFF;
			}
		}
		.right {
			float: right;
			width: 70%;
			box-sizing: border-box;
			padding: 2%;
			.type2 {
				margin-bottom: 10upx;
				p {
					// margin: 46rpx 0 26rpx 0;
					font-size: 14px;
					padding: 20upx 0 20upx 10upx;
					font-weight: bold;
				}
				.type3Box {
					width: 100%;
					height: auto;
					border-radius: 28rpx;
					background-color: #fff;
					display: flex;
					flex-wrap: wrap;
					// padding-top: 36rpx;
					// margin-bottom: 36rpx;
					.type3 {
						// .icon {
						// 	width: 100rpx;
						// 	height: 100rpx;
						// 	display: block;
						// }
						align-items: center;
						justify-content: center;
						width: 50%;
						box-sizing: border-box;
						display: flex;
						margin-bottom: 20upx;
						text {
							// padding: 18rpx 0;
							// display: block;
							// width: 100rpx;
							// font-size: 10px;
							// overflow: hidden;
							// text-align: center;
							background-color: #f4f4f4;
							border-radius: 6upx;
							padding: 0 20upx;
							height: 70upx;
							line-height: 70upx;
							width: 80%;
							text-align: center;
							
						}
					}
				}
			}
		}
	}
</style>
