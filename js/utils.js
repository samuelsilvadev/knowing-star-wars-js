'use strict';

function addElement(element){
	return document.createElement(element);
}

function addTextInElement(element, text){
	var newContent = document.createTextNode(text);
	element.appendChild(newContent);
	return element;
}
