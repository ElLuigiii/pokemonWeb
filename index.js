for (let index = 1; index <= 10; index++) {
    fetch( `https://pokeapi.co/api/v2/pokemon/${index}`)
    .then(res => res.json())
    .then( data => crearTarjetaPokemon(data))
    .catch (error => console.log(error));
}
//hacer pokemon es la funcion que quiero hacer para traer todos los pokemon de una.
// primero hacer un fetch a la api
//despues hacer un for a el resultado de la api trayendo los datos
const urlApi= 'https://pokeapi.co/api/v2/pokemon/'

//ahora lo que voy a hacer es una funcion que añade clase al tipo de pokemon
//recibe un dato y debido al dato que recibe depende la clase que añade
//el dato que recibe es el tipo de pokemon que lo recibimos de la promesa
//luego esta funcion la ponemos al final de la funcion de crear tarjeta
//y al final de la funcion buscar pokemon

function typeOfPokemon (data) {
        // aca voy a agregarle una clase al logo del typo de pokemon
        //dependiendo del tipo
    if(data === 'fire') {
        console.log('ahi va saliendo')
        const typeLogo = document.getElementsByClassName('pokemonType')
        //typeLogo.classList.add('element')
    }else console.log('talvez sea un = menos')
}

function crearTarjetaPokemon(pokemon) {
    const container = document.getElementById('contenedor')
    //aca va la funcion de crear tarjeta
    const tarjeta = document.createElement('div')
    tarjeta.classList.add('container-img')
    //y poner clase al crear elemento
    //vamos a crear las clases para el css
    const nameToPokemon = document.createElement('h1')
    nameToPokemon.classList.add('namePokemon')
    // aca tengo que hacer la varibale del nombre y paasar la primera letra a mayuscula
    const letterPokemon = pokemon.name
    const firstLetter = letterPokemon.slice(0,1).toUpperCase()
    const othersLetters = letterPokemon.slice(1)
    //aca va a ir el tipo de pokemon
    const pokemonType= document.createElement('p')
    pokemonType.classList.add('pokemonType')
    pokemonType.textContent = pokemon.types[0].type.name

    //aca va el contenido del nombre del pokemon
    nameToPokemon.textContent = firstLetter + othersLetters
    const img = document.createElement('img')
    img.classList.add('img-pokemon')
    img.src = pokemon.sprites.other.dream_world.front_default

    tarjeta.appendChild(nameToPokemon)
    tarjeta.appendChild(pokemonType)
    tarjeta.appendChild(img)
    container.appendChild(tarjeta)
}
const container = document.getElementById('contenedor')
const botonNuevo = document.getElementById('btn_buscar')
const inputBuscar = document.getElementById('input_nav')
const url = 'https://pokeapi.co/api/v2/pokemon/'

function buscarPokemon() {
    fetch(`${url}${inputBuscar.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const container = document.getElementById('contenedor')

        const onePokemon = document.createElement('div')
        onePokemon.classList.add('container-img')

        const pokemonName = document.createElement('h1')
        pokemonName.classList.add('namePokemon')
        pokemonName.textContent = data.name

        //aca va a ir el tipo de pokemon
        const pokemonType= document.createElement('p')
        pokemonType.classList.add('pokemonType')
        pokemonType.textContent = data.types[0].type.name

        const imgPokemon = document.createElement('img')
        imgPokemon.classList.add('img-pokemon')
        imgPokemon.src = data.sprites.other.dream_world.front_default
        onePokemon.appendChild(pokemonName)
        onePokemon.appendChild(pokemonType)
        onePokemon.appendChild(imgPokemon)
        container.appendChild(onePokemon)
        //type of pokemon es la funcion que agrega una clase al distintiva al tipo de pokemon
        let atributoApi = data.types[0].type.name
        typeOfPokemon(atributoApi)
    })
    .catch (error => console.log(error))
}
botonNuevo.addEventListener('click', buscarPokemon)
