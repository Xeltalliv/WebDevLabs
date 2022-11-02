const id = id => document.getElementById(id);
const create = (type, classes = [], params = {}, children = []) => {
	const elem = document.createElement(type);
	for(let i in params) elem[i] = params[i];
	for(let i in classes) elem.classList.add(classes[i]);
	elem.append(...children);
	return elem;
};
	

id("add").addEventListener("click", () => {
	add("");
	save();
});


function add(text) {
	const input = create("input", ["notificationInput"], {"type": "text", "value": text});
	const up = create("button", ["notificationButton"]);
	const down = create("button", ["notificationButton"]);
	const del = create("button", ["notificationButton"]);
	const div = create("div", ["notification"], {}, [input, up, down, del]);
	up.innerText = "/\\";
	down.innerText = "\\/";
	del.innerText = "X";
	input.addEventListener("input", save);
	del.addEventListener("click", delRow);
	up.addEventListener("click", moveUp);
	down.addEventListener("click", moveDown);
	id("middleBottom").insertBefore(div, id("add"));
};

function delRow(event) {
	event.target.parentNode.remove();
	save();
}
function moveUp(event) {
	let notification = event.target.parentNode;
	notification.parentNode.insertBefore(notification, notification.previousSibling);
	save();
}
function moveDown(event) {
	let notification = event.target.parentNode;
	if(notification.nextSibling == id("add")) return;
	notification.parentNode.insertBefore(notification, notification.nextSibling.nextSibling);
	save();
}

let blocked = false;
let retry = false;

function save() {
	if(blocked) {
		id("status").innerText = "Очікування...";
		retry = true;
		return;
	}
	retry = false;
	blocked = true;
	send();
	setTimeout(() => {
		blocked = false;
		if(retry) save();
	}, 1000);
}

async function send() {
	let data = JSON.stringify(
		Array.from(
			id("middleBottom")
			.getElementsByClassName("notification")
		).map(
			notif => notif.children[0].value
		)
	);
	id("status").innerText = "Збереження...";
	try {
		if((await (await fetch("../api/save/", {
			"method": "PUT",
			"body": data,
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

async function load() {
	try {
		let response = await fetch("../api/load/")
		let json = await response.json();
		if(json.status === "ok") {
			json.values.forEach(value => add(value));
		} else {
			id("status").innerText = "Не вдалося загрузити дані з сервера. Неправильна відповідь сервера.";
		}
	} catch(e) {
		id("status").innerText = "Не вдалося загрузити дані з сервера. Перевірте підключення до інтернету";
	}
}

load();