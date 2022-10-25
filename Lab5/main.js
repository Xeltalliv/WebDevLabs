const id = id => document.getElementById(id);

id("swap_content").addEventListener("click", () => {
	const b3 = id("block_3");
	const b6 = id("block_6");
	const div = document.createElement("div");

	div.append(...b3.childNodes);
	b3.append(...b6.childNodes);
	b6.append(...div.childNodes);
});



const width = 5;
const height = 9;
id("block_5").append(
	document.createElement("br"),
	document.createTextNode("Ширина w = " + width),
	document.createElement("br"),
	document.createTextNode("Висота h = " + height),
	document.createElement("br"),
	document.createTextNode("Площа S = " + (width * height))
);



id("save_number").addEventListener("click", () => {
	const value = id("number_input").value;
	let maxNum = -1;
	for(let i=0; i<value.length; i++) {
		const num = Number(value[i]);
		if(!isNaN(num)) maxNum = Math.max(maxNum, num);
	}
	if(maxNum > -1) {
		alert("Найбільша цифра "+maxNum+".\nЗначення збережено в cookie.");
		document.cookie = "maxNum="+maxNum+";";
	} else {
		alert("Введене значення не має чисел");
	}
});
const allCookies = Object.fromEntries(document.cookie.split(";").map(keyVal => keyVal.split("=")));
if(allCookies.hasOwnProperty("maxNum")) {
	alert("Найбільша цифра "+allCookies.maxNum+".\nПри натисненні OK значення буде видалено з cookie.");
	document.cookie = "maxNum=0;expires=Thu, 01 Jan 1970 00:00:01 GMT";
	alert("Значення видалено з cookie.\nНатиснення OK перезавантажить сторінку.");
	location.reload();
}


	
function setAlign() {
	const align2 = document.querySelector('input[name="block_2_align"]:checked')?.value ?? "center";
	const align4 = document.querySelector('input[name="block_4_align"]:checked')?.value ?? "center";
	const align5 = document.querySelector('input[name="block_5_align"]:checked')?.value ?? "center";
	id("block_2").style["text-align"] = align2;
	id("block_4").style["text-align"] = align4;
	id("block_5").style["text-align"] = align5;
	localStorage.setItem("align2", align2);
	localStorage.setItem("align4", align4);
	localStorage.setItem("align5", align5);
};
function restoreFromLocalStorage() {
	const align2 = localStorage.getItem("align2") ?? "center";
	const align4 = localStorage.getItem("align4") ?? "center";
	const align5 = localStorage.getItem("align5") ?? "center";
	document.querySelector('input[name="block_2_align"][value="'+align2+'"]').checked = true;
	document.querySelector('input[name="block_4_align"][value="'+align4+'"]').checked = true;
	document.querySelector('input[name="block_5_align"][value="'+align5+'"]').checked = true;
}
id("block_2").addEventListener("mouseout", setAlign);
restoreFromLocalStorage();
setAlign();



const addListForm = id("block_add");
let currentNode = null;
let listCount = 0;
function genList(value) {
	let list = document.createElement("ol");
	value.split("\n").forEach(row => {
		let li = document.createElement("li");
		li.innerText = row;
		list.append(li);
	});
	return list;
}
document.addEventListener("selectionchange", (e) => {
	let node = window.getSelection().baseNode;
	if(!node) return;
	while(!(node === document.body || node.id?.startsWith("block_"))) {
		node = node.parentElement;
	}
	if(node === document.body) return;
	if(node.id === "block_add") return;
	if(node === currentNode) return;
	node.append(addListForm);
	currentNode = node;
});
id("cancel").addEventListener("click", () => {
	id("hide_block_add").append(addListForm);
	id("textarea").value = "";
	currentNode = null;
});
id("add").addEventListener("click", () => {
	const value = id("textarea").value;
	id("textarea").value = "";
	currentNode.insertBefore(genList(value), id("block_add"));

	localStorage.setItem("list"+listCount+"value", value);
	localStorage.setItem("list"+listCount+"id", currentNode.id);
	listCount++;
	localStorage.setItem("listCount", listCount);
});
const oldListCount = localStorage.getItem("listCount") ?? 0;
for(let i=0; i<oldListCount; i++) {
	id(localStorage.getItem("list"+i+"id")).append(genList(localStorage.getItem("list"+i+"value")));
	localStorage.removeItem("list"+i+"id");
	localStorage.removeItem("list"+i+"value");
}