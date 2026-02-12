let input;
let roles = ["camper", "trainer", "coordinador"]
let campers = []

function coodinador_page(){
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
            infoInput = prompt("Ingrese su " + newCamper[i]);
            tempCamper.push(infoInput)
        }
        console.log(tempCamper)
        

    }catch{
        alert("El usuario ha cancelado la operación")
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
        alert("coordinador")
        coodinador_page()
        break

    default:

}


