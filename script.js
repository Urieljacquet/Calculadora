function iniciarSimulador() {

    let numCalificaciones = parseInt(prompt("¿Cuántas calificaciones quieres ingresar?"));


    if (isNaN(numCalificaciones) || numCalificaciones <= 0) {
        alert("Por favor ingresa un número válido de calificaciones.");
        return;
    }


    const calificaciones = [];
    

    for (let i = 0; i < numCalificaciones; i++) {
        let calificacion = parseFloat(prompt(`Ingresa la calificación #${i + 1}:`));
        

        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            alert("Por favor ingresa una calificación válida (0-10).");
            i--; 
        } else {
            calificaciones.push(calificacion);
        }
    }


    const promedio = calcularPromedio(calificaciones);


    alert(`El promedio de las calificaciones es: ${promedio.toFixed(2)}`);
}


function calcularPromedio(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        suma += array[i];
    }
    return suma / array.length;
}