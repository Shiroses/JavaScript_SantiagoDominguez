function mensajeAsync(texto, tiempo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(texto);
        }, tiempo);
    });
}
console.log("Iniciando...");

mensajeAsync("Hola, este es tu mensaje asíncrono", 2000)
.then((mensaje) => {
    console.log(mensaje);
})
.finally(() => {
    console.log("Proceso finalizado");
});


    const verificarNumeroAsync = (numero) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (numero % 2 === 0) {
            resolve("Número válido");
        } else {
            reject("Número inválido");
        }
      },500);
    });
};

verificarNumeroAsync(4)
.then((mensaje) => {
    console.log("Éxito (4):", mensaje);
})
.catch((error) => {
    console.error("Error (4):", error);
});

verificarNumeroAsync(5)
.then((mensaje) => {
    console.log("Éxito (5):", mensaje);
})
.catch((error) => {
    console.error("Error (5):", error);
});