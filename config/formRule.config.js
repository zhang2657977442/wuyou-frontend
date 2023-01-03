/* 
 * 应用表单校验相关配置
 * 依赖：graceChecker.js 进行校验
 * 
 * 使用：引入该js到页面，let res = graceChecker.check({phoneNo:"",code:""},formRule.loginRule)
 */

export default {
	/* 用户登录 */
	loginRule: [{
		name: "openId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "登录的openId为空,请从所属公众号菜单打开链接"
	},{
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "code",
		checkType: "string",
		checkRule: "6",
		errorMsg: "请输入6位验证码"
	}],

	/* 发送验证码验证手机号 */
	sendCodeRule: [{
		name: "phoneNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "手机号不能为空"
	}, {
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}],
	
	/*个人简历 */
	regContentRule: [{
		name: "content",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "内容不能为空"
	}],
	
	/*基本信息 */
	regResumeBaseRule: [{
		name: "name",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "姓名不能为空"
	}],
	
	
	
	/*求职期望 */
	regExpectRule: [{
		name: "jobType",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "求职类型不能为空"
	},{
		name: "postId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "职位不能为空"
	},{
		name: "industryId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "行业不能为空"
	},{
		name: "expectSalary",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "期望薪资不能为空"
	}],
	
	
	/*公司入驻 */
	regCompanyRule: [{
		name: "logo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "公司Logo不能为空"
	},{
		name: "name",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "公司简称不能为空"
	},{
		name: "fullName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "公司全称不能为空"
	},{
		name: "industryId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "行业不能为空"
	},{
		name: "staffSize",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "公司规模不能为空"
	}],
	
	
	/*新增公司职位 */
	regPositionRule: [{
		name: "postName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "职位名称不能为空"
	},{
		name: "minEducation",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "学历不能为空"
	},{
		name: "salary",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "薪资要求不能为空"
	},{
		name: "descr",
		checkType: "职位描述",
		checkRule: "",
		errorMsg: "职位描述不能为空"
	},{
		name: "address",
		checkType: "工作地点",
		checkRule: "",
		errorMsg: "工作地点不能为空"
	},{
		name: "addressHouse",
		checkType: "工作点门牌号",
		checkRule: "",
		errorMsg: "工作点门牌号不能为空"
	}],
	

	/* 修改结算卡 */
	updataCustomerCardRule: [{
		name: "customerNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "商户编号为空"
	}, {
		name: "userName",
		checkType: "string",
		checkRule: "1,3",
		errorMsg: "姓名应为1-3个字符"
	}, {
		name: "idCard",
		checkType: "string",
		checkRule: "15,18",
		errorMsg: "身份证号格式不正确"
	}, {
		name: "cardNo",
		checkType: "int",
		checkRule: "3,20",
		errorMsg: "银行卡号格式不正确"
	}, {
		name: "cityNo",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请选择开户地区"
	}, {
		name: "bankName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "未查询到银行名称"
	}, {
		name: "phoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "settleCardImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传身份证和结算卡照片"
	}, {
		name: "cardHolderIdImgId",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "请上传手持身份证合影照片"
	}],

	/* 信用卡添加 */
	ccAddRule: [{
		name: "cardNo",
		checkType: "int",
		checkRule: "3,20",
		errorMsg: "银行卡号格式不正确"
	}, {
		name: "accountName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "开户名称不能为空"
	}, {
		name: "reservedPhoneNo",
		checkType: "phoneno",
		checkRule: "",
		errorMsg: "手机号格式不正确"
	}, {
		name: "idCard",
		checkType: "string",
		checkRule: "15,18",
		errorMsg: "身份证号格式不正确"
	}, {
		name: "bankName",
		checkType: "notnull",
		checkRule: "",
		errorMsg: "银行名称不能为空"
	}]
}
