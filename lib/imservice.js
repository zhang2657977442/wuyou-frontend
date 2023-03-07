import restApi from './restapi';

function Friend(_id, username, avatar) {
	this._id = _id;
	this.name = username;
	this.avatar = avatar;
}

function Group(_id, username, avatar) {
	this._id = _id;
	this.name = username;
	this.avatar = avatar;
}

function IMService(goEasy, GoEasy) {
	//当前用户
	this.currentUser = null;
	//我的群
	this.groups = {};

	// GoEasy 模块
	this.GoEasy = GoEasy;

	//goEasy 实例对象
	this.goEasy = goEasy;

	//私聊消息记录，map格式，每个好友对应一个数组
	this.privateMessages = {};

	//群聊消息记录，map格式，每个群对应一个数组
	this.groupMessages = {};

	/*
	 * 监听器们
	 *
	 * 可以在页面里，根据需求，重写以下监听器，
	 * 便于当各种事件触发时，页面能够执行对应的响应
	 *
	 */
	//收到一条私聊消息
	this.onNewPrivateMessageReceive = function(friendId, message) {};
	//收到一条群聊消息
	this.onNewGroupMessageReceive = function(groupId, message) {};

}

//获取群成员
IMService.prototype.getGroupMembers = function(groupId) {
	let members = restApi.findGroupMembers(groupId);
	let membersMap = {};
	members.map(item => {
		membersMap[item._id] = item
	});
	return membersMap;
};

IMService.prototype.findGroupById = function(groupId) {
	let group = restApi.findGroupById(groupId);
	return new Group(group._id, group.name, group.avatar);
};

IMService.prototype.findFriendById = function(userId) {
	let user = restApi.findUserById(userId);
	return new Friend(user._id, user.name, user.avatar);
};

IMService.prototype.getGroupMessages = function(groupId) {
	if (!this.groupMessages[groupId]) {
		this.groupMessages[groupId] = [];
	}
	return this.groupMessages[groupId]
};

IMService.prototype.getPrivateMessages = function(friendId) {
	if (!this.privateMessages[friendId]) {
		this.privateMessages[friendId] = [];
	}
	return this.privateMessages[friendId];
};

//连接GoEasy
IMService.prototype.connect = function(currentUser) {
	console.log("currentUser==", currentUser);
	this.currentUser = currentUser;
	let userData = {
		name: this.currentUser.username,
		avatar: this.currentUser.avatar
	}
	//初始化相关的监听器
	this.initialListeners();
	this.goEasy.connect({
		id: this.currentUser.id,
		data: userData,
		onSuccess: function() {
			//连接成功
			console.log("GoEasy connect successfully.id===", currentUser.id)
		},
		onFailed: function(error) {
			//连接失败
			console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
		},
		onProgress: function(attempts) { //连接或自动重连中
			console.log("GoEasy is connecting", attempts);
		}
	});
	// this.subscribeGroupMessage(currentUser);
};

//断开GoEasy
IMService.prototype.disconnect = function() {
	this.goEasy.disconnect({
		onSuccess: function() {
			console.log('GoEasy disconnect successfully.');
		},
		onFailed: function(error) {
			console.log('Failed to disconnect GoEasy, code:' + error.code + ',error:' + error.content);
		}
	});
};

IMService.prototype.subscribeGroupMessage = function() {
	let groups = restApi.findGroups(this.currentUser);
	let groupIds = groups.map(item => item._id);
	this.goEasy.im.subscribeGroup({
		groupIds: groupIds,
		onSuccess: function() {
			//订阅成功
			console.log('订阅群消息成功');
		},
		onFailed: function(error) {
			//订阅失败
			console.log('订阅群消息失败')
		}
	});
}

//初始化监听器
IMService.prototype.initialListeners = function() {
	//监听私聊消息
	this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED, (message) => {
		//更新私聊消息记录
		let friendId;
		if (this.currentUser._id === message.senderId) {
			friendId = message.receiverId;
		} else {
			friendId = message.senderId;
		}
		let friendMessages = this.getPrivateMessages(friendId);
		friendMessages.push(message);
		//如果页面传入了相应的listener，执行listener
		this.onNewPrivateMessageReceive(friendId, message);
	});

	//监听群聊消息
	this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, (message) => {
		let groupId = message.groupId;
		//更新群聊消息记录
		let groupMessages = this.getGroupMessages(groupId);
		groupMessages.push(message);
		//如果页面传入了相应的listener，执行listener
		this.onNewGroupMessageReceive(groupId, message);
	})
};

export default IMService;
