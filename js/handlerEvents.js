

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

/*
	Função irá adicionar eventos nos resultados para poder mostrar os detalhes de cada personagem
*/
function addEventosNosResultados(resultadosFiltrados){
	document.querySelectorAll("#resultados p").forEach(
		(p) => p.addEventListener("click",
			(e) => {
				let personagem = resultadosFiltrados.filter((personagemKey) => {
					return personagemKey.name === e.target.outerText;
				});
				montaTabelaDetalhesPersonagem(personagem[0]);
				//montaDetalhesPersonagem(personagem[0]);
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

function montaTabelaDetalhesPersonagem(personagem){

	document.querySelector(".descricaoPersonagem table").style.display = "table";

	let tabela = document.querySelector(".descricaoPersonagem table tbody");
	tabela.innerHTML = "";
	
	const textosDosElementos = ["Nome", "Data de Nascimento", "Peso", "Altura"];
	const valorDosElementos  = [personagem.name, personagem.birth_year, personagem.mass, personagem.height];

	textosDosElementos.forEach((element, index) => {
		
		let newTr = tabela.appendChild(addElement("tr"));
		
		let th1 = newTr.appendChild(addElement("th"));
		addTextInElement(th1, index + 1);
		//th1.innerHTML += "row=1";

		let td2 = newTr.appendChild(addElement("td"));
		addTextInElement(td2, element);

		let td3 = newTr.appendChild(addElement("td"));
		addTextInElement(td3, valorDosElementos[index]);

	});
	
}
