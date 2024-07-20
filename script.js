// Función para iniciar el simulador
function iniciarSimulador() {
    // Solicitar al usuario que ingrese el número de calificaciones
    let numCalificaciones = parseInt(prompt("¿Cuántas calificaciones quieres ingresar?"), 10);

    // Validar el número de calificaciones
    if (isNaN(numCalificaciones) || numCalificaciones <= 0) {
        alert("Por favor ingresa un número válido de calificaciones.");
        return;
    }

    // Declarar un array para almacenar las calificaciones
    const calificaciones = [];

    // Bucle para ingresar las calificaciones
    for (let i = 0; i < numCalificaciones; i++) {
        let calificacion = parseFloat(prompt(`Ingresa la calificación #${i + 1} (de 0 a 10):`));

        // Validar la calificación ingresada
        if (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            alert("Por favor ingresa una calificación válida (0-10).");
            i--; // Volver a solicitar la calificación actual
        } else {
            calificaciones.push(calificacion);
        }
    }

    // Calcular el promedio
    const promedio = calcularPromedio(calificaciones);

    // Mostrar el promedio
    alert(`El promedio de las calificaciones es: ${promedio.toFixed(2)}`);
}

// Función para calcular el promedio de un array de números
function calcularPromedio(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        suma += array[i];
    }
    return suma / array.length;
}