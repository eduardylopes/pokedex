const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types}) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    const correctPokemonID = pokemonID => {
        if (pokemonID < 10) {
            return `00${pokemonID}`
        } else if (pokemonID < 100) {
            return `0${pokemonID}`
        } else {
            return pokemonID
        }
    }

    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${correctPokemonID(id)}.png">
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p> 
        </li>
    `
    return accumulator
}, "")

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage)