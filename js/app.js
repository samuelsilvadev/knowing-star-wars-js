'use strict';

const urlPessoas = 'http://swapi.co/api/people/';

function fazRequestGet(url, callback) {
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.addEventListener('load', function() {
		if (req.status < 400) {
			callback(req.responseText);
		} else {
			callback(null, new Error('Requisição falhou: ' + req.statusText));
		}
	});
	req.addEventListener('error', function() {
		callback(null, new Error('Erro na Rede'));
	});
	req.send(null);
}

function getTodosPersonagens() {
	fazRequestGet(urlPessoas, function(conteudo, error) {
		if (error != null) {
			return console.log('ERRO ' + error);
		}
		return conteudo;
	});
}
