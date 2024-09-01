
function cargarDatos() {
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Procesar los datos cargados si es necesario
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}


cargarDatos();
