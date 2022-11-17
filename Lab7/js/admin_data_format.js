let template = {
	"content": {
		"title": [elem("title1"), elem("title2")],
		"block": [elem("block1"), elem("block2"), elem("block3"), elem("block4"), elem("block5"), elem("block6"), elem("block7")]
	},
	"animation": {
		"animationBlock": elem("animationBlock"),
		"playBlock": elem("playBlock"),
		"logBlock": elem("logBlock"),
		"width": elem("width"),
		"height": elem("height"),
		"text": {
			"play": elem("play"),
			"start": elem("start"),
			"close": elem("close"),
			"reload": elem("reload"),
			"erase": elem("erase"),
			"workShown": elem("workShown"),
			"workHidden": elem("workHidden"),
			"animationStart": elem("animationStarted"),
			"animationReload": elem("animationReloaded")
		},
		"textures": [
			elem("texture1"),
			elem("texture2"),
			elem("texture3"),
			elem("texture4")
		],
		"fps": elem("framerate"),
		"circleColor": elem("circleColor"),
		"circleRadius": elem("circleRadius"),
		"borderColor": elem("borderColor"),
		"borderRadius": elem("borderRadius"),
		"controlBarHeight": elem("controlBarHeight"),
		"dirs": [
			{"x":  1, "y":  0},
			{"x":  0, "y": -1},
			{"x": -1, "y":  0},
			{"x":  0, "y":  1},
			{"x":  1, "y":  0},
			"stop"
		]
	}
}