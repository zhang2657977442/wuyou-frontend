<template>
	<view class="upload-box">
		<view class="upload" v-if="previewImageUrl">
			<image class="cover" :src="previewImageUrl" @tap="previewImage" mode=""></image>
			<view class="close-btn" @tap="remove">
				<m-icon type="close" size="40" color="#ccc"></m-icon>
			</view>
		</view>
		<view class="upload" v-else @tap="chooseImage">
			<image class="cover" :src="cover" mode=""></image>
		</view>
		<view class="desc">
			{{placeholder}}
		</view>
	</view>
</template>

<script>
	import mIcon from "@/components/m-icon/m-icon.vue"
	export default {
		components: {
			mIcon
		},
		props: {
			cover: String,
			type: String,
			api: Function,
			placeholder: String,
			paramsKey: String,
			imgType: String
		},
		data() {
			return {
				previewImageUrl: "",
			};
		},
		methods: {
			// 选择图片
			chooseImage() {
				let _this = this;
				uni.chooseImage({
					count: 1, // 只能选择一张
					sizeType: ["compressed"], // 压缩图
					sourceType: ['album', 'camera'],
					success(res) {
						if (res.errMsg == "chooseImage:ok") {
							let tempFile = res.tempFiles[0];
							if (tempFile.size > 1024 * 1024 * 5) {
								uni.showToast({
									title: "图片不能大于5M"
								})
							} else {
								_this.uploadServer(tempFile.path);
							}
						} else {
							uni.showToast({
								title: "图片选择失败，请重试"
							})
						}
					}
				})
			},

			// H5 图片转base64方法
			h5UrlTobase64(filePath) {
				return new Promise(function(resolve, reject) {
					let img = new Image();
					img.onload = function() {
						let canvas = document.createElement("canvas");
						let ctx = canvas.getContext("2d");
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img, 0, 0, img.width, img.height);
						let base64 = canvas.toDataURL("image/png");
						resolve(base64);
					}
					img.onerror = function(err) {
						reject(err);
					}
					img.src = filePath;
				})
			},

			// 微信小程序 图片转base64方法
			wxUrlTobase64(filePath) {
				return new Promise(function(resolve, reject) {
					wx.getFileSystemManager().readFile({
						filePath: filePath,
						encoding: 'base64',
						success: res => {
							let base64 = 'data:image/png;base64,' + res.data;
							resolve(base64);
						}
					})
				})
			},

			// 上传图片到服务器
			async uploadServer(filePath) {
				let base64 = "";
				// #ifdef H5
				base64 = await this.h5UrlTobase64(filePath);
				// #endif

				// #ifdef MP-WEIXIN
				base64 = await this.wxUrlTobase64(filePath);
				// #endif
				
				base64 = base64.split(",")[1];

				let id = await this.api({
					imgType: this.imgType,
					imgString: base64
				});


				this.previewImageUrl = filePath;

				this.emitSendId(id);

			},

			// 预览图片
			previewImage() {
				uni.previewImage({
					urls: [this.previewImageUrl]
				});
			},

			// 删除重新选择
			remove() {
				this.previewImageUrl = "";
				this.emitSendId("");
			},

			emitSendId(id) {
				let data = {};
				data["paramsKey"] = this.paramsKey;
				data["id"] = id;
				this.$emit("onUpImg", data)
			},

			// 设置img
			setUpImg(o) {
				this.previewImageUrl = o.url;
				this.emitSendId(o.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload-box {
		padding: 10upx;
		box-sizing: border-box;
		background: #fff;
		border-radius: 10upx;
		margin-top: 10upx;
	}

	.upload {
		width: 285upx;
		height: 180upx;
		margin: 0upx auto;
		position: relative;
	}

	.close-btn {
		position: absolute;
		right: -50upx;
		top: 0;
	}

	.cover {
		width: 100%;
		height: 100%;
	}

	.desc {
		font-size: 30upx;
		text-align: center;
		color: #969595;
		line-height: 100upx;
	}
</style>
