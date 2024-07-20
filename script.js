// Declaración de variables y constantes
const OPERACIONES = ['suma', 'resta', 'multiplicación', 'división'];
let numeros = [];

// Función para obtener números del usuario
function obtenerNumeros() {
    for (let i = 0; i < 2; i++) {
        let numero = parseFloat(prompt(`Ingrese el número ${i + 1}:`));
        numeros.push(numero);
    }
}

// Función para realizar la operación seleccionada
function realizarOperacion(operacion) {
    let resultado;
    switch (operacion) {
        case 'suma':
            resultado = numeros[0] + numeros[1];
            break;
        case 'resta':
            resultado = numeros[0] - numeros[1];
            break;
        case 'multiplicación':
            resultado = numeros[0] * numeros[1];
            break;
        case 'división':
            if (numeros[1] === 0) {
                alert('No se puede dividir por cero.');
                return;
            }
            resultado = numeros[0] / numeros[1];
            break;
        default:
            alert('Operación no válida.');
            return;
    }
    alert(`El resultado de la ${operacion} es: ${resultado}`);
    console.log(`El resultado de la ${operacion} es: ${resultado}`);
}

// Función principal que controla el flujo del simulador
function iniciarSimulador() {
    obtenerNumeros();
    let operacion = prompt(`Seleccione una operación: ${OPERACIONES.join(', ')}`);
    realizarOperacion(operacion);
}

// Iniciar el simulador
iniciarSimulador();