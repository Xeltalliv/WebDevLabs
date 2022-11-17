"use strict";

const id = (id) => document.getElementById(id);
const create = (type) => document.createElement(type);
let anim = {};
let work;
let imgs = [];
let pos = {x: 0, y: 0};
let vel = {x: 0, y: 0};
let acc = {x: 0, y: 0};
let dirIndex = 0;
let interval;
let start;
let startButtonReloads = false;
let eventCount = localStorage.getItem("eventCount") | 0;
let outputBlock;
let size = {width: 0, height: 0};
let playButton;

async function loadPage() {
	const res = await fetch("stored/settings.json");
	const json = await res.json();
	const content = json.content;
	for(let type in content) {
		let list = content[type];
		for(let i=0; i<list.length; i++) {
			id(type+(i+1)).innerHTML = list[i];
		}
	}
	anim = json.animation;

	playButton = create("button");
	playButton.innerText = anim.text.play;
	id("block"+anim.playBlock).append(create("br"), playButton);
	playButton.addEventListener("click", playButtonClicked);

	imgs = anim.textures.map(texture => {
		let i = new Image();
		i.src = texture;
		return i;
	});
}

function playButtonClicked() {
	writeEvent(anim.text.workShown);
	playButton.disabled = true;
	startButtonReloads = false;
	work = create("div");
	let controls = create("div");
	controls.style.height = anim.controlBarHeight+"px";
	start = create("button");
	start.innerText = anim.text.start;
	start.addEventListener("click", () => {
		if(startButtonReloads) {
			start.innerText = anim.text.start;
			pos = {x: size.width / 2, y: size.height / 2};
			draw();
			startButtonReloads = false;
			writeEvent(anim.text.animationReload);
		} else {
			start.disabled = true;
			dirIndex = 0;
			interval = setInterval(tick, 1000 / anim.fps);
			writeEvent(anim.text.animationStart);
		}
	});
	let close = create("button");
	close.innerText = anim.text.close;
	close.addEventListener("click", () => {
		if(interval) {
			clearInterval(interval);
			interval = null;
		}
		writeEvent(anim.text.workHidden);
		work.remove();
		playButton.disabled = false;
		outputEvents();
	});
	controls.append(start, close);
	work.append(controls);
	makeAnimField();
	id("block"+anim.animationBlock).append(work);
	pos = {x: size.width / 2, y: size.height / 2};
	vel = {x: 0, y: 0};
	acc = {x: 1, y: 0};
	draw();
}

function tick() {
	pos.x += vel.x;
	pos.y += vel.y;
	let radius = anim.circleRadius;
	let next = false;
	if(pos.x + radius > size.width) {
		pos.x = size.width - radius;
		vel.x = 0;
		next = true;
	}
	if(pos.x - radius < 0) {
		pos.x = radius;
		vel.x = 0;
		next = true;
	}
	if(pos.y + radius > size.height) {
		pos.y = size.height - radius;
		vel.y = 0;
		next = true;
	}
	if(pos.y - radius < 0) {
		pos.y = radius;
		vel.y = 0;
		next = true;
	}
	if(next) {
		dirIndex++;
		if(anim.dirs[dirIndex] === "stop") {
			clearInterval(interval);
			interval = null;
			start.disabled = false;
			start.innerText = anim.text.reload;
			startButtonReloads = true;
		} else {
			acc = anim.dirs[dirIndex];
		}
	}
	vel.x += acc.x;
	vel.y += acc.y;
	draw();
}

function writeEvent(text) {
	localStorage.setItem("eventTime"+eventCount, Date.now());
	localStorage.setItem("eventText"+eventCount, text);
	localStorage.setItem("eventCount", ++eventCount);
}

function outputEvents() {
	if(outputBlock) outputBlock.remove();
	outputBlock = create("div");
	id("block"+anim.logBlock).append(outputBlock);
	for(let i=0; i<eventCount; i++) {
		let time = new Date(+localStorage.getItem("eventTime"+i));
		let timeSpan = create("span");
		timeSpan.innerText = "["+time.toLocaleTimeString()+"]";
		timeSpan.title = time.toString();
		timeSpan.style["font-weight"] = "bold";
		timeSpan.style["color"] = "#441111";
		let textSpan = create("span");
		textSpan.innerText = localStorage.getItem("eventText"+i);
		outputBlock.append(create("br"), timeSpan, textSpan);
	}
	let eraseButton = create("button");
	eraseButton.innerText = anim.text.erase;
	eraseButton.addEventListener("click", removeEvents);
	outputBlock.append(create("br"), eraseButton);
}

function removeEvents() {
	if(outputBlock) outputBlock.remove();
	outputBlock = null;
	localStorage.removeItem("eventCount");
	for(let i=0; i<eventCount; i++) {
		localStorage.removeItem("eventTime"+i);
		localStorage.removeItem("eventText"+i);
	}
	eventCount = 0;
}


window.addEventListener("load", loadPage);