<template>
    <div class="goeasy-audio-player" @click="playAudio">
        <div class="audio-facade" :style="{width:Math.ceil(duration)*7 + 50 + 'px'}">
            <div class="audio-facade-bg" :class="{'play-icon':play}"> </div>
            <div class="audio-seconds">{{Math.ceil(duration) || 1}}</div>
        </div>
    </div>
</template>

<script>
    const innerAudioContext = uni.createInnerAudioContext();
    export default {
        name: "GoEasyAudioPlayer",
        props : ['src', 'duration'],
        data () {
            return {
                play : false
            }
        },
        methods : {
            playAudio () {
                this.play = true;
				this.$mUtils.playAudio(this.src);
                setTimeout(() => {
                    this.play = false;
                }, this.duration*1000)
            }
        }
    }
</script>

<style scoped>
    .goeasy-audio-player{
        margin-top: 12rpx;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    .audio-facade{
        min-width: 20rpx;
        padding: 6rpx 10rpx;
        height: 72rpx;
        line-height: 72rpx;
        background: #618DFF;
        font-size: 24rpx;
        border-radius: 14rpx;
        color: #ffffff;
        display: flex;
    }
    .audio-facade-bg{
        background: url("./images/voice.png") no-repeat center;
        background-size: 30rpx;
        width: 40rpx;
    }
    .audio-facade-bg.play-icon{
        background: url("./images/play.gif") no-repeat center;
        background-size: 30rpx;
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -o-transform:rotate(180deg);
        transform:rotate(180deg);
    }
	.audio-seconds{
		display: flex;
		align-items: center;
	}
</style>