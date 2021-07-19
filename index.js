//alert('JavaScript is live')

const app_container = document.getElementById('container');

const NUMBER_OF_POKEMON = 100;

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);


const fetchAPI = async () => {
	for (let i = 1; i <= NUMBER_OF_POKEMON; i++) {
		await getAPI(i);
	}
}

const getAPI = async id => {
	const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

	const res = await fetch(URL);
	const pokemon = await res.json();
	//console.log(pokemon)
	createPokeCard(pokemon);
}

fetchAPI();

// function viewModal() {
// 	//console.log('button clicked')
// 	const modal = document.createElement('div');
// 	modal.classList.add('pokemon-modal');

// 	const modalContent = `
// 		<div class="modal-container">
// 			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/17.png">
// 		</div>

// 	`
// }

function createPokeCard (pokemon) {
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon')

	const pokemon_type = pokemon.types.map(type => type.type.name);
	const type = main_types.find(
		type => pokemon_type.indexOf(type) > -1
	);

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type]
	pokemonElement.style.backgroundColor = color;

	const pokeInnerHTML = `
		<div class="img-container">
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png">
		</div>
		<div class="info">
			<span class="number">${pokemon.id}</span>
			<h3 class="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
		</div>
		<br />
	`;

	pokemonElement.innerHTML = pokeInnerHTML;

	app_container.appendChild(pokemonElement);
}