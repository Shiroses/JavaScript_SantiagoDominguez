const inputs = document.querySelectorAll("input")
const button = document.querySelector("button")

const input = []

button.addEventListener("click", ()=>{
    inputs.forEach(each => {
        input.push(each.value)
    });
    alert(`Hola, soy ${input[0]}, tengo ${input[1]} y mis pasatiempos son ${input[2]}`)
})