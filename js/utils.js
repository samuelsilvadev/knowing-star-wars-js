
function addElement(element){
	var newElement = document.createElement(element);
	return newElement;
}

function addTextInElement(element, text){
	var newContent = document.createTextNode(text);
	element.appendChild(newContent);
	return element;
}

function log(mensagem){
	console.log(mensagem);
}