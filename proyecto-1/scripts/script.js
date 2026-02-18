let admin = 1234;
let input;

//asi que esta funcion es la que nos permite iniciar sesion y tiene una forma estandar(?) de manejar inputs incorrectos
function login() {
    while (true) {
        input = Number(prompt("Escoja su rol\n  1. Camper\n  2. Trainer\n  3. Coordinador\n  0. Salir"));

        switch (input) {
            case 1:
                alert("entro a camper");
                continue;
            case 2:
                alert("entro a trainer");
                continue;
            case 3:
                alert("entro a coordinador");
                camper.registrar()
                continue;
            case 0:
                input = prompt("Desea salir? Y/N").toLowerCase();
                if (input == "y") {
                    return alert("Ha salido satisfactoriamente");
                };
            default:
                alert("Opcion invalida, intenta nuevamente");
                continue
        }
    }
};

//Aqui declaramos a nuestra clase contructora de camper es la fabrica donde podemos agarrar moldes y crear
class camper {
    //esta es nuestra "base de datos" es temporal y se borra cuando se actualiza la pagina
    static listaCampers = [];
    //nuestro molde es lo que le da la forma y es el estandar de un camper
    constructor(info) {
        Object.assign(this, info);
        this.notas = {
            python : 0,
            java : 0,
            github : 0
        }
    }
    //con esta funcion estamos replicando una fabrica donde le mandamos instrucciones y luego guardamos(temporalmente) 
    static registrar() {
        const campos = ["nombre", "apellido"];
        let datosRecogidos = {};

        for (let campo of campos) {
            let infoInput = prompt(`Ingrese su ${campo}`)
            datosRecogidos[campo] = infoInput.toLowerCase()
        }
        const nuevo = new camper(datosRecogidos);
        this.listaCampers.push(nuevo);
        alert("Camper reclutado correctamente!")
        console.table(this.listaCampers);
    }
};
//aqui iniciamos el programa
login()