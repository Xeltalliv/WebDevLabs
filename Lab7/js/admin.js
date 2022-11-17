"use strict";

const id = (id) => document.getElementById(id);
const create = (type) => document.createElement(type);
const elem = (id) => new TemplateElement(id);
let json;

class TemplateElement {
	constructor(id) {
		this.id = id;
	}
}

async function load() {
	try {
		let response = await fetch("stored/settings.json")
		json = await response.json();
		traverseObject(template, json, "loading");
	} catch(e) {
		id("status").innerText = "Не вдалося загрузити дані з сервера. Перевірте підключення до інтернету";
	}
}
async function save() {
	try {
		traverseObject(template, json, "saving");
	} catch(e) {
		id("status").innerText = "Не вдалося зберегти. Щось пішло не так ще до відправки";
	}
	try {
		if((await (await fetch("stored/settings.json", {
			"method": "PUT",
			"body": JSON.stringify(json, null, "\t"),
			"headers": {
				"Content-Type": "application/json"
			}
		})).json()).status === "ok") {
			id("status").innerText = "Зміни збережено";
			return;
		} else {
			id("status").innerText = "Не вдалося зберегти. Неправильна відповідь сервера.";
		}
	} catch(e) {
		id("status").innerText = "Не вдалося зберегти. Перевірте підключення до інтернету";
	}
}




function traverseObject(template, object, mode) {
	for(let key in object) {
		let writeOutput = traverseValue(template[key], object[key], mode);
		if(writeOutput !== undefined) object[key] = writeOutput;
	}
}
function traverseArray(template, array, mode) {
	for(let i=0; i<array.length; i++) {
		let writeOutput = traverseValue(template[i], array[i], mode);
		if(writeOutput !== undefined) array[i] = writeOutput;
	}
}
function traverseValue(tvalue, value, mode) {
	if(tvalue instanceof TemplateElement) {
		let elementWithCorrectId = id(tvalue.id);
		if(elementWithCorrectId) {
			if(mode === "loading") elementWithCorrectId.value = value;
			if(mode === "saving") return elementWithCorrectId.value;
		} else {
			console.warn("Element with id "+tvalue.id+" wasn't found!");
		}
	} else if(Array.isArray(tvalue)) {
		traverseArray(tvalue, value, mode);
	} else if(typeof tvalue === "object") {
		traverseObject(tvalue, value, mode);
	}
}

window.addEventListener("load", load);
id("cancel").addEventListener("click", load);
id("save").addEventListener("click", save);