<template>
	<view>
		<yzbfilterDropdown
			:menuTop="0"
			:filterData="filterData"
			:defaultSelected="defaultSelected"
			:updateMenuName="true"
			@confirm="confirm"
			dataFormat="Object"
		></yzbfilterDropdown>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<m-position :positions="positionList" @click="positionDetail"></m-position>
			<view class="load-more-box">
				<uni-load-more v-if="status == '请求中'" status="正在加载..." :showIcon="true"></uni-load-more>
				<uni-load-more v-if="status == '没有更多'" status="没有更多了" :showIcon="false"></uni-load-more>
				<uni-load-more v-if="status == '暂无数据'" status="暂无数据" :showIcon="false"></uni-load-more>
				<uni-load-more
					v-if="status == '请求失败'"
					status="加载失败，点我重试"
					:showIcon="false"
					@click="reLoad"
				></uni-load-more>
			</view>
			<!-- <view class="loading-text">{{loadingText}}</view> -->
		</view>
	</view>
</template>

<script>
import yzbfilterDropdown from '@/components/yzb/yzb-filterDropdown.vue'
import mPosition from '@/components/m-position/m-position.vue'
import data from '@/common/data.js' //筛选菜单数据
export default {
	components: {
		yzbfilterDropdown,
		mPosition
	},
	data() {
		return {
			positionList: [],
			jobList: [],
			status: '',
			page: 1,
			limit: 10,
			indexArr: '',
			valueArr: '',
			loadingText: '正在加载...',
			defaultSelected: [],
			filterData: []
		}
	},
	filters: {
		outData(value) {
			return JSON.stringify(value)
		}
	},
	onLoad: function() {
		this.filterData = data
		this.getPositionList()
		this.getIndustryList()
		this.getJobList()
	},

	onReachBottom() {
		this.page++
		this.getJobList()
	},

	methods: {
		async getJobList() {
			let param = {
				current: this.page,
				pageSize: this.limit,
				jobName: ''
			}
			this.status = '请求中'
			let res = await this.$apis.getJobList(param)
			if (res) {
				let data = res.list
				for (let i in data) {
					if (data[i].skill) {
						data[i].skill = data[i].skill.split(',')
					}
				}
				this.positionList = this.positionList.concat(data || [])
				this.jobList = this.positionList
				this.changeStatus(res)
			}
		},
		async getIndustryList() {
			let param = {
				current: 1,
				pageSize: 999
			}
			this.status = '请求中'
			let res = await this.$apis.getIndustryList(param)
			if (res) {
				const data = this.$mUtils.transData(res.list, 'id', 'pid', 'submenu')
				this.filterData[1].submenu = data
			}
		},
		async getPositionList() {
			let param = {
				current: 1,
				pageSize: 999
			}
			this.status = '请求中'
			let res = await this.$apis.getPositionList(param)
			if (res) {
				const data = this.$mUtils.transData(res.list, 'id', 'pid', 'submenu')
				this.filterData[0].submenu = data
			}
		},

		// 修改请求状态
		changeStatus(data) {
			if (this.positionList.length === 0) {
				this.status = '暂无数据'
			} else if (this.page >= Math.ceil(data.total / this.limit)) {
				this.status = '没有更多'
			} else {
				this.status = '请求更多'
			}
		},

		positionDetail(item) {
			this.$mRouter.push({
				route: this.$mRoutesConfig.positionDetail,
				query: {
					details: encodeURIComponent(JSON.stringify(item))
				}
			})
		},

		//接收菜单结果
		confirm(e) {
			console.log(e)
			this.indexArr = e.index
			this.valueArr = e.value
            const res = this.filterList(e.value)
			this.positionList = res
		},
		// 根据条件进行过滤
		filterList(data){
			let list = []
			const isNull = (element) => element !== null;
			if(data[0].some(isNull)){
			list = this.positionList.filter(item => data[0].includes(item.postName))
			}
			if(data[1].some(isNull)){
			list = this.positionList.filter(item => data[1].includes(item.industryName))
			}
			if(data[2][0] === null || data[2][0] === '全部分类'){
			    list = this.jobList
			}else{
				list = this.positionList.filter(item => data[2][0] === item.salary)
				return list
			}
			if(data[3][0] === null || data[3][0] === '全部分类'){
			    list = this.jobList
			}else{
				list = this.positionList.filter(item => data[3][0] === item.expRequire)
			}
			return list
		}
	}
}
</script>
<style lang="scss">
.datajson {
	z-index: 2;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 250px;
	padding: 0 10px;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	font-size: 12px;
	.text {
		margin-top: 10px;
	}
	.item {
		width: 15px;
	}
}
.place {
	background-color: #ffffff;
	height: 44px;
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 92%;
		height: 230rpx;

		overflow: hidden;
		border-radius: 15rpx;
		box-shadow: 0upx 8upx 25rpx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 100%;
			height: 230rpx;
			swiper-item {
				image {
					width: 100%;
					height: 230rpx;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 20upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}
.goods-list {
	padding-top: 10px;
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 30px;
		color: #979797;
		font-size: 12px;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 10px;
			background-color: #fff;
			margin: 0 0 7px 0;
			box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 10px 10px 0 0;
			}
			.name {
				width: 92%;
				padding: 5px 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 15px;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 5px 4% 5px 4%;
				.price {
					color: #e65339;
					font-size: 15px;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
