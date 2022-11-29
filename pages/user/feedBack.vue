<template>
	<view class="content cc-detail">
		<m-cell title="卡片类型:" bottomLine>{{detailDate.cardType}}</m-cell>
		<m-cell title="银行名称:" bottomLine>{{detailDate.bankName}}</m-cell>
		<m-cell title="银行卡号:" bottomLine>
			<view class="format-card">
				<m-format-card :isStar="showCardNo" :cardNo="detailDate.cardNo"></m-format-card>
				<view class="format-card-eye-btn" @tap="handleShowCardNo">
					<m-icon :color="showCardNo?'#cccccc':'#666666'" type="ai-eye" size="40"></m-icon>
				</view>
			</view>
		</m-cell>
		<m-cell title="持卡人:" bottomLine>{{detailDate.accountName}}</m-cell>
		<m-cell title="手机号:">
			<m-format-phone :isStar="true" :phone="detailDate.reservedPhoneNo"></m-format-phone>
		</m-cell>

		<view class="del-btn">
			<button type="default" @tap="del">删除</button>
		</view>
	</view>
</template>

<script>
	import mCell from "@/components/m-cell/m-cell.vue"
	import mFormatCard from "@/components/m-format-card/m-format-card.vue"
	import mFormatPhone from "@/components/m-format-phone/m-format-phone.vue"
	import mIcon from '@/components/m-icon/m-icon.vue'
	export default {
		components: {
			mCell,
			mFormatCard,
			mFormatPhone,
			mIcon
		},
		data() {
			return {
				detailDate: "",
				showCardNo: true,
			}
		},
		onLoad(params) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.detailDate = JSON.parse(decodeURIComponent(params.detailDate));
			} catch (error) {
				this.detailDate = JSON.parse(params.detailDate);
			}
		},
		methods: {
			async del() {
				uni.showModal({
					title: '提示',
					content: '确定要删除信用卡吗？',
					success: res => {
						if (res.confirm) {
							this.$apis.deleteCard({
								onlyCode: this.detailDate.onlyCode
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
			},

			handleShowCardNo() {
				console.log(this.showCardNo)
				this.showCardNo = !this.showCardNo;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cc-detail {
		.del-btn {
			width: 90%;
			margin: 50upx auto;

			button {
				color: red;
			}
		}

		.format-card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.format-card-eye-btn{
				padding: 10upx;
			}
		}
	}
</style>
