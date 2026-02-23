const pokeCry = document.querySelector(".pokeCry");
const pokeImg = document.querySelector("#pokemon");
const pokeId = document.querySelector("#id");
const pokeName = document.querySelector("#name");
const pokeIndex = document.querySelector("#input");
let currentId = 495;

document.getElementById("prev").addEventListener("click", function(){
    if (currentId > 1) {
        currentId--;
        pokeCry.setAttribute("autoplay", "autoplay")

        renderPokemon(currentId);
    }
});

document.getElementById("next").addEventListener("click", function(){
    if (currentId < 649) {
        currentId++;
        pokeCry.setAttribute("autoplay", "autoplay")
        renderPokemon(currentId);
    }
});
document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim().toLowerCase();
        pokeCry.setAttribute("autoplay", "autoplay")
        renderPokemon(value);
    }
});


const fetchPokemon = async (pokeID) =>{
    const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
    if (pokeResponse.status == 200) {
        const pokeData = await pokeResponse.json();
        return pokeData;
    }
}

const renderPokemon = async (pokemon) => {
    pokeImg.src = ""
    pokeId.textContent = ""
    pokeName.textContent = "Cargando..."

    if (pokemon > 649) {
        pokedexNotFound();
        setTimeout(() => {
            pokeImg.classList.add("fullscreen-glitch");
            setTimeout(() => {
                pokeImg.classList.remove("fullscreen-glitch");
                pokeImg.style.height = "";
                renderPokemon(495);
            }, 100);

        },1500);
        throw new Error("Out of range");
        
    }

    const pokeData = await fetchPokemon(pokemon)

    
    if (pokeData) {
        setTimeout (() => {
            pokeCry.src = pokeData.cries.latest
            pokeImg.src = pokeData.sprites.versions["generation-v"]["black-white"].animated.front_default;
            pokeName.textContent = pokeData.name;
            pokeId.textContent = pokeData.id;
            pokeIndex.value = ""
        },300)
    }

}



function pokeDex(id) {
    pokeImg.src = "";
    pokeId.innerHTML = "";
    pokeName.innerHTML = "Cargando...";

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Not found");
        }
        return response.json();
    })
    .then((pokemon) => {

        const poke_id = Number(pokemon.id);
        const poke_img = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
        const poke_cry = pokemon.cries.latest

        if (poke_id > 649) {
            throw new Error("Out of range");
        }

        currentId = poke_id;

        setTimeout(() => {
            pokeImg.classList.remove("fullscreen-glitch");
            pokeImg.style.height = "";

            pokeImg.src = poke_img
            pokeId.textContent = poke_id + " -";
            pokeName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            pokeIndex.value = ""
            pokeCry.src = poke_cry

        }, 300);
    })
    .catch(() => {

        const img = document.getElementById("pokemon");
        pokedexNotFound();
        setTimeout(() => {

            img.classList.add("fullscreen-glitch");
            setTimeout(() => {

                img.classList.remove("fullscreen-glitch");
                img.style.height = "";
                pokeDex(495);

            }, 100);

        },1500);
    });
}

function pokedexNotFound(){
    pokeImg.src = './imgs/RB_MissingNo.webp'
    pokeId.innerHTML = "??? -"
    pokeName.textContent = "ERROR.NotFound"
    pokeIndex.value = ""
}

renderPokemon(currentId)