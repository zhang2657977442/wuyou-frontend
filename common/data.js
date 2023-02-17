// 数据格式,数据中只需要包含以下字段和数据格式,开发者可以添加字段,比如id等等,不影响组件显示,
// 组件的返回结果是有菜单数组下标形式返回,
// 如果传入数据中有value,也会返回value,开发者可根据返回的下标获取所选中的菜单
/*
[
	{
		"name":"",	//字符串类型 选填项 菜单名称,如不填,则取第一个子菜单的name值,filter和radio类型则将设置为"筛选"
		"type":""	//字符串类型 必填项 可取值 hierarchy/filter/radio  hierarchy单/多层级菜单(最多三级); filter筛选多选菜单; radio筛选单选菜单
		"submenu":[	//对象数组类型 必填项 子菜单数据
			{
				"name":"",	//字符串类型 必填项 菜单名称
				"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null,filter类型此字段无效果
				"submenu":[	//对象数组类型 必填项 子菜单数据
					{
						"name":"",	//字符串类型 必填项 菜单名称
						"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
						"submenu":[	//对象数组类型 必填项 子菜单数据 filter类型无效 
							{
								"name":"",	//字符串类型 必填项 菜单名称 hierarchy类型层级最多到此
								"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
							}
						]
					}
				]
			}
		]
	}
]
*/

//0.0.4版本起 返回结果将有两部分组成:
/*
{
	index:[],	//旧版本的下标数组形式
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中,我故意把value设置成跟name一样,只是为了方便演示,使示例更加易懂,实际使用时候value应该是一个标识,给后台识别所用的.
// 数据较长，请仔细查看。
export default [
	{
		"name":'职位筛选',
		"type": 'hierarchy',
		"submenu": [
			{
				"name": '休闲娱乐',
				"value": "休闲娱乐",
				"submenu": [{
						"name": "足疗按摩",
						"value": "足疗按摩",
						"submenu": [{
							"name": "按摩推拿",
							"value": "按摩推拿"
						}, {
							"name": "足浴足疗",
							"value": "足浴足疗"
						}, {
							"name": "中医养生",
							"value": "中医养生"
						}]
					}
				]
			}
		]
	},
	{
		"name":'行业筛选',
		"type": 'hierarchy',
		"submenu": [
			{
				"name": '休闲娱乐',
				"value": "休闲娱乐",
				"submenu": [{
						"name": "足疗按摩",
						"value": "足疗按摩",
						"submenu": [{
							"name": "按摩推拿",
							"value": "按摩推拿"
						}, {
							"name": "足浴足疗",
							"value": "足浴足疗"
						}, {
							"name": "中医养生",
							"value": "中医养生"
						}]
					}
				]
			}
		]
	},
	{
		"name":'薪资范围',
		"type": 'hierarchy',
		"submenu": [
			{
				"name": "全部分类",
				"value": "全部分类"
			},
			{
				"name": "面议",
				"value": "面议"
			},
			{
				"name": "1-3K",
				"value": "1-3K"
			},
			{
				"name": "3-5K",
				"value": "3-5K"
			},
			{
				"name": "5-8K",
				"value": "5-8K"
			},
			{
				"name": "8-12K",
				"value": "8-12K"
			},
			{
				"name": "12-15K",
				"value": "12-15K"
			},
			{
				"name": "15-20K",
				"value": "15-20K"
			},
			{
				"name": "20K以上",
				"value": "20K以上"
			}
		]
	},
	{
		"name":'经验要求',
		"type": 'hierarchy',
		"submenu": [
			{
				"name": "全部分类",
				"value": "全部分类"
			},
			{
				"name": "不限",
				"value": "不限"
			},
			{
				"name": "1年以内",
				"value": "1年以内"
			},
			{
				"name": "1-3年",
				"value": "1-3年"
			},
			{
				"name": "3-5年",
				"value": "3-5年"
			},
			{
				"name": "5-10年",
				"value": "5-10年"
			},
			{
				"name": "10年以上",
				"value": "10年以上"
			}
		]
	},
]

