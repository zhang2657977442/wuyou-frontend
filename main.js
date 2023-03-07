import Vue from 'vue'
import App from './App'
import store from './store'
import * as Db from './common/db.js'
import $AppEntryController from './AppEntryController.js'
import * as $apis from './apis/index.js'
import $mRouter from './common/router.js'
import $mUtils from './common/utils.js'
import $mConfig from "./config/index.config.js"
import $mAssetsPath from './config/assets.config.js'
import $mRoutesConfig from './config/routes.config.js'
import $mConstDataConfig from './config/constData.config.js'
import $modalHelper from './common/modalHelper.js'

import mPageView from "./components/m-page-view/m-page-view.vue"

Vue.component("joy-page", mPageView)

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
    // #ifdef H5
    return prePage;
    // #endif
	return prePage.$vm;
}

Vue.config.productionTip = false;

Vue.prototype.$page ={prePage};

Vue.prototype.$AppEntryController = $AppEntryController;

Vue.prototype.$store =store;

Vue.prototype.$apis = $apis;

Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mUtils = $mUtils;

Vue.prototype.$mConfig = $mConfig;

Vue.prototype.$mAssetsPath = $mAssetsPath;

Vue.prototype.$mRoutesConfig = $mRoutesConfig;

Vue.prototype.$mConstDataConfig = $mConstDataConfig;

Vue.prototype.$modalHelper = $modalHelper;

Vue.prototype.$db = Db;

import GoEasy from "./lib/goeasy-2.4.7.min.js";
const goEasy = GoEasy.getInstance({
	host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey:"BC-0e5f60e26cb0453192bbca4cc52fb20b",	// common key,
    modules:["im"],
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
    allowNotification:true //仅有效于app,小程序和H5将会被自动忽略
});
Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;


$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $mUtils.objParseUrlAndParam($mRoutesConfig.main.path, to.query)
		})
		return;
	}

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {

		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
