category = prompt("Escoja la Categoria");
myUrl = "https://www.dnd5eapi.co/api/2014/" + category
fetch(myUrl)
.then(response=>response.json())
.then(data => {
    console.table(data["results"][27]);
});