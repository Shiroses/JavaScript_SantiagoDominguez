function new_camper(){
    const tableRef = document.getElementById("tableBody");
    const newRow = tableRef.insertRow(-1)
    
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
            if (infoInput === null) {
                tableRef.deleteRow(newRow.rowIndex - 1)
                throw new Error("Cancelado!")
            }
            const cell = newRow.insertCell(-1);
            cell.textContent = infoInput;
        }
        

    }catch{
        alert("El usuario ha cancelado la operación")
        return
    }
}
