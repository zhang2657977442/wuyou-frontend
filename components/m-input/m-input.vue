<template>
    <view class="m-input-view">
        <input :focus="focus_" :type="inputType" :value="value" @input="onInput" class="m-input-input" :placeholder="placeholder"
            :password="type==='password'&&!showPassword" @focus="onFocus" @blur="onBlur" :maxlength="maxLength" :disabled="disabled"/>
        <!-- 优先显示密码可见按钮 -->
        <view v-if="clearable_&&!displayable_&& value && value.length" class="m-input-icon">
            <m-icon color="#cccccc" type="close" size="40" @click="clear"></m-icon>
        </view>
        <view v-if="displayable_" class="m-input-icon">
            <m-icon :color="showPassword?'#666666':'#cccccc'" type="ai-eye" size="40" @click="display"></m-icon>
        </view>
    </view>
</template>

<script>
    import mIcon from '@/components/m-icon/m-icon.vue'

    export default {
        components: {
            mIcon
        },
        props: {
            /**
             * 输入类型
             */
            type: String,
            /**
             * 值
             */
            value: String,
            /**
             * 占位符
             */
            placeholder: String,
            /**
             * 是否显示清除按钮
             */
            clearable: {
                type: [Boolean, String],
                default: false
            },
            /**
             * 是否显示密码可见按钮
             */
            displayable: {
                type: [Boolean, String],
                default: false
            },
            /**
             * 自动获取焦点
             */
            focus: {
                type: [Boolean, String],
                default: false
            },
			/*
			 * maxLength
			 */
			maxLength:{
				type:Number,
				default:1000
			},
			/* 
			 * 是否禁用
			 */
			disabled:{
				type:Boolean,
				default:false
			}
        },
        model: {
            prop: 'value',
            event: 'input'
        },
        data() {
            return {
                /**
                 * 显示密码明文
                 */
                showPassword: false,
                /**
                 * 是否获取焦点
                 */
                isFocus: false
            }
        },
        computed: {
            inputType() {
                const type = this.type
                return type === 'password' ? 'text' : type
            },
            clearable_() {
                return String(this.clearable) !== 'false'
            },
            displayable_() {
                return String(this.displayable) !== 'false'
            },
            focus_() {
                return String(this.focus) !== 'false'
            }
        },
        methods: {
            clear() {
                // this.value = ''
				this.$emit("input","")
            },
            display() {
                this.showPassword = !this.showPassword
            },
            onFocus() {
                this.isFocus = true
            },
            onBlur(e) {
                this.$nextTick(() => {
                    this.isFocus = false
					this.$emit("onblur",e)
                })
            },
            onInput(e) {
                this.$emit('input', e.target.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-input-view {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        flex: 1;
        padding: 20rpx 10rpx;
    }

    .m-input-input {
        flex: 1;
        width: 100%;
    }
    
    .m-input-icon{
        width: 20px;
    }
</style>
