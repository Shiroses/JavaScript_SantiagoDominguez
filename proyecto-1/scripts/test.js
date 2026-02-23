const createUser = (name, email) => ({
    name,
    email,
    id: Math.floor(Math.random()*10000)
});
const campers = []
let nombre;

while (!nombre) {
    nombre = prompt("ingrese su nombre")
}
let newUser = createUser(nombre, "awevo.com")
nombre = null
campers.push(newUser)


console.table(campers)






