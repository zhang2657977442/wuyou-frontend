import http from "./http.js";
import config from "@/config/index.config.js";

// 获取OpenId
export const getOpenId = (data) => http.GET(`${config.baseUrl}/user/getOpenId`, data);
// 绑定手机号
export const bindPhoneForWx = (data) => http.GET(`${config.baseUrl}/user/bindPhoneForWx`, data);
// 小程序授权登录
export const xcxUserLogin = (data) => http.POST(`${config.baseUrl}/user/wxUserLogin`, data);
// 获取用户资料
export const getUserInfo = (data) => http.GET(`${config.baseUrl}/user/getUserInfo`, data);
// 用户角色切换
export const switchRole = (data) => http.POST(`${config.baseUrl}/user/switchRole`, data);

// 查询简历信息
export const getResumeInfo = (data) => http.GET(`${config.baseUrl}/resume/getResumeInfo`, data);
//更新简历信息
export const updateResume = (data) => http.POST(`${config.baseUrl}/resume/updateResume`, data);

// 查询行业列表
export const getIndustryList = (data) => http.GET(`${config.baseUrl}/basic/getIndustryList`, data);
// 查询职位列表
export const getPositionList = (data) => http.GET(`${config.baseUrl}/basic/getPositionList`, data);
// 查询福利列表
export const getWelfareList = (data) => http.GET(`${config.baseUrl}/basic/getWelfareList`, data);




// 查询期望职位列表
export const getJobExpectList = (data) => http.GET(`${config.baseUrl}/person/getJobExpectList`, data);
// 查询期望职位详情
export const getJobExpectDetail = (data) => http.GET(`${config.baseUrl}/person/getJobExpectDetail`, data);
// 新增/更新期望职位
export const updateJobExpect = (data) => http.POST(`${config.baseUrl}/person/updateJobExpect`, data);
// 删除期望职位
export const deleteJobExpectById = (data) => http.GET(`${config.baseUrl}/person/deleteJobExpectById`, data);

// 查询工作经历列表
export const getWorkExpList = (data) => http.GET(`${config.baseUrl}/person/getWorkExpList`, data);
// 查询工作经历详情
export const getWorkExpDetail = (data) => http.GET(`${config.baseUrl}/person/getWorkExpDetail`, data);
// 新增/更新工作经历
export const updateWorkExp = (data) => http.POST(`${config.baseUrl}/person/updateWorkExp`, data);
// 删除工作经历
export const deleteWorkExpById = (data) => http.GET(`${config.baseUrl}/person/deleteWorkExpById`, data);

// 查询项目经历列表
export const getProExpList = (data) => http.GET(`${config.baseUrl}/person/getProExpList`, data);
// 查询项目经历详情
export const getProExpDetail = (data) => http.GET(`${config.baseUrl}/person/getProExpDetail`, data);
// 新增/更新项目经历
export const updateProExp = (data) => http.POST(`${config.baseUrl}/person/updateProExp`, data);
// 删除项目经历
export const deleteProExpById = (data) => http.GET(`${config.baseUrl}/person/deleteProExpById`, data);

// 查询教育经历列表
export const getEduExpList = (data) => http.GET(`${config.baseUrl}/person/getEduExpList`, data);
// 查询教育经历详情
export const getEduExpDetail = (data) => http.GET(`${config.baseUrl}/person/getEduExpDetail`, data);
// 新增/更新教育经历
export const updateEduExp = (data) => http.POST(`${config.baseUrl}/person/updateEduExp`, data);
// 删除教育经历
export const deleteEduExpById = (data) => http.GET(`${config.baseUrl}/person/deleteEduExpById`, data);

// 查询公司列表
export const getCompanyList = (data) => http.GET(`${config.baseUrl}/company/getCompanyList`, data);
// 新增/更新公司信息
export const updateCompany = (data) => http.POST(`${config.baseUrl}/company/updateCompany`, data);
// 查询公司信息
export const getCompanyDetail = (data) => http.GET(`${config.baseUrl}/company/getCompanyDetail`, data);
// 新增/更新职位信息
export const updatePosition = (data) => http.POST(`${config.baseUrl}/company/updatePosition`, data);
// 查询职位信息
export const getPositionDetail = (data) => http.GET(`${config.baseUrl}/company/getPositionDetail`, data);
// 查询公司职位列表
export const getCompanyPositionList = (data) => http.GET(`${config.baseUrl}/company/getCompanyPositionList`, data);
// 删除公司职位
export const deletePositionById = (data) => http.GET(`${config.baseUrl}/company/deletePositionById`, data);



// 用户登录
export const postLogin = (data) => http.POST(`${config.baseUrl}/ums/xcxUserLogin`, data);

// 获取短信验证码
export const getMsgCode = (data) => http.GET(`${config.baseUrl}/register/sendMsg`, data);

// 校验注册验证码
export const postRegCode = (data) => http.POST(`${config.baseUrl}/register/verifySMSCode`, data);

// 获取卡片信息
export const getCardBin = (data) => http.GET(`${config.baseUrl}/card/getCardBin`, data);

// 图片上传
export const upload = (data) => http.POST(`${config.baseUrl}/register/upImg`, data);

// 图片下载
export const downloadImg = (data) => http.GET(`${config.baseUrl}/my/downloadImg`, data);


// 查询轮播图
export const getBanners = (data) => http.GET(`${config.baseUrl}/cms/ad/list`, data);
// 关于我们
export const getAboutUs = (data) => http.GET(`${config.baseUrl}/cms/aboutUs/detail`, data);
// 联系我们
export const getContactUs = (data) => http.GET(`${config.baseUrl}/cms/contactUs/detail`, data);
// 平台说明内容
export const getHelpDetail = (data) => http.GET(`${config.baseUrl}/cms/help/detail`, data);
// 查询公告列表
export const getNoticeList = (data) => http.GET(`${config.baseUrl}/cms/notice/list`, data);
// 查询公告列表
export const getNoticeDetail = (data) => http.GET(`${config.baseUrl}/cms/notice/detail`, data);
// 添加意见反馈
export const getFeedbackAdd = (data) => http.GET(`${config.baseUrl}/cms/feedback/add`, data);
