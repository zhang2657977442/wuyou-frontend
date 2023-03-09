<script>
	export default {
		onLaunch: function(o) {
			console.log('App Launch', o);

			this.$AppEntryController.getWeChatOpenId();
			// #ifdef H5
			this.$AppEntryController.handleH5BrowserAddressBarAuth();
			// #endif
		},
		onShow: function(o) {
			console.log('App Show', o);
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	@import "./static/css/yzb-icon.css";
	
	/*通用 */
	view {
		// display: flex;
		font-size: $uni-font-size-base;
		line-height: 1.8;
	}
	
	progress,
	checkbox-group {
		width: 100%;
		
	}
	
	form {
		width: 100%;
	}
	
	/**
	 * 全局输入框文本大小
	 */
	input {
		font-size: $uni-font-size-lg;
	}
	
	/**
	 * 全局文本大小
	 */
	text {
		font-size: $uni-font-size-base;
	}
	
	/**
	 * 内容区域
	 */
	.content {
		flex: 1;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}
	
	/**
	 * 横向布局
	 */
	.row {
		display: flex;
		flex-direction: row;
	}
	
	/**
	 * 竖向布局
	 */
	.column {
		display: flex;
		flex-direction: column;
	}
	
	/**
	 * 居中对齐
	 */
	.center-algin{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.align-height{
		align-items: center;
	}
	
	.align-width{
		justify-content: center;
	}
	.align-top{
		align-items:flex-start;
	}
	.align-bottom{
		align-items: flex-end;
	}
	
	/**
	 * 左右对齐
	 */
	.space-between-algin{
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
	
	/* 文本溢出隐藏 */
	.text-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	/* 背景色 */
	.bg-white{
		background: #FFFFFF;
	}
	
	.text-color{
		color: $uni-text-color;
	}
	.text-color-inverse{
		color: $uni-text-color-inverse;
	}
	.text-color-grey{
		color: $uni-text-color-grey;
	}
	.text-color-placeholder{
		color: $uni-text-color-placeholder;
	}
	.text-color-disable{
		color: $uni-text-color-disable;
	}
	
	.text-size-base{
		font-size: $uni-font-size-base;
	}
	.text-size-lg{
		font-size: $uni-font-size-lg;
	}
	.text-size-40{
		font-size: $font-size-40;
	}
	/**
	 *  字体加粗
	 */
	.font-bold{
		font-weight: bold;
	}
	
	/**
	 * 1行显示，多与的后面省略号显示
	 */
	.ellipsis-oneline{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	/**
	 * 两行显示，多与的后面省略号显示
	 */
	.ellipsis-twoline{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.bottom-line{
		border-bottom: $border-color-base solid 1upx;
	}
	
	.left-line{
		border-left:$border-color-base solid 1upx;
	}
	.right-line{
		border-right: $border-color-base solid 1upx;
	}
	
	.top-line{
		border-top: $border-color-base solid 1upx;
	}
	
	.width-100{
		width: 100%;
	}
	.height-100{
		height: 100%;
	}
	
	.padding-5{
		padding: 5upx;
	}
	.padding-10{
		padding: 10upx;
	}
	.padding-15{
		padding: 15upx;
	}
	.padding-20{
		padding: 20upx;
	}
	.padding-height-5{
		padding: 5upx 0;
	}
	.padding-height-10{
		padding: 10upx 0;
	}
	.padding-height-15{
		padding: 15upx 0;
	}
	.padding-height-20{
		padding: 20upx 0;
	}
	.padding-height-25{
		padding: 25upx 0;
	}
	.padding-height-30{
		padding: 30upx 0;
	}
	.padding-height-40{
		padding: 40upx 0;
	}
	.padding-width-5{
		padding:0 5upx;
	}
	.padding-width-10{
		padding:0 10upx;
	}
	.padding-width-15{
		padding: 0 15upx;
	}
	.padding-width-20{
		padding:0 20upx;
	}
	.margin-5{
		margin: 5upx;
	}
	.margin-10{
		margin: 10upx;
	}
	.margin-15{
		margin: 15upx;
	}
	.margin-20{
		margin: 20upx;
	}
	.margin-left-5{
		margin-left: 5upx;
	}
	.margin-left-10{
		margin-left: 10upx;
	}
	.margin-left-15{
		margin-left: 15upx;
	}
	.margin-left-20{
		margin-left: 20upx;
	}
	.margin-right-5{
		margin-right: 5upx;
	}
	.margin-right-10{
		margin-right: 10upx;
	}
	.margin-right-15{
		margin-right: 15upx;
	}
	.margin-right-20{
		margin-right: 20upx;
	}
	.margin-top-5{
		margin-top: 5upx;
	}
	.margin-top-10{
		margin-top: 10upx;
	}
	.margin-top-15{
		margin-top: 15upx;
	}
	.margin-top-20{
		margin-top: 20upx;
	}
	.margin-bottom-5{
		margin-bottom: 5upx;
	}
	.margin-bottom-10{
		margin-bottom: 10upx;
	}
	.margin-bottom-15{
		margin-bottom: 15upx;
	}
	.margin-bottom-20{
		margin-bottom: 20upx;
	}
	.margin-height-5{
		margin: 5upx 0;
	}
	.margin-height-10{
		margin: 10upx 0;
	}
	.margin-height-15{
		margin: 15upx 0;
	}
	.margin-height-20{
		margin: 20upx 0;
	}
	.margin-width-5{
		margin:0 5upx;
	}
	.margin-width-10{
		margin:0 10upx;
	}
	.margin-width-15{
		margin: 0 15upx;
	}
	.margin-width-20{
		margin:0 20upx;
	}
</style>
