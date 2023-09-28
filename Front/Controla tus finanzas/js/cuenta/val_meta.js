//Ingresar valor inicial y meta de ahorro
// Variables para los elementos HTML
const valorInicialMostrado = document.getElementById('valorInicialMostrado');
const metaAhorroMostrada = document.getElementById('metaAhorroMostrada');
const editarBt = document.getElementById('editarBt');
const eliminarBt = document.getElementById('eliminarBt');
const guardarCambiosBt = document.getElementById('guardarCambiosBtn');
const cancelarEdicionBt = document.getElementById('cancelarEdicionBtn');
const guardarDatosBtn = document.getElementById('guardarDatosBtn');

// Variables para los campos de entrada del formulario
const valorInicialInput = document.getElementById('valorInicial');
const metaAhorroInput = document.getElementById('metaAhorro');

// Variable para controlar el modo de edición
let modoEdit = false;

// Función para cargar y mostrar los valores desde la API
async function cargarYMostrarValoresDesdeAPI() {
    try {
        const response = await fetch('http://localhost:4000/traer_valor_meta'); // Ruta de lectura de montos
        const data = await response.json();
        // Mostrar los valores
        valorInicialMostrado.textContent = `Valor Inicial: ${data.valor_inicial}`;
        metaAhorroMostrada.textContent = `Meta de Ahorro: ${data.meta_ahorro}`;
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

// Función para habilitar el modo de edición
function habilitarEdicion() {
    modoEdit = true;
    editarBt.style.display = 'none';
    eliminarBt.style.display = 'none';
    guardarCambiosBtn.style.display = 'inline-block';
    cancelarEdicionBtn.style.display = 'inline-block';
    // Habilitar la edición de los campos
    valorInicialInput.removeAttribute('readonly');
    metaAhorroInput.removeAttribute('readonly');
    // Mostrar el formulario para editar
    // document.getElementById('form_valores').style.display = 'block';
}

// Función para guardar los cambios y deshabilitar el modo de edición
async function guardarCambios() {
    modoEdit = false;
    editarBt.style.display = 'inline-block';
    eliminarBt.style.display = 'inline-block';
    guardarCambiosBtn.style.display = 'none';
    cancelarEdicionBtn.style.display = 'none';
    // Deshabilitar la edición de los campos
    valorInicialInput.setAttribute('readonly', true);
    metaAhorroInput.setAttribute('readonly', true);
    // Obtener los valores editados
    const nuevoValorInicial = valorInicialInput.value;
    const nuevaMetaAhorro = metaAhorroInput.value;
    try {
        // Realiza una solicitud para actualizar los cambios en la API (Debes implementar esta función)
        await fetch('http://localhost:4000/actualizar_valor_meta/{id}', {
            method: 'PUT', // Usar el método PUT para actualizar
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valor_inicial: nuevoValorInicial, meta_ahorro: nuevaMetaAhorro }),
        });
        // Recargar y mostrar los valores actualizados desde la API
        cargarYMostrarValoresDesdeAPI();
        // Ocultar el formulario de edición
        document.getElementById('form_valores').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}        

// Obtener referencias a los elementos del formulario
const formIngresoValores = document.getElementById('form_ingreso_valores');
const valorInicial = document.getElementById('valorInicial');
const metaAhorro = document.getElementById('metaAhorro');

// Agregar un evento de escucha al formulario
formIngresoValores.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la acción de envío predeterminada

    // Obtener los valores del formulario
    const nuevoValorInicial = valorInicial.value;
    const nuevaMetaAhorro = metaAhorro.value;

    try {
        // Realizar una solicitud para guardar los datos en la API
        await fetch('http://localhost:4000/guardar_valor_meta', {
            method: 'POST', // Usar el método POST para crear nuevos datos
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valor_inicial: nuevoValorInicial, meta_ahorro: nuevaMetaAhorro }
                
                ),
        });

        // Recargar y mostrar los valores actualizados desde la API
        cargarYMostrarValoresDesdeAPI();
        console.log(123)
        // Ocultar el formulario de edición
        // document.getElementById('form_valores').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}); 

//Faltan moficaciones ne la parte de editar

 // suma todo TODO despues loresta al total y compara si el resultado es mayor o igual a la meta da que se esta 
   // cuempliendo si el resultado es menor da que la meta esta incunprida Quien establece el plazo de la meta? 
   // es automatico a  un mes es por mes automatico se va sumando en unregistro al finalizar el mes se muestran 
   // los datos de cada categotia, abajo de todo se muestra historico
   //   El cierre se hace automaticamente a fin de mes y se agrega al listado
// Hacer una qry que sume todo que la fecha se registre con java y el cierre se haga desde ai

async function sumar_total_gastos(){
    try { fetch('localhost4000/suma_total', {
    method : 'get',
    headers: {'Content-Type', 'application/json'}
    })
                      
}catch{

    }
    
}

async function sumar_total_gastos() {
    try {
        const response = await fetch('http://localhost:4000/traer_valor_meta'); // Ruta de lectura de montos
        const data = await response.json();
        // Mostrar los valores
        valorInicialMostrado.textContent = `Valor Inicial: ${data.valor total}`;
        metaAhorroMostrada.textContent = `Meta de Ahorro: ${data.meta_ahorro}`;
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

