

document.querySelector("#frmBuscaPersonagem").addEventListener("submit", function(e){
	e.preventDefault();
	let busca = e.srcElement[0].value;
	fazRequestGet(urlPessoas, function(conteudo, error){
		if(error != null)
			console.log("ERRO " + error);
		else{
			let retorno = JSON.parse(conteudo);
			let resultadosFiltrados = retorno.results.filter((obj) =>
				obj.name.indexOf(busca) > -1
			);
			document.querySelector("#resultados").textContent = "";
			if(resultadosFiltrados.length > 0){
				resultadosFiltrados.forEach(function(item){
					document.querySelector("#resultados").innerHTML += "<p>" + item.name + "</p>";
				});	
				addEventosNosResultados();		
			}
		}
	});	
});


function addEventosNosResultados(){
	document.querySelectorAll("#resultados p").forEach((p) => p.addEventListener("click", (e) => console.log(e.target.outerText)));	
}