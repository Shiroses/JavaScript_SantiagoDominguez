let input;
const roles = ["camper", "trainer", "coordinador"]
const campers = []

function coordinador_page () {
    while (true) {
        input = prompt("Que operacion necesita realizar \n1. Añadir camper\n2. Editar camper\n3. Rutas\n0. Cancelar").toString().toLowerCase()
        switch (input){
            case "1":
                coordinador_register_page()
                continue
            case "2":
                coordinador_edit_page()
                continue
            case "3":
                routes()
            case "0":
                input = prompt("Desea salir? (Y/N)").toLowerCase()
                if (input == "y") {
                    return
                }else {
                    continue
                }
            default:
                alert("Opcion invalida, Intente nuevamente")
        }
    }
}

function routes() {
    input = prompt("Bienvenido a rutas, deseas:\n1. Añadir a un camper\n2. Añadir una nueva ruta")

    switch (input) {
        case "1":
            input = prompt("A que camper le desea añadir?")
        
        case "2": 
            input = prompt("Ingrese el nombre de la ruta")

        case "3":
            alert("Las rutas son:")
        
        default:
            alert("Opcion no reconocida, intente nuevamente")
    }
}

function coordinador_edit_page() {
    let nCamper
    let found = false
    input = prompt("ingrese el nombre del camper a editar").toString().toLowerCase()
    if (input === null || input === "") {
        alert("Accion cancelada")
        return
    }
    for (let camperN = 0; camperN < campers.length; camperN++){
        if (input == campers[camperN][0]){
            nCamper = camperN
            found = true
        }
    }
    if (found == false){
        alert("Usuario no encontrado")
    }else {
        input = prompt("Que desea editar?\n1. nombre\n2. apellido\n3. No. identidad\n4. Dirección\n5. Acudiente\n6. Contacto\n7. Estado\n8. Riesgo") - 1
        campers[nCamper][input] = prompt("Ingrese el nuevo campo")
        console.log(campers[nCamper])
    }
}

function coordinador_register_page(){
    let tempCamper = []
    try {
        let newCamper = [
            names = "nombre",
            surName = "apellido",
            id = "cedula",
            address = "dirección de residencia",
            attendant = "acudiente",
            contact = "numero de contacto",
            status = "estado",
            risk = "riesgo"
        ]
        for (let i = 0; i < newCamper.length; i++){
            infoInput = prompt("Ingrese su " + newCamper[i]).toLowerCase();
            while (infoInput === null || infoInput === "") {
                infoInput = prompt("El espacio no puede estar vacio\nIntente nuevamente")
            }
            tempCamper.push(infoInput)
        }
        console.log(tempCamper)
        campers.push(tempCamper)

    }catch{
        alert("El usuario ha cancelado la operación")
        tempCamper = []
        return
    }
}

while (true) {
    try {
        input = prompt("Ingresa tu rol! (camper, trainer, coordinador)").toLowerCase();
        console.log(input)
        if (!roles.includes(input)) {
        alert("intenta nuevamente! code 1")
            continue
        }
    }catch{
        alert("intenta nuevamente! code 2")
    }
    break
}

switch(input){
    case "camper":
        alert("Camper")
        break

    case "trainer":
        alert("trainer")
        break

    case "coordinador":
        coordinador_page()
        break

    default:
        alert("Input incorrecto, Intente nuevamente")
}
