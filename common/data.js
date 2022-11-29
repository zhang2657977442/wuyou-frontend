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
export default [{
		"name":'职位筛选',
		"type": 'hierarchy',
		"submenu": [{
				"name": '全部分类',
				"value": "全部分类",
				"submenu": [{
					"name": "全部分类",
					"value": "全部分类"
				}, ]
			},
			{
				"name": '美食',
				"value": "美食",
				"submenu": [{
						"name": "全部美食",
						"value": "全部美食"
					},
					{
						"name": "快餐小吃",
						"value": "快餐小吃",
						"submenu": [{
							"name": "中式快餐",
							"value": "中式快餐"
						}, {
							"name": "西式快餐",
							"value": "西式快餐"
						}, {
							"name": "熟食",
							"value": "熟食"
						}, {
							"name": "面馆面食",
							"value": "面馆面食"
						}, {
							"name": "地方小吃",
							"value": "地方小吃"
						}, {
							"name": "米粉米线",
							"value": "米粉米线"
						}, {
							"name": "粥",
							"value": "v"
						}, {
							"name": "汤",
							"value": "汤"
						}, {
							"name": "麻辣烫",
							"value": "麻辣烫"
						}, {
							"name": "素食轻餐",
							"value": "素食轻餐"
						}]
					},
					{
						"name": "休闲茶饮",
						"value": "休闲茶饮",
						"submenu": [{
							"name": "奶茶",
							"value": "奶茶"
						}, {
							"name": "果汁饮品",
							"value": "果汁饮品"
						}, {
							"name": "咖啡",
							"value": "咖啡"
						}, {
							"name": "酒吧",
							"value": "酒吧"
						}, {
							"name": "茶馆",
							"value": "茶馆"
						}]
					},
					{
						"name": "面包甜点",
						"value": "面包甜点",
						"submenu": [{
							"name": "面包蛋糕",
							"value": "面包蛋糕"
						}, {
							"name": "甜点",
							"value": "甜点"
						}, {
							"name": "冰淇淋",
							"value": "冰淇淋"
						}, {
							"name": "中式点心",
							"value": "中式点心"
						}]
					},
					{
						"name": "中餐地方菜",
						"value": "中餐地方菜",
						"submenu": [{
							"name": "粤菜",
							"value": "粤菜"
						}, {
							"name": "茶餐厅",
							"value": "茶餐厅"
						}, {
							"name": "川菜",
							"value": "川菜"
						}, {
							"name": "西北菜",
							"value": "西北菜"
						}, {
							"name": "湘菜",
							"value": "湘菜"
						}, {
							"name": "江浙菜",
							"value": "江浙菜"
						}, {
							"name": "海鲜河鲜",
							"value": "海鲜河鲜"
						}, {
							"name": "北京菜",
							"value": "北京菜"
						}, {
							"name": "东北菜",
							"value": "东北菜"
						}, {
							"name": "台湾菜",
							"value": "台湾菜"
						}, {
							"name": "创意菜",
							"value": "创意菜"
						}, {
							"name": "湖北菜",
							"value": "湖北菜"
						}, {
							"name": "鲁菜",
							"value": "鲁菜"
						}, {
							"name": "云南菜",
							"value": "云南菜"
						}, {
							"name": "海南菜",
							"value": "海南菜"
						}, {
							"name": "贵州菜",
							"value": "贵州菜"
						}, {
							"name": "农家乐",
							"value": "农家乐"
						}, {
							"name": "闽菜",
							"value": "闽菜"
						}, {
							"name": "清真菜",
							"value": "清真菜"
						}, {
							"name": "徽菜",
							"value": "徽菜"
						}, {
							"name": "豫菜",
							"value": "豫菜"
						}]
					},
					{
						"name": "异域料理",
						"value": "异域料理",
						"submenu": [{
							"name": "西餐",
							"value": "西餐"
						}, {
							"name": "日本料理",
							"value": "日本料理"
						}, {
							"name": "东南亚菜",
							"value": "东南亚菜"
						}, {
							"name": "泰国菜",
							"value": "泰国菜"
						}, {
							"name": "印度菜",
							"value": "印度菜"
						}]
					},
					{
						"name": "火锅",
						"value": "火锅",
						"submenu": [{
							"name": "川味火锅",
							"value": "川味火锅"
						}, {
							"name": "牛肉火锅",
							"value": "牛肉火锅"
						}, {
							"name": "港式火锅",
							"value": "港式火锅"
						}, {
							"name": "豆捞小火锅",
							"value": "豆捞小火锅"
						}, {
							"name": "鱼火锅",
							"value": "鱼火锅"
						}, {
							"name": "炭火锅",
							"value": "炭火锅"
						}, {
							"name": "羊蝎子",
							"value": "羊蝎子"
						}, {
							"name": "云南火锅",
							"value": "云南火锅"
						}]
					},
					{
						"name": "生鲜水果",
						"value": "生鲜水果"
					},
					{
						"name": "烧烤/香锅",
						"value": "烧烤/香锅",
						"submenu": [{
							"name": "中式烧烤",
							"value": "中式烧烤"
						}, {
							"name": "麻辣香锅",
							"value": "麻辣香锅"
						}, {
							"name": "烤鱼",
							"value": "烤鱼"
						}, {
							"name": "韩式烧烤",
							"value": "韩式烧烤"
						}, {
							"name": "日式烧烤",
							"value": "日式烧烤"
						}, {
							"name": "拉美烧烤",
							"value": "拉美烧烤"
						}, {
							"name": "铁板烧",
							"value": "铁板烧"
						}]
					},
					{
						"name": "自助餐",
						"value": "自助餐"
					},
					{
						"name": "其他美食",
						"value": "其他美食"
					}
				]
			},
			{
				"name": '超市',
				"value": "超市",
				"submenu": [{
						"name": "全部超市",
						"value": "全部超市"
					},
					{
						"name": "超市便利店",
						"value": "超市便利店"
					},
					{
						"name": "母婴用品",
						"value": "母婴用品"
					},
					{
						"name": "综合特产",
						"value": "综合特产"
					},
					{
						"name": "个人护理",
						"value": "个人护理"
					}
				]
			},
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
					},
					{
						"name": "游戏玩乐",
						"value": "游戏玩乐",
						"submenu": [{
							"name": "团建拓展",
							"value": "团建拓展"
						}, {
							"name": "网吧网咖",
							"value": "网吧网咖"
						}, {
							"name": "游戏电玩",
							"value": "游戏电玩"
						}, {
							"name": "游乐园",
							"value": "游乐园"
						}, {
							"name": "密室逃脱",
							"value": "密室逃脱"
						}]
					},
					{
						"name": "洗浴汗蒸",
						"value": "洗浴汗蒸",
						"submenu": [{
							"name": "汗蒸",
							"value": "汗蒸"
						}, {
							"name": "浴场浴室",
							"value": "浴场浴室"
						}, {
							"name": "水疗",
							"value": "水疗"
						}, {
							"name": "温泉",
							"value": "温泉"
						}]
					},
					{
						"name": "酒吧",
						"value": "酒吧"
					},
					{
						"name": "亲子游乐",
						"value": "亲子游乐"
					},
					{
						"name": "展览场馆",
						"value": "展览场馆",
						"submenu": [{
							"name": "图书馆",
							"value": "图书馆"
						}, {
							"name": "博物馆",
							"value": "博物馆"
						}, {
							"name": "美术馆",
							"value": "美术馆"
						}]
					},
					{
						"name": "植物园",
						"value": "植物园"
					},
					{
						"name": "农家乐",
						"value": "农家乐"
					},
					{
						"name": "茶馆",
						"value": "茶馆"
					}
				]
			},
			{
				"name": '丽人',
				"value": "丽人",
				"submenu": [{
						"name": "全部丽人",
						"value": "全部丽人"
					},
					{
						"name": "美发",
						"value": "美发"
					},
					{
						"name": "SPA/美容",
						"value": "SPA/美容"
					},
					{
						"name": "美甲/美睫",
						"value": "美甲/美睫"
					},
					{
						"name": "瘦身",
						"value": "瘦身"
					},
					{
						"name": "彩妆造型",
						"value": "彩妆造型"
					}
				]
			},
			{
				"name": 'K歌',
				"value": "K歌",
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
					},
					{
						"name": "游戏玩乐",
						"value": "游戏玩乐",
						"submenu": [{
							"name": "团建拓展",
							"value": "团建拓展"
						}, {
							"name": "网吧网咖",
							"value": "网吧网咖"
						}, {
							"name": "游戏电玩",
							"value": "游戏电玩"
						}, {
							"name": "游乐园",
							"value": "游乐园"
						}, {
							"name": "密室逃脱",
							"value": "密室逃脱"
						}]
					},
					{
						"name": "洗浴汗蒸",
						"value": "洗浴汗蒸",
						"submenu": [{
							"name": "汗蒸",
							"value": "汗蒸"
						}, {
							"name": "浴场浴室",
							"value": "浴场浴室"
						}, {
							"name": "水疗",
							"value": "水疗"
						}, {
							"name": "温泉",
							"value": "温泉"
						}]
					},
					{
						"name": "酒吧",
						"value": "酒吧"
					},
					{
						"name": "亲子游乐",
						"value": "亲子游乐"
					},
					{
						"name": "展览场馆",
						"value": "展览场馆",
						"submenu": [{
							"name": "图书馆",
							"value": "图书馆"
						}, {
							"name": "博物馆",
							"value": "博物馆"
						}, {
							"name": "美术馆",
							"value": "美术馆"
						}]
					},
					{
						"name": "植物园",
						"value": "植物园"
					},
					{
						"name": "农家乐",
						"value": "农家乐"
					},
					{
						"name": "茶馆",
						"value": "茶馆"
					}
				]
			},
			{
				"name": '结婚',
				"value": "结婚",
				"submenu": [{
						"name": "全部结婚",
						"value": "全部结婚"
					},
					{
						"name": "婚纱摄影",
						"value": "婚纱摄影"
					},
					{
						"name": "全球旅拍",
						"value": "全球旅拍"
					},
					{
						"name": "婚戒首饰",
						"value": "婚戒首饰"
					},
					{
						"name": "婚宴酒店",
						"value": "婚宴酒店"
					},
					{
						"name": "婚纱礼服",
						"value": "婚纱礼服"
					},
					{
						"name": "婚礼策划",
						"value": "婚礼策划"
					}
				]
			},
			{
				"name": '健身运动',
				"value": "健身运动",
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
					},
					{
						"name": "游戏玩乐",
						"value": "游戏玩乐",
						"submenu": [{
							"name": "团建拓展",
							"value": "团建拓展"
						}, {
							"name": "网吧网咖",
							"value": "网吧网咖"
						}, {
							"name": "游戏电玩",
							"value": "游戏电玩"
						}, {
							"name": "游乐园",
							"value": "游乐园"
						}, {
							"name": "密室逃脱",
							"value": "密室逃脱"
						}]
					},
					{
						"name": "洗浴汗蒸",
						"value": "洗浴汗蒸",
						"submenu": [{
							"name": "汗蒸",
							"value": "汗蒸"
						}, {
							"name": "浴场浴室",
							"value": "浴场浴室"
						}, {
							"name": "水疗",
							"value": "水疗"
						}, {
							"name": "温泉",
							"value": "温泉"
						}]
					},
					{
						"name": "酒吧",
						"value": "酒吧"
					},
					{
						"name": "亲子游乐",
						"value": "亲子游乐"
					},
					{
						"name": "展览场馆",
						"value": "展览场馆",
						"submenu": [{
							"name": "图书馆",
							"value": "图书馆"
						}, {
							"name": "博物馆",
							"value": "博物馆"
						}, {
							"name": "美术馆",
							"value": "美术馆"
						}]
					},
					{
						"name": "植物园",
						"value": "植物园"
					},
					{
						"name": "农家乐",
						"value": "农家乐"
					},
					{
						"name": "茶馆",
						"value": "茶馆"
					}
				]
			},
			{
				"name": '摄影',
				"value": "摄影",
				"submenu": [{
						"name": "全部超市",
						"value": "全部超市"
					},
					{
						"name": "超市便利店",
						"value": "超市便利店"
					},
					{
						"name": "母婴用品",
						"value": "母婴用品"
					},
					{
						"name": "综合特产",
						"value": "综合特产"
					},
					{
						"name": "个人护理",
						"value": "个人护理"
						
					}
				]
			},
			{
				"name": '宠物',
				"value": "宠物",
				"submenu": [{
						"name": "全部丽人",
						"value": "全部丽人"
					},
					{
						"name": "美发",
						"value": "美发"
					},
					{
						"name": "SPA/美容",
						"value": "SPA/美容"
					},
					{
						"name": "美甲/美睫",
						"value": "美甲/美睫"
					},
					{
						"name": "瘦身",
						"value": "瘦身"
					},
					{
						"name": "彩妆造型",
						"value": "彩妆造型"
					}
				]
			},
			{
				"name": '电影',
				"value": "电影",
				"submenu": [{
						"name": "全部结婚",
						"value": "全部结婚"
					},
					{
						"name": "婚纱摄影",
						"value": "婚纱摄影"
					},
					{
						"name": "全球旅拍",
						"value": "全球旅拍"
					},
					{
						"name": "婚戒首饰",
						"value": "婚戒首饰"
					},
					{
						"name": "婚宴酒店",
						"value": "婚宴酒店"
					},
					{
						"name": "婚纱礼服",
						"value": "婚纱礼服"
					},
					{
						"name": "婚礼策划",
						"value": "婚礼策划"
					}
				]
			},
		]
	},
	{
		name:'行业筛选',
		"type": 'hierarchy',
		"submenu": [{
				"name": '附近',
				"value": "附近",
				"submenu": [

				]
			},
			{
				"name": '热门商圈',
				"value": "热门商圈",
				"submenu": [{
						"name": "全部商圈",
						"value": "全部商圈"
					},
					{
						"name": "燕岭/五山",
						"value": "燕岭/五山"
					},
					{
						"name": "天河城/体育中心",
						"value": "天河城/体育中心"
					},
					{
						"name": "石牌/龙口",
						"value": "石牌/龙口"
					},
					{
						"name": "天河北",
						"value": "天河北"
					},
					{
						"name": "珠江新城",
						"value": "珠江新城"
					},
					{
						"name": "时尚天河",
						"value": "时尚天河"
					},
					{
						"name": "高德置地",
						"value": "高德置地"
					},
					{
						"name": "跑马场",
						"value": "跑马场"
					},
					{
						"name": "天河公园",
						"value": "天河公园"
					},
					{
						"name": "嘉裕太阳城",
						"value": "嘉裕太阳城"
					},
					{
						"name": "五羊新城",
						"value": "五羊新城"
					},
					{
						"name": "北京路",
						"value": "北京路"
					},
					{
						"name": "上下九",
						"value": "上下九"
					},
					{
						"name": "万达广场",
						"value": "万达广场"
					}
				]
			},
			{
				"name": '天河区',
				"value": "天河区",
				"submenu": [{
						"name": "全部",
						"value": "全部"
					},
					{
						"name": "燕岭/五山",
						"value": "燕岭/五山"
					},
					{
						"name": "天河城/体育中心",
						"value": "天河城/体育中心"
					},
					{
						"name": "石牌/龙口",
						"value": "石牌/龙口"
					},
					{
						"name": "天河北",
						"value": "天河北"
					},
					{
						"name": "珠江新城",
						"value": "珠江新城"
					},
					{
						"name": "时尚天河",
						"value": "时尚天河"
					},
					{
						"name": "高德置地",
						"value": "高德置地"
					},
					{
						"name": "跑马场",
						"value": "跑马场"
					},
					{
						"name": "天河公园",
						"value": "天河公园"
					},
					{
						"name": "东圃",
						"value": "东圃"
					},
					{
						"name": "林和村",
						"value": "林和村"
					},
					{
						"name": "车陂",
						"value": "车陂"
					},
					{
						"name": "猎德社区",
						"value": "猎德社区"
					},
					{
						"name": "前进",
						"value": "前进"
					}
				]
			},
			{
				"name": '荔湾区',
				"value": "荔湾区",
				"submenu": [{
						"name": "全部",
						"value": "全部"
					},
					{
						"name": "西城都荟",
						"value": "西城都荟"
					},
					{
						"name": "多宝",
						"value": "多宝"
					},
					{
						"name": "陈家祠",
						"value": "陈家祠"
					},
					{
						"name": "华林",
						"value": "华林"
					},
					{
						"name": "西关",
						"value": "西关"
					},
					{
						"name": "花地湾",
						"value": "花地湾"
					},
					{
						"name": "金花",
						"value": "金花"
					},
					{
						"name": "康王路",
						"value": "康王路"
					},
					{
						"name": "上下九",
						"value": "上下九"
					}
				]
			},
			{
				"name": '越秀区',
				"value": "越秀区",
				"submenu": [{
						"name": "全部",
						"value": "全部"
					},
					{
						"name": "五羊新城",
						"value": "五羊新城"
					},
					{
						"name": "北京路",
						"value": "北京路"
					},
					{
						"name": "华乐",
						"value": "华乐"
					},
					{
						"name": "西门口",
						"value": "西门口"
					},
					{
						"name": "建设",
						"value": "建设"
					},
					{
						"name": "海珠广场",
						"value": "海珠广场"
					},
					{
						"name": "东山口",
						"value": "东山口"
					},
					{
						"name": "越秀公园",
						"value": "越秀公园"
					},
					{
						"name": "淘金",
						"value": "淘金"
					},
					{
						"name": "环市中",
						"value": "环市中"
					},
					{
						"name": "东风东",
						"value": "东风东"
					},
					{
						"name": "解放北",
						"value": "解放北"
					},
					{
						"name": "东湖",
						"value": "东湖"
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
				"name": "智能排序",
				"value": "智能排序"
			},
			{
				"name": "离我最近",
				"value": "离我最近"
			},
			{
				"name": "人均从高到低",
				"value": "人均从高到低"
			},
			{
				"name": "人均从低到高",
				"value": "人均从低到高"
			},
			{
				"name": "智能排序",
				"value": "智能排序"
			},
			{
				"name": "离我最近",
				"value": "离我最近"
			},
			{
				"name": "人均从高到低",
				"value": "人均从高到低"
			},
			{
				"name": "人均从低到高",
				"value": "人均从低到高"
			},
			{
				"name": "智能排序",
				"value": "智能排序"
			},
			{
				"name": "离我最近",
				"value": "离我最近"
			},
			{
				"name": "人均从高到低",
				"value": "人均从高到低"
			},
			{
				"name": "人均从低到高",
				"value": "人均从低到高"
			}
		]
	},
	{
		name:'福利待遇',
		"type": 'filter',
		"submenu": [{
				"name": "优惠",
				"submenu": [{
						"name": "满减活动",
						"value": "满减活动"
					},
					{
						"name": "打折优惠",
						"value": "打折优惠"
					},
					{
						"name": "会员专享",
						"value": "会员专享"
					}
				]
			},
			{
				"name": "服务",
				"submenu": [{
						"name": "预定",
						"value": "预定"
					},
					{
						"name": "点餐",
						"value": "点餐"
					},
					{
						"name": "外卖",
						"value": "外卖"
					},
					{
						"name": "WIFI",
						"value": "WIFI"
					},
					{
						"name": "停车位",
						"value": "停车位"
					},
					{
						"name": "无烟区",
						"value": "无烟区"
					},
					{
						"name": "包厢",
						"value": "包厢"
					},
					{
						"name": "营业中",
						"value": "营业中"
					}
				]
			},
			{
				"name": "价格",
				"submenu": [{
						"name": "50以下",
						"value": "50以下"
					},
					{
						"name": "50-100",
						"value": "50-100"
					},
					{
						"name": "100-300",
						"value": "100-300"
					},
					{
						"name": "300以上",
						"value": "300以上"
					}
				]
			}
		]
	},
	// {
	// 	"name":'福利待遇',
	// 	"type": 'radio',
	// 	"submenu": [{
	// 			"name": "优惠(单选)",
	// 			"submenu": [{
	// 					"name": "满减活动",
	// 					"value": "满减活动"
	// 				},
	// 				{
	// 					"name": "打折优惠",
	// 					"value": "打折优惠"
	// 				},
	// 				{
	// 					"name": "会员专享",
	// 					"value": "会员专享"
	// 				}
	// 			]
	// 		},
	// 		{
	// 			"name": "服务(单选)",
	// 			"submenu": [{
	// 					"name": "预定",
	// 					"value": "预定"
	// 				},
	// 				{
	// 					"name": "点餐",
	// 					"value": "点餐"
	// 				},
	// 				{
	// 					"name": "外卖",
	// 					"value": "外卖"
	// 				},
	// 				{
	// 					"name": "WIFI",
	// 					"value": "WIFI"
	// 				},
	// 				{
	// 					"name": "停车位",
	// 					"value": "停车位"
	// 				},
	// 				{
	// 					"name": "无烟区",
	// 					"value": "无烟区"
	// 				},
	// 				{
	// 					"name": "包厢",
	// 					"value": "包厢"
	// 				},
	// 				{
	// 					"name": "营业中",
	// 					"value": "营业中"
	// 				}
	// 			]
	// 		},
	// 		{
	// 			"name": "价格(单选)",
	// 			"submenu": [{
	// 					"name": "50以下",
	// 					"value": "50以下"
	// 				},
	// 				{
	// 					"name": "50-100",
	// 					"value": "50-100"
	// 				},
	// 				{
	// 					"name": "100-300",
	// 					"value": "100-300"
	// 				},
	// 				{
	// 					"name": "300以上",
	// 					"value": "300以上"
	// 				}
	// 			]
	// 		}
	// 	]
	// }
]

