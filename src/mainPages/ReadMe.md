# MainPages
该文件夹存放各小程序主页面, 无法直接使用，需放到主应用中, 并且修改pages.json文件

## 商城小程序
- [首页](./ShopPages/home)
- [购物车](./ShopPages/cart)
- [我的](./ShopPages/user)

```json
{
				"pagePath": "pages/home/index",
				"text": " ",
				"iconPath": "static/images/tabbar/like-f.png",
				"selectedIconPath": "static/images/tabbar/like-o.png"
			},
			{
				"pagePath": "pages/cart/index",
				"text": " ",
				"iconPath": "static/images/tabbar/cart-f.png",
				"selectedIconPath": "static/images/tabbar/cart-o.png"
			},
			{
				"pagePath": "pages/user/index",
				"text": " ",
				"iconPath": "static/images/tabbar/user-f.png",
				"selectedIconPath": "static/images/tabbar/user-o.png"
			}
```

```json
"pages": [
		{
			"path": "pages/login/index",
			"style": {
				"navigationBarTitleText": "登录"
			}
		},
		{
			"path": "pages/cart/index",
			"style": {
				"navigationBarTitleText": "购物车",
				"enablePullDownRefresh": false
			}
		},
		{
			"path": "pages/home/index",
			"style": {
				"navigationBarTitleText": "首页",
				"enablePullDownRefresh": false
			}
		},
		{
			"path": "pages/user/index",
			"style": {
				"navigationBarTitleText": "我的",
				"enablePullDownRefresh": false
			}
		}
	],
```

```json
"preloadRule": { 
		"pages/login/index": { 
			"network": "all",
			"packages": [
				"defaultPackages",
				"shopPackages"
			]
		}
	},
```
