const id = id => document.getElementById(id);
const create = (type, classes = [], params = {}, children = []) => {
	const elem = document.createElement(type);
	for(let i in params) elem[i] = params[i];
	for(let i in classes) elem.classList.add(classes[i]);
	elem.append(...children);
	return elem;
};

function add(text) {
	const span = create("span", ["notificationText"]);
	const del = create("button", ["notificationButtonInvisible"]);
	const div = create("div", ["notification"], {}, [span, del]);
	span.innerText = text;
	del.innerText = "✔";
	del.addEventListener("click", delRow);
	id("middleBottom").insertBefore(div, id("status"));
};

function delRow(event) {
	event.target.parentNode.classList.add("notificationHide");
	setTimeout(() => {
		event.target.parentNode.remove();
	}, 200);
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