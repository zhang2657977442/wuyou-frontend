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
	
	contactUs: {
		name: "联系我们",
		path: "/pages/user/contactUs"
	},
	
	collect: {
		name: "我的收藏",
		path: "/pages/user/collect"
	},
	
	ccList: {
		name: "信用卡管理",
		path: "/pages/cc/ccList",
		requiresAuth: true
	},
	ccDetail: {
		name: "信用卡详情",
		path: "/pages/cc/ccDetail",
		requiresAuth: true
	},
	ccAdd: {
		name: "添加信用卡",
		path: "/pages/cc/ccAdd",
		requiresAuth: true
	},
	trade: {
		name: "商户收款",
		path: "/pages/trade/trade",
		requiresAuth: true
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
	
	positionSearch: {
		name: "职位搜索",
		path: "/pages/position/search"
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
	editCert:{
		name: "资格证书",
		path: "/pages/user/person/edit-cert"
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
	ccApply: {
		name: "信用卡申请",
		path: "/pages/cc/ccApply"
	},

}
