

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
				addEventosNosResultados(resultadosFiltrados);	
			}
		}
	});	
});


function addEventosNosResultados(resultadosFiltrados){
	document.querySelectorAll("#resultados p").forEach(
		(p) => p.addEventListener("click", 
			(e) => {
				let personagem = resultadosFiltrados.filter((personagemKey) => {
					return personagemKey.name === e.target.outerText;
				});
				montaDetalhesPersonagem(personagem);			
			})
		);
};

function montaDetalhesPersonagem(personagem){
	let newPersonagem = personagem[0];
	let blocoDescricaoPersonagem = document.querySelector(".descricaoPersonagem");
	log(personagem);
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), "Nome"));
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), newPersonagem.name));
	
	personagem.birth_year;
	personagem.mass;
	personagem.height;
};
