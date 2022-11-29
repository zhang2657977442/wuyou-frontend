<template>
	<text>{{value}}</text>
</template>

<script>
	export default {
		props: {
			cardNo: {
				type: [String,Number],
				default: ""
			},

			isStar: Boolean
		},
		computed: {
			value() {
				let cardNo = this.cardNo + "";
				if (this.isStar) {
					return `${cardNo.slice(0,4)}******${cardNo.slice(cardNo.length-4,cardNo.length)}`
				} else {
					return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
				}
			}
		},
	}
</script>

<style>
</style>
