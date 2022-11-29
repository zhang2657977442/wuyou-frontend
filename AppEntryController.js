import Vue from "vue"

/* 
 * APP入口页面控制器
 * 中心思想：动态入口解决方案 描述见：http://ask.dcloud.net.cn/question/63270
 */

class AppEntryController extends Vue {
	constructor(arg) {
		super();
	}

	// 在应用的首页调用main方法 控制路由入口
	async main(query) {
		return new Promise((resolve, reject) => {

			// H5环境保存openId
			// #ifdef H5
			// H5环境推广码注册
			if (query.referrer && query.referrer != " ") {
				this.$mRouter.reLaunch({
					route: this.$mRoutesConfig.reg,
					query: query
				})
				reject("不可以加载首页数据");
				return;
			}
			//  #endif



			// 读取配置文件 判断APP是否开启了游客模式 如果开启了无需判断是否登录逻辑
			if (this.$mConfig.touristMode && (typeof this.$mConfig.touristMode === "boolean")) {
				// #ifdef APP-PLUS
				console.log("关闭启动页")
				plus.navigator.closeSplashscreen()
				// #endif
				resolve("可以加载首页数据");
				return;
			}


			// 若APP没有开启游客模式 则检测是否登录? 去登录...
			if (!this.$store.getters.hasLogin) {
				this.$mRouter.redirectTo({
					route: this.$mRoutesConfig.login,
					query: query
				})
				// #ifdef APP-PLUS
				setTimeout(() => {
					console.log("关闭启动页")
					plus.navigator.closeSplashscreen()
				}, 800)
				// #endif
				reject("APP当前不是游客模式,请先登录后进入");
			}
		})
	}

	// 小程序端获取openId
	getWeChatOpenId() {
		// #ifdef H5
		let url = window.location.href;
		let query = this.$mUtils.getRequestParameters(url);
		if (query.openId) this.$store.commit("SET_OPENID", query.openId);
		// #endif


		// #ifdef MP-WEIXIN | APP-PLUS
		// 登录微信小程序 获取openID
		this.$store.commit("SET_OPENID", this.$mConfig.testOpenId);
		// #endif

	}

	// 处理H5端 直接通过地址栏访问地址的情况 需要鉴权
	handleH5BrowserAddressBarAuth() {
		// #ifdef H5
		let hashPath = window.location.hash.substr(1);
		hashPath = hashPath.split("?")[0];
		if (!/\/pages\//.test(hashPath)) return;
		for (let routeKey in this.$mRoutesConfig) {
			let route = this.$mRoutesConfig[routeKey];
			// 如果当前访问的路由是权限页面，判断登录状态
			if (route.path == hashPath) {
				if (route.requiresAuth && !this.$store.getters.hasLogin) {
					console.log("没有登录,无权进入")
					this.$mRouter.redirectTo({
						route: this.$mRoutesConfig.login,
						query: {

						}
					})
				}
				break;
			}
		}
		// #endif
	}

	/*
	 * 用途：商户状态拦截器
	 * 说明：当store中的商户状态为 审核中 || 审核失败 的情况 拦截器会向服务器发送请求查询最新的商户状态。
	 * 场景：点击某一个功能按钮时需要校验商户状态，只有审核成功的商户方可进入，否则跳转到状态提示页面。
	 */
	async customerStatusInterceptor() {
		return new Promise(async (resolve, reject) => {

			// store中的状态
			let $storeCustomerStatus = this.$store.state.customerInfo.status;
			if ($storeCustomerStatus == "SUCCESS") {
				// 商户状态：审核通过
				resolve($storeCustomerStatus);
				return;
			}

			// 服务器中的状态
			try {
				let serverCustomerStatus = await this.$apis.getCustomerStatus();
				resolve(serverCustomerStatus);
			} catch (e) {
				reject(e)
			}
		})
	}

	/* 
	 * 登录状态下 全局路由获取商户信息
	 * 说明：APP打开后向服务器拉取最新商户信息，以及商户审核状态,保存在本地store中使用。
	 * 场景：H5端 每个页面打开后执行 APP或小程序打开后执行
	 */

	/* async getCustomerInfo() {
		if (!this.$store.getters.hasLogin) return;
		let customerInfo = await this.$apis.getCustomer();
		this.$store.commit("SET_CUSTOMERINFO", customerInfo);
	} */
}

export default new AppEntryController()
