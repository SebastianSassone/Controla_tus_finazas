// Cerrar sesion


 // ARREGLAR
// const form_in_sec = document.getElementById('form_in_sec');

// form_in_sec.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   let email = document.getElementById('email').value;
//   let contraseña = document.getElementById('contraseña').value;

//  if (email.trim() === '' || contraseña.trim() === '') {
//     alert('Campos sin completar');
//     return;
//   }

//   try {
//     const noteData = {email, contraseña};
//     const response = await fetch('http://localhost:4000/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(noteData),
//     });

//     if (!response.ok) {
//       throw new Error('Error al agregar la nota.');
//     }

//     window.location.replace("http://127.0.0.1:5500/html/cuenta.html");
//     alert('Sesion iniciada');
//   } catch (error) {}
// });

// Editar datos 

const nombreElement = document.getElementById('nombre');
const apellidoElement = document.getElementById('apellido');
const emailElement = document.getElementById('email');
const editarBtn = document.getElementById('editarBtn');
const guardarBtn = document.getElementById('guardarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const eliminarBtn = document.getElementById('eliminarBtn');

// Variable para controlar el modo de edición
let modoEdicion = false;

// Función para cargar los datos desde la API usando Fetch
async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch('https://tu-api.com/cuenta');
        const data = await response.json();
        // Actualiza los elementos HTML con los datos de la cuenta
        nombreElement.textContent = data.nombre;
        apellidoElement.textContent = data.apellido;
        emailElement.textContent = data.email;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

// Función para habilitar el modo de edición
function habilitarEdicion() {
    modoEdicion = true;
    editarBtn.style.display = 'none';
    guardarBtn.style.display = 'inline-block';
    cancelarBtn.style.display = 'inline-block';
    // Habilita la edición de los campos
    nombreElement.contentEditable = true;
    apellidoElement.contentEditable = true;
    emailElement.contentEditable = true;
}

// Función para guardar los cambios y deshabilitar el modo de edición
function guardarCambios() {
    modoEdicion = false;
    editarBtn.style.display = 'inline-block';
    guardarBtn.style.display = 'none';
    cancelarBtn.style.display = 'none';
    // Deshabilita la edición de los campos
    nombreElement.contentEditable = false;
    apellidoElement.contentEditable = false;
    emailElement.contentEditable = false;
    // Realiza una solicitud para guardar los cambios en la API
    // (Debes implementar esta función)
    guardarCambiosEnAPI();
}

// Función para cancelar la edición y volver a cargar los datos originales
function cancelarEdicion() {
    modoEdicion = false;
    editarBtn.style.display = 'inline-block';
    guardarBtn.style.display = 'none';
    cancelarBtn.style.display = 'none';
    // Deshabilita la edición de los campos
    nombreElement.contentEditable = false;
    apellidoElement.contentEditable = false;
    emailElement.contentEditable = false;
    // Vuelve a cargar los datos desde la API para deshacer los cambios
    cargarDatosDesdeAPI();
}

// Función para eliminar la cuenta (Debes implementar esta función)
function eliminarCuenta() {
    // Realiza una solicitud para eliminar la cuenta en la API
    // (Debes implementar esta función)
    eliminarCuentaEnAPI();
}

// Agregar event listeners a los botones
editarBtn.addEventListener('click', habilitarEdicion);
guardarBtn.addEventListener('click', guardarCambios);
cancelarBtn.addEventListener('click', cancelarEdicion);
eliminarBtn.addEventListener('click', eliminarCuenta);

// Cargar los datos al cargar la página
cargarDatosDesdeAPI();


//Ingresar valor inicial y meta de ahorro

// Variables para los elementos HTML
const valorInicialMostrado = document.getElementById('valorInicialMostrado');
const metaAhorroMostrada = document.getElementById('metaAhorroMostrada');
const editarBt = document.getElementById('editarBt');
const eliminarBt = document.getElementById('eliminarBt');
const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
const cancelarEdicionBtn = document.getElementById('cancelarEdicionBtn');

// Variables para los campos de entrada del formulario
const valorInicialInput = document.getElementById('valorInicial');
const metaAhorroInput = document.getElementById('metaAhorro');

// Variable para controlar el modo de edición
let modoEdit = false;

// Función para cargar y mostrar los valores desde la API
async function cargarYMostrarValoresDesdeAPI() {
    try {
        const response = await fetch('https://tu-api.com/valores');
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

    // Enviar los cambios a la API (Debes implementar esta función)
    await enviarCambiosAPI(nuevoValorInicial, nuevaMetaAhorro);

    // Recargar y mostrar los valores actualizados desde la API
    cargarYMostrarValoresDesdeAPI();
}

// Función para cancelar la edición y volver a cargar los valores originales
function cancelarEdicion() {
    modoEdit = false;
    editarBt.style.display = 'inline-block';
    eliminarBt.style.display = 'inline-block';
    guardarCambiosBtn.style.display = 'none';
    cancelarEdicionBtn.style.display = 'none';
    // Deshabilitar la edición de los campos
    valorInicialInput.setAttribute('readonly', true);
    metaAhorroInput.setAttribute('readonly', true);
    // Recargar y mostrar los valores originales desde la API
    cargarYMostrarValoresDesdeAPI();
}

// Función para eliminar los valores (Debes implementar esta función)
async function eliminarValores() {
    // Enviar una solicitud a la API para eliminar los valores
    // (Debes implementar esta función)
    await eliminarValoresAPI();
    // Limpiar los campos después de eliminar
    valorInicialMostrado.textContent = 'Valor Inicial:';
    metaAhorroMostrada.textContent = 'Meta de Ahorro:';
}

// Agregar event listeners a los botones
editarBt.addEventListener('click', habilitarEdicion);
guardarCambiosBtn.addEventListener('click', guardarCambios);
cancelarEdicionBtn.addEventListener('click', cancelarEdicion);
eliminarBt.addEventListener('click', eliminarValores);

// Cargar y mostrar los valores al cargar la página
cargarYMostrarValoresDesdeAPI();