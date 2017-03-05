

document.querySelector("#frmBuscaPersonagem").addEventListener("submit", function(e){
	e.preventDefault();
	let busca = e.srcElement[0].value;
	fazRequestGet(urlPessoas, function(conteudo, error){
		if(error != null)
			console.log("ERRO " + error);
		else{
			let retorno = JSON.parse(conteudo);
			let resultadosFiltrados = retorno.results.filter(function(obj){
				return obj.name.indexOf(busca) > -1;
			});
			console.log(resultadosFiltrados);
			document.querySelector("#resultados").textContent = "";
			if(resultadosFiltrados.length > 0){
				resultadosFiltrados.forEach(function(item){
					document.querySelector("#resultados").innerHTML += item.name + "<br>";
				});			
			}
		}
	});	
});