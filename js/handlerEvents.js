

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
				montaDetalhesPersonagem(personagem[0]);			
			})
		);
};

function montaDetalhesPersonagem(personagem){
	let blocoDescricaoPersonagem = document.querySelector(".descricaoPersonagem");
	
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), "Nome"));
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), personagem.name));
	blocoDescricaoPersonagem.appendChild(addElement("br"));

	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), "Data de Nascimento"));
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), personagem.birth_year));
	blocoDescricaoPersonagem.appendChild(addElement("br"));
	
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), "Peso"));
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), personagem.mass));
	blocoDescricaoPersonagem.appendChild(addElement("br"));

	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), "Altura"));
	blocoDescricaoPersonagem.appendChild(addTextInElement(addElement("span"), personagem.height));
	blocoDescricaoPersonagem.appendChild(addElement("br"));

};
