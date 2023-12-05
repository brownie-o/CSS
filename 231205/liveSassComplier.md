# settings.json 設定檔

左下角齒輪「設定」 > 右上角「開啟設定 (JSON)」

```json
	// Live Sass Compiler -------------------------------------------------------------------------------
	"liveSassCompile.settings.formats": [
		{
			"format": "expanded",
			"extensionName": ".css",
			"savePath": "~/../css"
		},
		{
			"format": "compressed",
			"extensionName": ".min.css",
			"savePath": "~/../dist"
		}
	],
	"liveSassCompile.settings.excludeList": ["/**/node_modules/**", "/.vscode/**"],
	"liveSassCompile.settings.generateMap": false,
	"liveSassCompile.settings.autoprefix": ["> 1%", "last 2 versions"],
```
