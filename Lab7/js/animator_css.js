"use strict";

let animDiv;
let ctx;
let patterns = [];
let ball;

function makeAnimField() {
	animDiv = create("div");
	animDiv.style.position = "relative";
	animDiv.style.border = anim.borderRadius+"px solid "+anim.borderColor;
	size.width = innerWidth * anim.width;
	size.height = innerHeight * anim.height;
	animDiv.style.width = size.width + "px";
	animDiv.style.height = size.height + "px";

	let multipliers = [[0,0], [1,0], [0,1], [1,1]];
	for(let i=0; i<anim.textures.length; i++) {
		let bgDiv = create("div");
		bgDiv.style["background-image"] = "url("+anim.textures[i]+")";
		bgDiv.style["position"] = "absolute";
		bgDiv.style["left"] = (multipliers[i][0] * size.width / 2)+"px";
		bgDiv.style["top"] = (multipliers[i][1] * size.height / 2)+"px";
		bgDiv.style["width"] = (size.width / 2)+"px";
		bgDiv.style["height"] = (size.height / 2)+"px";
		animDiv.append(bgDiv);
	}

	ball = create("div");
	ball.style["position"] = "absolute";
	ball.style["width"] = (anim.circleRadius * 2) + "px";
	ball.style["height"] = (anim.circleRadius * 2) + "px";
	ball.style["border-radius"] = anim.circleRadius+"px";
	ball.style["background-color"] = anim.circleColor;
	ball.style["z-index"] = 10;
	animDiv.append(ball);

	work.append(animDiv);
}

function draw() {
	ball.style["left"] = (pos.x - anim.circleRadius)+"px";
	ball.style["top"] = (pos.y - anim.circleRadius)+"px";
}

