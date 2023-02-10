import indexConfig from "./index.config.js"

const PATH = indexConfig.assetsPath;

/* 
 * 图片静态资源表，所有图片资源路径在这统一管理，不应该写死在页面中，该数据挂载到Vue原型中。
 * 页面使用：this.$mAssetsPath.grid_1
 * CSS背景：应尽量使用:style="" 行内样式设置背景图
 * PATH说明：本地路径或者服务器路径
 * 
 * 举例：<image :src="grid_1">  需要在data中映射 grid_1: this.$mAssetsPath.grid_1
 * 
 * 特别注意：经测试小程序中不支持 <image :src="$mAssetsPath.grid_1"> 该用法
 */

export default {

	// 首页grid的图标
	grid_1: PATH + "/grid-1.png",
	grid_2: PATH + "/grid-2.png",
	grid_3: PATH + "/grid-3.png",
	grid_4: PATH + "/grid-4.png",
	grid_5: PATH + "/grid-5.png",
	grid_6: PATH + "/grid-6.png",
	grid_7: PATH + "/grid-7.png",
	grid_8: PATH + "/grid-8.png",
	grid_9: PATH + "/grid-9.png",

	// 注册引导页的图片
	reg_img: PATH + "/register@3x.png",

	// 注册引导页的图标
	t_1: PATH + "/13@3x.png",
	t_2: PATH + "/14@3x.png",
	t_3: PATH + "/15@3x.png",
	t_4: PATH + "/16@3x.png",

	// 首页广告位的两个图片
	ad_1: PATH + "/ad-1.png",
	ad_2: PATH + "/ad-2.png",

	// 默认头像
	headImg: PATH + "/head.png",

	// 首页信用卡信息图
	ka_1: PATH + "/ka-1.png",
	ka_2: PATH + "/ka-2.png",

	// 暂无数据
	no_order_1: PATH + "/noOrder.png",

	// 首頁banner图
	banner_1: PATH + "/s1.png",
	
	//高薪职位
	job_high: "https://pan.whiteones.cn/d/PicGo/wuyou/job-high.png",
	//最新职位
	job_new: "https://pan.whiteones.cn/d/PicGo/wuyou/job-new.png",
	job_new: "https://pan.whiteones.cn/d/PicGo/wuyou/job-new.png",

	// 图片上传示例图
	upload_1: PATH + "/upload-50.png",
	upload_2: PATH + "/upload-51.png",
	upload_3: PATH + "/upload-52.png",

	// logo图
	logo: PATH + "/logo.jpg",

	// fail提示图
	fail_icon: PATH + "/pay_unopen.png",
	
	// 注册成功icon图
	regSuccessIcon:PATH + "/succ.jpg",
	
	// 暂无信用卡
	noCC:PATH + "/no-cc.png"
}
