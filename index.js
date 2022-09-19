let btnPrevious
let btnSiguiente
let templateHTML
const buttons = document.getElementById('buttons')
const container = document.getElementById('contenedor')
const urlApi= 'https://pokeapi.co/api/v2/pokemon/'
const botonNuevo = document.getElementById('btn_buscar')
const inputBuscar = document.getElementById('input_nav')

const ImprimirBotones = (data) => {
    let boton_container = document.getElementById('buttons')
    if(data.next && data.previous){
        btnNext= `<button class="boton_Nav" data-url=${data.next}>Siguiente</button>`
        btnPrevious=`<button class="boton_Nav" data-url=${data.previous}>Anterior</button>`
        return boton_container.innerHTML+=btnPrevious+btnNext
    }else if (!data.previous){
        btnNext= `<button class="boton_Nav" data-url=${data.next}>Siguiente</button>`
        btnPrevious=`<button class="boton_Nav" data-url=${data.previous}>Anterior</button>`
        return boton_container.innerHTML+=btnNext
    }else return boton_container.innerHTML+=btnPrevious
}
//funcion para eliminar botones
function removeChild (contenedorPadre) {
    while (contenedorPadre.firstChild) {
        contenedorPadre.removeChild(contenedorPadre.firstChild)
    }
}
const ImprimirPokemons = async (data) => {
    container.innerHTML= ''
    try{    data.forEach(async element => {
            const direccion = await fetch(element.url)
            const resultado = await direccion.json()
            //const cumplido = await response.json()
            //console.log(resultado)
            //console.log(cumplido)
            templateHTML =`
            <div class="container-img">
            <img class="img-pokemon" src=${resultado.sprites.other.dream_world.front_default} alt="${resultado.name}"/>
            <h1 class="namePokemon">${resultado.name}</h1>
            <p class="pokemonType">${resultado.types[0].type.name}</p>
            </div>
            `
            container.innerHTML+=templateHTML
        });

    }
    catch (error) {
        console.log(error)
    }
}
window.addEventListener('load', ()=> {
    console.log('cargando')
})
const GetPokemons = async (url) => {
    try {
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
        removeChild(buttons)
        ImprimirBotones(result)
        ImprimirPokemons(result.results)
        // btnSiguiente =result.next ? `<button class="boton_Nav" data-url=${result.next}>Siguiente</button>` : ''
        // btnPrevious= result.previous ? `<button class="boton_Nav" data-url=${result.previous}>Anterior</button>` :''
        // buttons.innerHTML+= btnSiguiente + ' ' + btnPrevious
        //por aca una fucnion que recorra el array de resul.results
    }
    catch (error){
        console.log(error)
    }
}
GetPokemons(urlApi)
buttons.addEventListener('click', (e) =>{
    if(e.target.classList.contains('boton_Nav')){
        let value = e.target.dataset.url
        GetPokemons(value)
        console.log(value)
    }
})

function buscarPokemon() {
    fetch(`${urlApi}${inputBuscar.value}`)
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('contenedor')
        removeChild(container)
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
        //console.log(data.types.length)
        //type of pokemon es la funcion que agrega una clase al distintiva al tipo de pokemon
        //typeOfPokemon(atributoApi)
    })
    .catch (error => console.log(error))
}
botonNuevo.addEventListener('click', buscarPokemon)