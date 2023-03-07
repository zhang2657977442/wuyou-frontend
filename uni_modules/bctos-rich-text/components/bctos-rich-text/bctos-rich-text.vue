<template>
	<view>
		<view v-for="(content, index) in contentArr" :key="index">
			<rich-text :nodes="content"></rich-text>
			<video v-if="videoArr[index] !== null" :src="videoArr[index]" controls :style="{ width }"></video>
		</view>
	</view>
</template>

<script>
export default {
	name: 'bctos-rich-text',
	props: { nodes: {}, width: { type: String, default: '100%' } },
	data() {
		return {
			contentArr: [],
			videoArr: []
		};
	},
	watch: {
		nodes(val) {
			this.parseVideo();
		}
	},
	created() {
		this.parseVideo();
	},
	methods: {
		parseVideo() {
			if (typeof this.nodes != 'string') {
				//不是HTML字符串格式的暂不处理
				this.contentArr[0] = this.nodes;
				this.videoArr[0] = null;
				return false;
			}

			//同步解决如果图片太大超出手机显示界面的问题
			let nodes = this.nodes.replace(/\<img/g, '<img style="max-width:98%!important;height:auto;"');
			let arr = nodes.split('</video>');
			let reg = /<video([\s\S]*)/g;

			for (let i in arr) {
				var item = arr[i];
				var urlMatch = item.match(/<video[\s\S]*src=\"(.*?)\"/);
				if (urlMatch && urlMatch.length > 1) {
					this.videoArr[i] = urlMatch[1];
				} else {
					this.videoArr[i] = null;
				}

				this.contentArr[i] = item.replace(reg, '');
			}
			this.$forceUpdate()
		}
	}
};
</script>

<style></style>
