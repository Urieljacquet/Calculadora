
class SimuladorPromedio {
    constructor() {
        this.calificaciones = [];
    }

    agregarCalificacion(calificacion) {
        if (calificacion >= 0 && calificacion <= 10) {
            this.calificaciones.push(calificacion);
            return true;
        }
        return false;
    }

    calcularPromedio() {
        if (this.calificaciones.length === 0) return 0;
        const suma = this.calificaciones.reduce((acum, cal) => acum + cal, 0);
        return suma / this.calificaciones.length;
    }

    guardarEnStorage() {
        localStorage.setItem('calificaciones', JSON.stringify(this.calificaciones));
    }

    cargarDesdeStorage() {
        const calificacionesGuardadas = JSON.parse(localStorage.getItem('calificaciones'));
        if (calificacionesGuardadas) {
            this.calificaciones = calificacionesGuardadas;
        }
    }

    reiniciarSimulador() {
        this.calificaciones = [];
        localStorage.removeItem('calificaciones');
    }
}

// Inicialización
const simulador = new SimuladorPromedio();
simulador.cargarDesdeStorage();

document.getElementById('calificacionesForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const numCalificaciones = parseInt(document.getElementById('numCalificaciones').value, 10);
    const calificacionesContainer = document.getElementById('calificacionesContainer');
    calificacionesContainer.innerHTML = ''; // Limpiar contenedor

    if (isNaN(numCalificaciones) || numCalificaciones <= 0) {
        mostrarMensaje('Por favor ingresa un número válido de calificaciones.');
        return;
    }

    simulador.calificaciones = [];

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

    const calcularBtn = document.createElement('button');
    calcularBtn.textContent = 'Calcular Promedio';
    calcularBtn.type = 'button';
    calcularBtn.onclick = procesarCalificaciones;
    calificacionesContainer.appendChild(calcularBtn);
});

document.getElementById('resetButton').addEventListener('click', function() {
    simulador.reiniciarSimulador();
    document.getElementById('calificacionesForm').reset();
    document.getElementById('calificacionesContainer').innerHTML = '';
    document.getElementById('resultado').style.display = 'none';
    this.style.display = 'none';
});

function procesarCalificaciones() {
    const inputs = document.querySelectorAll('.calificacion-input');
    let valido = true;

    
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
        document.getElementById('resetButton').style.display = 'block'; 
    }
}

function mostrarMensaje(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.display = 'block';
}