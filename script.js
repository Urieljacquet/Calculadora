// Clase para manejar el proceso de calificaciones
class SimuladorPromedio {
    constructor() {
        this.calificaciones = [];
    }

    // Agrega una calificación si es válida (0-10)
    agregarCalificacion(calificacion) {
        if (calificacion >= 0 && calificacion <= 10) {
            this.calificaciones.push(calificacion);
            return true;
        }
        return false;
    }

    // Calcula el promedio de las calificaciones
    calcularPromedio() {
        if (this.calificaciones.length === 0) return 0;
        const suma = this.calificaciones.reduce((acum, cal) => acum + cal, 0);
        return suma / this.calificaciones.length;
    }

    // Guarda las calificaciones en datos.json
    guardarEnStorage() {
        fetch('datos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ calificaciones: this.calificaciones })
        })
        .then(response => response.json())
        .then(data => console.log('Datos guardados:', data))
        .catch(error => console.error('Error al guardar datos:', error));
    }

    // Carga las calificaciones desde datos.json
    cargarDesdeStorage() {
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                this.calificaciones = data.calificaciones || [];
            })
            .catch(error => console.error('Error al cargar datos:', error));
    }

    // Reinicia las calificaciones y guarda en datos.json
    reiniciarSimulador() {
        this.calificaciones = [];
        fetch('datos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ calificaciones: [] })
        })
        .then(response => response.json())
        .then(data => console.log('Datos reiniciados:', data))
        .catch(error => console.error('Error al reiniciar datos:', error));
    }
}

// Inicialización del simulador
const simulador = new SimuladorPromedio();
simulador.cargarDesdeStorage();

// Maneja el evento de envío del formulario para ingresar calificaciones
document.getElementById('calificacionesForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const numCalificaciones = parseInt(document.getElementById('numCalificaciones').value, 10);
    const calificacionesContainer = document.getElementById('calificacionesContainer');
    calificacionesContainer.innerHTML = ''; // Limpiar contenedor

    // Validar el número de calificaciones
    if (isNaN(numCalificaciones) || numCalificaciones <= 0) {
        mostrarMensaje('Por favor ingresa un número válido de calificaciones.');
        return;
    }

    // Limpiar calificaciones antes de agregar nuevas
    simulador.calificaciones = [];

    // Crear inputs para cada calificación
    for (let i = 0; i < numCalificaciones; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Calificación #${i + 1} (0-10)`;
        input.min = 0;
        input.max = 10;
        input.required = true;
        input.classList.add('calificacion-input');
        calificacionesContainer.appendChild(input);
    }

    // Crear y agregar botón para calcular promedio
    const calcularBtn = document.createElement('button');
    calcularBtn.textContent = 'Calcular Promedio';
    calcularBtn.type = 'button';
    calcularBtn.onclick = procesarCalificaciones;
    calificacionesContainer.appendChild(calcularBtn);
});

// Maneja el evento de clic en el botón de reinicio
document.getElementById('resetButton').addEventListener('click', function() {
    simulador.reiniciarSimulador();
    document.getElementById('calificacionesForm').reset();
    document.getElementById('calificacionesContainer').innerHTML = '';
    document.getElementById('resultado').style.display = 'none';
    this.style.display = 'none';
});

// Procesa las calificaciones y muestra el promedio
function procesarCalificaciones() {
    const inputs = document.querySelectorAll('.calificacion-input');
    let valido = true;

    // Limpiar calificaciones antes de procesar
    simulador.calificaciones = [];

    inputs.forEach(input => {
        const calificacion = parseFloat(input.value);
        if (!simulador.agregarCalificacion(calificacion)) {
            mostrarMensaje('Por favor ingresa una calificación válida (0-10).');
            valido = false;
        }
    });

    if (valido) {
        simulador.guardarEnStorage();
        const promedio = simulador.calcularPromedio();
        mostrarMensaje(`El promedio de las calificaciones es: ${promedio.toFixed(2)}`);
        document.getElementById('resetButton').style.display = 'block'; // Mostrar el botón de reinicio
    }
}

// Muestra un mensaje en el contenedor de resultados
function mostrarMensaje(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.display = 'block';
}
