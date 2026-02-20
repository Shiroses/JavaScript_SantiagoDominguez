let id = 495
document.getElementById("prev").addEventListener("click", function(){
    id = Number(id)
    pokeDex(id-=1)
})
document.getElementById("next").addEventListener("click", function(){
    id = Number(id)
    try{
    pokeDex(id+=1)

    }catch(error){
        console.log(error)
    }
})
document.addEventListener("keydown", (e) => {
    try {
    if (e.key === "Enter") {
        id = document.getElementById("input").value;
        if (typeof id === "string") {
            id = id.trim().toLowerCase();
        };
        pokeDex(id);
    }
        
    } catch (error) {
        console.log(error)
    }
});

function pokeDex (id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Pokemon no encontrado")
        }    
        return response.json()
    })
    .then((pokemon) => {
        id = Number(pokemon.id)
        document.getElementById("pokemon").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
        document.getElementById("id").innerHTML = id+" -"
        document.getElementById("name").innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        document.getElementById("input").value = ""
    })
    .catch(()=>{
        document.getElementById("pokemon").src = "./imgs/RB_MissingNo.webp"
        document.getElementById("pokemon").style.height = '100px'
        document.getElementById("id")
    })
}

pokeDex(id)