let currentId = 495;

document.getElementById("prev").addEventListener("click", function(){
    if (currentId > 1) {
        currentId--;
        pokeDex(currentId);
    }
});

document.getElementById("next").addEventListener("click", function(){
    if (currentId < 649) {
        currentId++;
        pokeDex(currentId);
    }
});
document.getElementById("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const value = e.target.value.trim().toLowerCase();
        pokeDex(value);
    }
});
function pokeDex(id) {

    // Loading inmediato
    document.getElementById("pokemon").src = "";
    document.getElementById("id").innerHTML = "";
    document.getElementById("name").innerHTML = "Cargando...";

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Not found");
        }
        return response.json();
    })
    .then((pokemon) => {

        const pokeId = Number(pokemon.id);

        if (pokeId > 649) {
            throw new Error("Out of range");
        }

        currentId = pokeId;

        setTimeout(() => {

            const img = document.getElementById("pokemon");

            img.classList.remove("fullscreen-glitch");
            img.style.height = "";

            img.src =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeId}.gif`;

            document.getElementById("id").innerHTML = pokeId + " -";
            document.getElementById("name").innerHTML =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

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
    document.getElementById("pokemon").src = './imgs/RB_MissingNo.webp'
    document.getElementById("pokemon").style.height = "100px"
    document.getElementById("id").innerHTML = "??? -"
    document.getElementById("name").innerHTML = "ERROR.NotFound"
    document.getElementById("input").value = ""
}

pokeDex(currentId)