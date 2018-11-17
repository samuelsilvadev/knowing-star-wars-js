'use strict';

(function() {
	let filteredResults = [];

	document
		.querySelector('[data-js="characters-form"]')
		.addEventListener('submit', function(e) {
			e.preventDefault();
			const value = e.srcElement[0].value;
			get(ENDPOINT_PERSON, function(content, error) {
				if (error != null) console.log('ERROR -> ' + error);
				else {
					const result = JSON.parse(content);
					filteredResults = result.results.filter(function(obj) {
						return obj.name.indexOf(value) > -1;
					});

					const $results = document.querySelector(
						'[data-js="results"]'
					);
					$results.textContent = '';

					if (filteredResults.length > 0) {
						filteredResults.forEach(function(item) {
							$results.innerHTML += '<p>' + item.name + '</p>';
						});
					}
				}
			});
		});

	document
		.querySelector('[data-js="results"]')
		.addEventListener('click', e => {
			if (e.target && e.target.nodeName === 'P') {
				const character = filteredResults.find(characterKey => {
					return characterKey.name === e.target.outerText;
				});
				createTableCharacter(character);
			}
		});

	function createTableCharacter(character) {
		document.querySelector(
			'[data-js="table-details-characters"]'
		).style.display = 'table';

		const table = document.querySelector(
			'[data-js="table-details-characters"] tbody'
		);
		table.innerHTML = '';

		const elementTexts = ['Name', 'Birthday', 'Weight', 'Heigth'];
		const elementValues = [
			character.name,
			character.birth_year,
			character.mass,
			character.height
		];

		elementTexts.forEach((element, index) => {
			const newTr = table.appendChild(addElement('tr'));

			const th1 = newTr.appendChild(addElement('th'));
			addTextInElement(th1, index + 1);

			const td2 = newTr.appendChild(addElement('td'));
			addTextInElement(td2, element);

			const td3 = newTr.appendChild(addElement('td'));
			addTextInElement(td3, elementValues[index]);
		});
	}
})();
