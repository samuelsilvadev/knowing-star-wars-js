'use strict';

document
	.querySelector('[data-js="characters-form"]')
	.addEventListener('submit', function(e) {
		e.preventDefault();
		const busca = e.srcElement[0].value;
		fazRequestGet(urlPessoas, function(conteudo, error) {
			if (error != null) console.log('ERRO ' + error);
			else {
				const retorno = JSON.parse(conteudo);
				const resultadosFiltrados = retorno.results.filter(
					obj => obj.name.indexOf(busca) > -1
				);
				document.querySelector('[data-js="results"]').textContent = '';
				if (resultadosFiltrados.length > 0) {
					resultadosFiltrados.forEach(function(item) {
						document.querySelector('[data-js="results"]').innerHTML +=
							'<p>' + item.name + '</p>';
					});
					addEventosNosResultados(resultadosFiltrados);
				}
			}
		});
	});

/*
	Função irá adicionar eventos nos resultados para poder mostrar os detalhes de cada personagem
*/
function addEventosNosResultados(resultadosFiltrados) {
	document.querySelectorAll('[data-js="results"] p').forEach(p =>
		p.addEventListener('click', e => {
			let personagem = resultadosFiltrados.filter(personagemKey => {
				return personagemKey.name === e.target.outerText;
			});
			montaTabelaDetalhesPersonagem(personagem[0]);
		})
	);
}

function montaDetalhesPersonagem(personagem) {
	const blocoDescricaoPersonagem = document.querySelector(
		'.descricaoPersonagem'
	);
	blocoDescricaoPersonagem.innerHTML = '';
	criaElementosDosDetalhes('span', 'Nome', 'span', personagem.name);
	criaElementosDosDetalhes(
		'span',
		'Data de Nascimento',
		'span',
		personagem.birth_year
	);
	criaElementosDosDetalhes('span', 'Peso', 'span', personagem.mass);
	criaElementosDosDetalhes('span', 'Altura', 'span', personagem.height);

	function criaElementosDosDetalhes(el1, text1, el2, text2) {
		blocoDescricaoPersonagem.appendChild(
			addTextInElement(addElement(el1), text1)
		);
		blocoDescricaoPersonagem.appendChild(
			addTextInElement(addElement(el2), text2)
		);
		blocoDescricaoPersonagem.appendChild(addElement('br'));
	}
}

function montaTabelaDetalhesPersonagem(personagem) {
	document.querySelector('[data-js="table-details-characters"]').style.display = 'table';

	const tabela = document.querySelector('[data-js="table-details-characters"] tbody');
	tabela.innerHTML = '';

	const textosDosElementos = ['Name', 'Birthday', 'Weight', 'Heigth'];
	const valorDosElementos = [
		personagem.name,
		personagem.birth_year,
		personagem.mass,
		personagem.height
	];

	textosDosElementos.forEach((element, index) => {
		const newTr = tabela.appendChild(addElement('tr'));

		const th1 = newTr.appendChild(addElement('th'));
		addTextInElement(th1, index + 1);
		//th1.innerHTML += "row=1";

		const td2 = newTr.appendChild(addElement('td'));
		addTextInElement(td2, element);

		const td3 = newTr.appendChild(addElement('td'));
		addTextInElement(td3, valorDosElementos[index]);
	});
}
