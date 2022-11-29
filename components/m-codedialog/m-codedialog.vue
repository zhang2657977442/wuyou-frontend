<template>
	<view v-if="show" class="codedialog">
		<view class="mask"></view>
		<view class="dialog-view">
			<text class="dialog-close" @click="closeDialog()"></text>
			<view class="dialog-hd">
				<view class="codedialog-maintitle">
					<text>发送验证码</text>
				</view>
				<view v-if="phone!='' && phone !=null " class="codedialog-subtitle">
					<text>已发送到手机号：{{phoneStr}}</text>
				</view>
			</view>
			<view class="dialog-bd">
				<view class="code-view">
					<view v-for="(code,index) of codeAry" :key="index" class="code-item">{{code.val}}</view>
				</view>
			</view>
			<view class="dialog-ft">
				<view v-if="countdown==60" @click="resend" class="resend">重新发送</view>
				<view v-if="countdown<60" class="countdown">{{countdown}}s</view>
			</view>
		</view>

		<view class="keyboard">
			<view class="keyboard-line">
				<view data-val="1" @click="bindKeyEvent" class="button-item">1</view>
				<view data-val="2" @click="bindKeyEvent" class="button-item">2</view>
				<view data-val="3" @click="bindKeyEvent" class="button-item">3</view>
			</view>
			<view class="keyboard-line">
				<view data-val="4" @click="bindKeyEvent" class="button-item">4</view>
				<view data-val="5" @click="bindKeyEvent" class="button-item">5</view>
				<view data-val="6" @click="bindKeyEvent" class="button-item">6</view>
			</view>
			<view class="keyboard-line">
				<view data-val="7" @click="bindKeyEvent" class="button-item">7</view>
				<view data-val="8" @click="bindKeyEvent" class="button-item">8</view>
				<view data-val="9" @click="bindKeyEvent" class="button-item">9</view>
			</view>
			<view class="keyboard-line">
				<view data-val="clear" @click="bindKeyEvent" class="button-item">清空</view>
				<view data-val="0" @click="bindKeyEvent" class="button-item">0</view>
				<view data-val="delete" @click="bindKeyEvent" class="button-item">x</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			autoCountdown: {
				type: Boolean,
				default: true
			},
			phone: {
				type: String,
				default: ""
			},
			len: {
				type: Number,
				default: 6
			}
		},
		data() {
			return {
				codeAry: [{
					"val": ""
				}, {
					"val": ""
				}, {
					"val": ""
				}, {
					"val": ""
				}],
				currItem: 0,
				countdown: 60,
				cTimer: null,
				callResult: {
					type: 0,
					code: null
				},
				suspend: false
			};
		},
		computed: {
			phoneStr() {
				return this.phone.substr(0, 3) + "****" + this.phone.substr(7);
			}
		},
		watch: {
			show: function() {
				console.log(this.show)
				if (this.show) {
					if (!this.suspend) {
						this.init();
					}
				} else {
					if (!this.suspend) {
						this.clearTimer();
					}
					this.clearCode();
				}
			}
		},
		methods: {
			init: function() {
				var codeAry = [];
				for (var i = 0; i < this.len; i++) {
					codeAry.push({
						val: ""
					})
				}
				this.codeAry = codeAry;
				this.currItem = 0;
				if (this.autoCountdown) {
					this.startTimer();
				}
			},
			bindKeyEvent: function(e) {
				var _this = this;
				var val = e.currentTarget.dataset.val;
				switch (val) {
					case "clear":
						_this.clearCode();
						break;
					case "delete":
						_this.deleteCode();
						break;
					default:
						_this.inputVal(val);
						break;
				}
			},
			inputVal: function(val) {
				if (this.currItem < this.len) {
					this.codeAry[this.currItem].val = val;
					this.currItem++;
				}
				if (this.currItem == this.len) {
					this.execuCall(1);
				}
			},
			clearCode: function() {
				console.log(123)
				this.init();
			},
			deleteCode: function() {
				if (this.currItem > 0) {
					this.codeAry[this.currItem - 1].val = "";
					this.currItem--;
				}
			},
			closeDialog: function() {
				this.execuCall(-1);
			},
			startTimer: function() {
				var _this = this;
				if (_this.cTimer == null) {
					_this.cTimer = setInterval(function() {
						_this.countdown--;
						if (_this.countdown == 0) {
							_this.clearTimer();
						}
					}, 1000)
				}
			},
			clearTimer: function() {
				var _this = this;
				clearInterval(_this.cTimer);
				_this.cTimer = null;
				_this.countdown = 60;
			},
			getCodeValue: function() {
				var codeStr = "";
				this.codeAry.forEach(function(code) {
					codeStr += code.val;
				})
				return codeStr;
			},
			execuCall: function(type) {
				this.callResult.type = type;
				if (type == 1) {
					this.callResult.code = this.getCodeValue();
					this.clearTimer();
				} else {
					this.suspend = true;
					this.callResult.code = null;
				}
				this.$emit("change", this.callResult);
			},
			resend: function() {
				var _this = this;
				_this.callResult.code = null;
				_this.callResult.type = 0;
				_this.callResult.resendCall = function() {
					_this.init();
				}
				_this.$emit("change", _this.callResult);

			}

		}
	}
</script>

<style scoped>
	.button-item:active {
		background: #d4d4d4;
	}

	.button-item+.button-item {
		border-left: 0.1px solid #d4d4d4;
	}

	.button-item {
		flex: 1;
		padding: 14px 0px;
	}

	.keyboard-line+.keyboard-line {
		border-top: 0.1px solid #d4d4d4;
	}

	.keyboard-line {
		display: flex;
	}

	.keyboard {
		background: #fff;
		position: absolute;
		z-index: 999;
		width: 100%;
		left: 0;
		bottom: 0;
		font-size: 17px;
	}

	.dialog-close {
		color: #999;
		height: 20px;
		width: 20px;
		font-size: 15px;
		top: 5px;
		left: 5px;
		position: absolute;
	}


	.dialog-close:before {
		content: "\2716";
	}

	.countdown {
		color: #666;
		font-size: 16px;
	}

	.resend {
		color: #007aff;
		font-size: 16px;
	}

	.dialog-ft {
		margin-top: 10px;
	}

	.code-view {
		display: flex;
		text-align: center;
		margin: 0 auto;
		border-collapse: separate;
		border-spacing: 10px 5px;
	}

	.code-item+.code-item {
		margin-left: 5px;
	}

	.code-item {
		flex: 1;
		border-bottom: 1px solid #999;
		padding-bottom: 2px;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
	}

	.dialog-bd {
		margin-top: 5px;
	}

	.codedialog-subtitle {
		margin-top: 5px;
		padding: 5px 0px;
		font-size: 15px;
		line-height: 1.4;
		word-wrap: break-word;
		word-break: break-all;
		color: #999;
	}

	.dialog-view {
		position: fixed;
		z-index: 999;
		width: 70%;
		max-width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -120%);
		background-color: #fff;
		text-align: center;
		border-radius: 3px;
		overflow: hidden;
		padding: 20px 10px;
	}

	.mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
	}

	.codedialog {
		z-index: 999;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		box-sizing: border-box;
		text-align: center;
	}
</style>
