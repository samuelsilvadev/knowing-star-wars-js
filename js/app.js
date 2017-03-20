
let urlPessoas = "http://swapi.co/api/people/";
let keyFlickir = "85cbbaacf76f1a89b73310aac077de09";
let utlImagens = "http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="+keyFlickir+"&user_id=153162937@N06&per_page=12&page=4&format=json&jsoncallback=?"

function fazRequestGet(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.addEventListener("load",function(){
		if (req.status < 400)
			callback(req.responseText);
		else
			callback(null, new Error("Requisição falhou: " + req.statusText));
	});
	req.addEventListener("error", function() {
		callback(null, new Error("Erro na Rede"));
	});
	req.send(null);
}

function getTodosPersonagens(){
	fazRequestGet(urlPessoas, function(conteudo, error){
		if(error != null)
			console.log("ERRO " + error);
		else
			return conteudo;
	});
};