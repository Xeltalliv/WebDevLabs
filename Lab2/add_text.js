Array.from(document.getElementsByName("add_text")).forEach(b => b.addEventListener("click", addText));

function addText(e) {
	let text = document.createElement("p");
	let a = "qwrtpsdfghjklzxcvbnm";
	let b = "eyuioa";
	let out = "";
	let words = 100 + Math.floor(Math.random() * 200);
	for(let i=0; i<words; i++) {
		let wordLength = 4 + Math.floor(Math.random() * 8);
		for(let j=0; j<wordLength; j++) {
			out += a[Math.floor(Math.random() * a.length)];
			if(Math.random() > 0.1) [a, b] = [b, a];
		}
		if(Math.random() > 0.95) out += ".";
		out += " ";
	}
	text.innerText = out;
	e.target.parentElement.insertBefore(text, e.target);
}