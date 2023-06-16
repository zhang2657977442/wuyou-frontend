# 招聘小程序无忧直聘(前端)

:star:一款基于uni-app编写的招聘求职类前端，该前端包含了大部分核心页面和逻辑交互。前端分了两种角色：求职者和招聘者，通过角色切换可以进行页面和功能的切换。建议使用Hbuilder X打开，适合学习\二次开发等用途。

## 项目列表

+ [无忧直聘前端(Uni-app+Vue2)](https://github.com/zhang2657977442/wuyou-frontend)
+ [无忧直聘后端(Java+SpringBoot2+MybatisPlus+Mysql)](https://github.com/zhang2657977442/wuyou-backend)
+ [无忧直聘管理端(React+Ant Design+Ant Design Pro)](https://github.com/zhang2657977442/wuyou-admin)

## 功能模块

+ 职位发布
+ 简历创建
+ 公司创建
+ 即时通讯（利用[GoEasy](https://www.goeasy.io/cn/websocket.html)实现）
+ 地理位置（利用[腾讯位置服务](https://lbs.qq.com/)实现）
+ 角色切换
+ 收藏岗位
+ 收藏简历
+ 信息搜索
+ 系统通知
+ 谁看过我

## 项目截图

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F1.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F2.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F3.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F4.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F5.png)![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E6%88%AA%E5%B1%8F6.png)

## 运行步骤

+ 启动[无忧直聘后端服务](https://github.com/zhang2657977442/wuyou-backend)
+ 修改manifest.json文件中的AppID

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E4%BF%AE%E6%94%B9appid.png)
+  修改main.js文件中的GoEasy配置

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E4%BF%AE%E6%94%B9goeasy.png)
+ 修改pages/position/detail.vue文件中的腾讯位置服务配置

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/wuyou-frontend/%E4%BF%AE%E6%94%B9%E8%85%BE%E8%AE%AF%E4%BD%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1.png)



## 后续计划

由于时间原因，以下功能暂未实现：

+ 个人/公司实名认证
+ 简历附件
+ 智能客服
+ 屏蔽公司

欢迎各位developer二次开发~

## 开源不易 谢谢支持

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/other/%E8%B5%9E%E8%B5%8F%E7%A0%81.jpg)

如有问题请联系
+ QQ：2657977449 
+ 微信：zhang2657977449

