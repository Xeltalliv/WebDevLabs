let canvas;
let ctx;
let patterns = [];

function makeAnimField() {
	canvas = create("canvas");
	canvas.style.border = anim.borderRadius+"px solid "+anim.borderColor;
	canvas.width = size.width = innerWidth * anim.width;
	canvas.height = size.height = innerHeight * anim.height;
	ctx = canvas.getContext("2d");
	patterns = imgs.map(img => ctx.createPattern(img, "repeat"));
	work.append(canvas);
}

function draw() {
	ctx.fillStyle = patterns[0];
	ctx.fillRect(             0,               0, size.width/2, size.height/2);
	ctx.fillStyle = patterns[1];
	ctx.fillRect(size.width/2,               0, size.width/2, size.height/2);
	ctx.fillStyle = patterns[2];
	ctx.fillRect(             0, size.height/2, size.width/2, size.height/2);
	ctx.fillStyle = patterns[3];
	ctx.fillRect(size.width/2, size.height/2, size.width/2, size.height/2);
	ctx.fillStyle = anim.circleColor;
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, anim.circleRadius, 0, Math.PI*2);
	ctx.fill();
}

