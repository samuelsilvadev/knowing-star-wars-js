

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
	blocoDescricaoPersonagem.innerHTML = "";
	criaElementosDosDetalhes("span", "Nome", "span", personagem.name);
	criaElementosDosDetalhes("span", "Data de Nascimento", "span", personagem.birth_year);
	criaElementosDosDetalhes("span", "Peso", "span", personagem.mass);
	criaElementosDosDetalhes("span", "Altura", "span", personagem.height);

	function criaElementosDosDetalhes(el1, text1, el2, text2){
		blocoDescricaoPersonagem.appendChild(addTextInElement(addElement(el1), text1));
		blocoDescricaoPersonagem.appendChild(addTextInElement(addElement(el2), text2));
		blocoDescricaoPersonagem.appendChild(addElement("br"));
	};

};

