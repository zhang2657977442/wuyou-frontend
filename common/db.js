
//取值
function get(key,sync = true) {
    try {
		if(sync){
			return uni.getStorageSync(key);
		}else{
			let data = '';
			uni.getStorage({
				key:key,
				success: function (res) {
					data = res.data;
				}
			});
			return data;
		}
    } catch (e) {
        return false;
    }
}

//赋值
function set(key, value, sync = true) {
    try {
        if (sync) {
            return uni.setStorageSync(key, value);
        } else {
            uni.setStorage({
                key: key,
                data: value
            });
        }
    } catch (e) {

    }
}

export {
    get,
    set
}