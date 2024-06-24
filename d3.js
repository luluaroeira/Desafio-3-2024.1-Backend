const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonList = [];
let currentIndex = 0;

async function fetchPokemonList() {
    try {
        const response = await fetch(`${API_URL}?offset=0&limit=1292`);
        const data = await response.json();
        pokemonList = data.results;
        showPokemon(currentIndex);
    } catch (error) {
        console.error('Erro', error);
    }
}

async function showPokemon(index) {
    try {
        const pokemon = pokemonList[index];
        const response = await fetch(pokemon.url);
        const data = await response.json();

        document.getElementById('pokemon-name').textContent = data.name;

        const imageUrl = data.sprites.front_default 
                         || data.sprites.other?.['official-artwork']?.front_default 
                         || data.sprites.other?.['dream_world']?.front_default;

        if (imageUrl) {
            document.getElementById('pokemon-image').src = imageUrl;
        } else {
            console.error('Imagem não encontrada para o Pokémon:', data.name);
            document.getElementById('pokemon-image').src = 'default-image.png'; 
        }
    } catch (error) {
        console.error('Erro ao buscar informações do Pokémon:', error);
    }
}

function showPreviousPokemon() {
    currentIndex = (currentIndex === 0) ? pokemonList.length - 1 : currentIndex - 1;
    showPokemon(currentIndex);
}

function showNextPokemon() {
    currentIndex = (currentIndex === pokemonList.length - 1) ? 0 : currentIndex + 1;
    showPokemon(currentIndex);
}

document.getElementById('previous-button').addEventListener('click', showPreviousPokemon);
document.getElementById('next-button').addEventListener('click', showNextPokemon);

fetchPokemonList();
