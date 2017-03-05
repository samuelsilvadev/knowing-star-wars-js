

document.querySelector("#frmBuscaPersonagem").addEventListener("submit", function(e){
	e.preventDefault();
	let busca = e.srcElement[0].value;
	fazRequestGet(urlPessoas, function(conteudo, error){
		if(error != null)
			console.log("ERRO " + error);
		else{
			let retorno = JSON.parse(conteudo);
			console.log(retorno.results);
			/*retorno.results.filter(function(obj){
				return obj.name == busca;
			})*/		
		}
	});	
});