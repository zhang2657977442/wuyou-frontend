# bctos-rich-text 带视频解析的富文本展示

从富文本内容中解析出视频和其它内容，然后分别使用video和rich-text组件进行展示，视频还会在富文本中原来的位置中展示，不会打乱内容展示顺序，保证展示效果与后台编辑的一致.

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/df3588f1-bc52-42ed-9c25-87771d48cbe6.png)

### 后端编辑器说明

如果你使用uniCloud Admin框架或者其它uni-app开发的后台框架，建议使用插件库里的bctos-editor这个富文本编辑器，它是在tinymce的基础上增加了一个本地视频上传。

因为原生的tinymce编辑器只支持填入视频URL，但国内基本没有免费的视频上传后得到视频文件真实URL的平台，因此bctos-editor增加了上传视频文件功能，它是直接上传到uniCloud的免费云存储中，无后端开发之忧。

最主要的是bctos-rich-text能很好地解析bctos-editor编辑器保存的视频信息。

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

设置 `nodes` 属性后，组件会通过数据自动渲染出视频和其它图文内容，nodes参数目前只支持HTML String格式，暂不支持rich-text的Array 数组格式

```html
<template>
	<view>
		<bctos-rich-text :nodes="content"></bctos-rich-text>
	</view>
</template>

```

```javascript

export default {
	data() { 
		return {
			content: `<p>这里是内容段落一，下面放置了第一个视频</p><br>
			<p><video controls="controls">
			<source src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/d906ba15-9041-4137-bc3f-44a413c855e0.mp4" type="video/mp4" /></video></p><br>
			<p>这里是内容段落二，下面放置了第二个视频</p><br>
			<p><video controls="controls">
			<source src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/ae4a89d7-5c7e-48d2-b6f9-0da5c848bbda.mp4" type="video/mp4" /></video></p><br>
			<p>后面其它更多内容...</p>`,
		}
	}
}
```

### 设置视频宽度

默认情况下视频都会以100%的宽度显示在手机里，如果想自定义宽度，可以设置宽度width参数，如

```html
<bctos-rich-text :nodes="content" width="300px"></bctos-rich-text>
```

## API

### bctos-rich-text Props

| 属性名			| 类型		|可选值	| 默认值		| 说明		|
| :-:			| :-:		|:-:	|:-:		| :-:		|
|nodes			| String	|-		|-			| 富文本内容	|
|width			| String	|-		|100%		| 视频宽度	|

## 常见问题

视频在HTML的格式必须满足这样的格式：以`<video`开头，中间有`src`这个属性并且参数为视频文件的真实地址，结尾以`</video>`结束。

例如以下可以正确解析的几种格式：

```html
<video src="视频URL"></video>
<video controls="controls"><source src="视频URL" type="video/mp4" /></video>
```

不能正确解析的错误格式：

```html
<!--结尾没有以`</video>`结束-->
<video src="视频URL" />

<!--中间没有`src`属性-->
<video data-src="视频URL"></video>
```

## 更多帮助

如果还想扩展其它功能，欢迎联系定制开发：QQ: 203163051