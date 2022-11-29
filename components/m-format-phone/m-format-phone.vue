<template>
	<text>{{value}}</text>
</template>

<script>
	export default {
		props: {
			phone: {
				type: String,
				default: ""
			},

			isStar: Boolean
		},
		computed: {
			value() {
				let phone = this.phone + "";
				if (this.isStar) {
					return `${phone.slice(0,3)}******${phone.slice(phone.length-4,phone.length)}`
				} else {
					return phone;
				}
			}
		},
	}
</script>

<style>
</style>






