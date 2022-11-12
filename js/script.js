let respuesta = null;
let infoPokemon = "";
function peticionAPI() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pokeapi.co/api/v2/pokemon", false);
    xhr.send();
    respuesta = JSON.parse(xhr.response);
    xhr.readyState == 4;
}

function cargaPodex(json) {
    let i = 1;
    let select = document.getElementById("listaPoke");
    let pokemons = json.count;
    while (pokemons + 1 > i) {
        let item = document.createElement("option");
        item.appendChild(document.createTextNode("Pokemon " + i));
        item.setAttribute("value", i);
        select.appendChild(item);
        i++;
        if (i == 906) {
            break;
        }
    }
}


function requestPokemonSeleccionado() {
    let select = document.getElementById("listaPoke");
    select.addEventListener("change", function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${select.value}`, false);
        xhr.send();
        infoPokemon = JSON.parse(xhr.response);
        xhr.readyState == 4;
        muestraInfoPokemon(infoPokemon);
    });
}

function muestraInfoPokemon(data){
    console.log(data)
    let info=document.getElementById("stats");
    document.getElementById("imgPoke").src=data.sprites.front_default;
    info.innerHTML="<strong>Nombre: </strong>" + data.forms[0].name + "<br>"
    +"<strong>Tipo: </strong>" + data.types[0].type.name + "<br>"
    +"<strong>Altura: </strong>" + data.height + "<br>"
    +"<strong>Peso: </strong>" + data.weight + "<br>";
}

window.onload = () => {
    peticionAPI();
    cargaPodex(respuesta);
    requestPokemonSeleccionado();
}