<template>
	<view class="content">
		<view class="title">
			<text>{{ detail.title }}</text>
		</view>
		<view class="date">
			<text v-if="detail">{{ formatCreateTime(detail.createTime) }}</text>
		</view>
		<view class="detail"><bctos-rich-text :nodes="detail.content"></bctos-rich-text></view>
	</view>
</template>

<script>
import { formatDate } from '@/common/date';
export default {
	props: {
		detail: {}
	},
	methods: {
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g, '/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
view {
	font-size: 30upx;
	line-height: 1.8;
}
text {
	font-size: 30upx;
}
.content {
	flex: 1;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20upx;
	box-sizing: border-box;
}
.title {
	font-size: 34upx;
	font-weight: bold;
	display: flex;
	justify-content: center;
}

.date {
	color: $uni-text-color-grey;
	margin-top: 10upx;
}

.detail {
	margin-top: 20upx;
}
</style>
