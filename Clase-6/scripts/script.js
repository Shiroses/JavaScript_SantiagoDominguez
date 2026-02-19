document.getElementById("searchBtn").addEventListener("click", function() {
    let input = document.getElementById("nameInput").value;
    let link = "https://www.dnd5eapi.co/api/2014/monsters?name=" + input
    fetch(link)
    .then(function (res) {return res.json()})
    .then((data) =>{
        console.table(data["results"])
        let contenedor = document.getElementById("Results");

        contenedor.innerHTML = "";
        for (i= 0;i<data["results"].length ; i++){
            contenedor.innerHTML+= `<div class="card">
                <img src="https://www.dnd5eapi.co/api/images/monsters/${data["results"][i]["index"]}.png" alt="Adult-White-Dragon">
                <h3>${data["results"][i]["name"]}</h3>
            </div>`
        }
    });
});

/* async function main() {
    //input = prompt("Escoja la Categoria");
    switch (input) {
        case "1":
            params = "classes";
            break
        case "2":
            params = "spells";
            break
        case "3":
            params = "monsters";
            break
        case "0":
            return
        default:
            alert("No se encontro la categoria intenta nuevamente")
            break;
    };
    data = await getData(params);
    console.table(data.results);
};

async function getData(params) {
    response = await fetch("https://www.dnd5eapi.co/api/2014/" + params);
    data = await response.json();
    return data;
};

main() */