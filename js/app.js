

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



	fazRequestGet("http://swapi.co/api/peopl/", function(conteudo, error){
		if(error != null)
			console.log("ERRO " + error)
		else
			console.log(conteudo);
	});

