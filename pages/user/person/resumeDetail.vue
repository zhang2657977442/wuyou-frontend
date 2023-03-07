<template>
	<view class="content">
		<view class="base-info space-between-algin bottom-line padding-height-20">
			<view class="column">
				<view class="align-height">
					<text class="name">{{ resume.name }}</text>
				</view>
				<text class="text-color">{{ formatAge(resume.birthday) }}岁 · {{ resume.education }}</text>
			</view>
			<image class="header" :src="resume.userAvatar || '/static/img/head.png'"></image>
		</view>
		<view class="skill width-100 padding-height-30 column bottom-line">
			<view class="space-between-algin"><text class="text-title">个人优势</text></view>
			<text class="item-content margin-height-20">{{ resume.skill }}</text>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">意向岗位</text>
			<view class="align-height">
				<text class="text-sub-title">{{ resume.postName }}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">期望薪资</text>
			<view class="align-height">
				<text class="text-sub-title">{{ resume.salary }}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">工作经验</text>
			<view class="align-height">
				<text class="text-sub-title">{{ resume.experience }}</text>
			</view>
		</view>
		<view class="status width-100 space-between-algin padding-height-40 bottom-line">
			<text class="text-title">求职状态</text>
			<view class="align-height">
				<text class="text-sub-title">{{ resume.jobStatus }}</text>
			</view>
		</view>
		<view class="btn-row row">
			<button type="primary" class="btn-save width-55" @click="apply">
				<text class="yzb label-icon yzb-mianshiyaoqing"></text>
				{{ isApply ? '取消邀请' : '面试邀请' }}
			</button>
			<button class="btn-delete" @click="collect">
				<text class="yzb label-icon yzb-ziyuan141"></text>
				{{ isCollect ? '取消收藏' : '收藏' }}
			</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mCell from '@/components/m-cell/m-cell.vue'
import { formatDate, calCurrentYear } from '@/common/date'
export default {
	components: {
		mCell
	},
	computed: {
		...mapState(['userInfo'])
	},
	data() {
		return {
			resume: {},
			isApply: false,
			isCollect: false,
			params: {
				dataId: "",
				type: 1,
				userId: ""
			},
		}
	},
	onLoad(query) {
		this.getResumeInfo(query.id)
		this.params.dataId = query.id
		this.params.userId = this.userInfo.id
		this.checkApply()
		this.checkCollect()
		this.addBrowse()
	},
	methods: {
		formatAge(birthday) {
			return calCurrentYear(birthday)
		},

		async getResumeInfo(id) {
			this.resume = await this.$apis.getResumeInfo(id)
		},
		async collect() {
			if (!this.isCollect) {
				let res = await this.$apis.addCollect(this.params)
				this.isCollect = !this.isCollect
				if (res) {
					uni.showToast({
						title: '收藏成功',
						duration: 2000
					})
				}
			} else {
				let res = await this.$apis.deleteCollect(this.params)
				this.isCollect = !this.isCollect
				if (res) {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					})
				}
			}
		
		},
		
		async apply(){
			if (!this.isApply) {
				let res = await this.$apis.addApply(this.params)
				this.isApply = !this.isApply
				if (res) {
					uni.showToast({
						title: '邀请成功',
						duration: 2000
					})
				}
			} else {
				let res = await this.$apis.deleteApply(this.params)
				this.isApply = !this.isApply
				if (res) {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					})
				}
			}
		},
		
		async checkApply(){
			let res = await this.$apis.isApply(this.params)
			this.isApply = res
		},
		async checkCollect(){
			let res = await this.$apis.isCollect(this.params)
			this.isCollect = res
		},
		async addBrowse(){
			let res = await this.$apis.addBrowse(this.params)
		},
	}
}
</script>

<style lang="scss" scoped>
view {
	display: flex;
}

.text-title {
	font-size: $font-size-36;
	font-weight: bold;
	color: $font-color-000;
}

.text-sub-title {
	font-size: $font-lg;
}

.item-content {
	color: $uni-text-color;
}

.content {
	padding: 20upx;
	box-sizing: border-box;
}

.base-info {
	.name {
		font-size: 44upx;
		font-weight: bold;
	}

	.yzb-bianji2 {
		color: $font-color-000;
	}

	.header {
		width: 150upx;
		height: 150upx;
		border-radius: 50%;
	}
}
.btn-row {
	position: fixed;
	z-index: 999;
	bottom: 0upx;
	padding: 20upx 10upx;
	background-color: #ffffff;
	width: 100%;
	box-sizing: border-box;
	.btn-delete {
		background-color: $bg-grey;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		color: $font-color-333;
	}

	.btn-save {
		background-color: $main-color;
		height: 90upx;
		line-height: 90upx;
		font-size: $font-size-34;
		margin-left: 0px;
	}
	.width-55 {
		width: 55%;
	}

}
</style>
