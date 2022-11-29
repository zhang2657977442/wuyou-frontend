function loginCheck(pageObj) {
	if (pageObj.onLoad) {
		let _onLoad = pageObj.onLoad;
		// 使用onLoad的话需要传递options
		pageObj.onLoad = function(options) {
			if (true) {
				// 获取当前页面
				_onLoad.call(this, options);

			} else {
				//跳转到登录页
				wx.redirectTo({
					url: "/pages/login/login"
				});
			}
		}
	}
	return pageObj;
}

export default loginCheck;
