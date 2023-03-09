/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// 权限路由
	user: {
		name: "个人中心",
		path: "/pages/user/user",
		requiresAuth: true
	},
	
	userInfo: {
		name: "基本信息",
		path: "/pages/user/userInfo",
		requiresAuth: false
	},
	uUserInfo: {
		name: "修改基本信息",
		path: "/pages/user/uUserInfo",
		requiresAuth: true
	},
	
	aboutUs: {
		name: "关于我们",
		path: "/pages/user/aboutUs"
	},
	terms: {
		name: "用户协议",
		path: "/pages/user/terms",
	},
	privacy: {
		name: "隐私政策",
		path: "/pages/user/privacy",
	},
	contactUs: {
		name: "联系我们",
		path: "/pages/user/contactUs"
	},
	help:{
		name: "帮助中心",
		path: "/pages/user/help"
	},
	setting:{
		name: "系统设置",
		path: "/pages/user/settings"
	},
	hideSetting: {
		name: "隐藏设置",
		path: "/pages/user/hideSetting",
	},
	collect: {
		name: "我的收藏",
		path: "/pages/user/collect"
	},
	connected: {
		name: "已沟通过",
		path: "/pages/user/connected",
	},
	robot: {
		name: "在线客服",
		path: "/pages/user/robot",
	},
	browse: {
		name: "浏览记录",
		path: "/pages/user/browse",
	},
	companyAuth: {
		name: "公司认证",
		path: "/pages/user/company/auth",
	},
	apply: {
		name: "我的投递",
		path: "/pages/user/apply",
	},
	notices: {
		name: "系统消息",
		path: "/pages/chat/notice/notices",
	},
	noticeDetail: {
		name: "消息详情",
		path: "/pages/chat/notice/noticeDetail",
	},
	privateChat: {
		name: "聊天",
		path: "/pages/chat/privateChat",
	},

	// 非权限路由
	main: {
		name: "首页",
		path: "/pages/main/main"
	},
	
	search: {
		name: "搜索",
		path: "/pages/main/search"
	},
	
	type: {
		name: "分类",
		path: "/pages/type/type"
	},
	
	industry: {
		name: "行业选择",
		path: "/pages/common/industry"
	},
	
	post: {
		name: "职位选择",
		path: "/pages/common/post"
	},
	
	positionList: {
		name: "岗位列表",
		path: "/pages/position/list"
	},
	
	positionDetail: {
		name: "职位详情",
		path: "/pages/position/detail"
	},
	
	
	companyList: {
		name: "公司列表",
		path: "/pages/company/list"
	},
	
	resumeList:{
		name: "简历列表",
		path: "/pages/company/resumeList"
	},
	
	companyDetail: {
		name: "公司详情",
		path: "/pages/company/detail"
	},
	
	//个人简历相关
	personReume:{
		name: "个人简历",
		path: "/pages/user/person/resume",
		requiresAuth: true
	},
	
	resumeDetail:{
		name: "个人简历",
		path: "/pages/user/person/resumeDetail"
	},
	editSkill:{
		name: "个人优势",
		path: "/pages/user/person/edit-skill"
	},
	editExpect:{
		name: "求职期望",
		path: "/pages/user/person/edit-expect"
	},
	editWork:{
		name: "工作经历",
		path: "/pages/user/person/edit-work"
	},
	editWorkContent:{
		name: "工作内容",
		path: "/pages/user/person/edit-work-content"
	},
	editPro:{
		name: "项目经历",
		path: "/pages/user/person/edit-pro"
	},
	editProContent:{
		name: "添加项目内容",
		path: "/pages/user/person/edit-pro-content"
	},
	editEdu:{
		name: "教育经历",
		path: "/pages/user/person/edit-edu"
	},
	
	enter:{
		name: "公司入驻",
		path: "/pages/user/company/enter",
		requiresAuth: true
	},
	company:{
		name: "公司信息",
		path: "/pages/user/company/company"
	},
	positions:{
		name: "职位管理",
		path: "/pages/user/company/positions"
	},
	positionEdit:{
		name: "职位编辑",
		path: "/pages/user/company/position-edit"
	},
	
	login: {
		name: "登录",
		path: "/pages/login/login"
	},
	index: {
		name: "推荐注册",
		path: "/pages/login/index"
	},
	reg: {
		name: "注册",
		path: "/pages/login/reg"
	},
	regSuccess: {
		name: "提交成功",
		path: "/pages/login/success"
	},

}
