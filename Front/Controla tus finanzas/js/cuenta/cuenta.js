// Cerrar sesion

document.getElementById('cerrarSesionBtn').addEventListener('click', function() {
    // Realizar una solicitud Fetch para cerrar la sesión
    fetch('http://localhost:4000/cerrar_sesion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 200) {
            // La sesión se cerró exitosamente
            console.log('Sesión cerrada exitosamente');
            // Puedes redirigir al usuario a la página de inicio de sesión u otra página
        } else if (response.status === 401) {
            // No hay sesión activa para cerrar
            console.log('No hay sesión activa para cerrar');
        } else {
            // Manejar otros códigos de estado según sea necesario
            console.error('Error al cerrar sesión');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
});

// Editar datos 
// Variables para los elementos HTML
        const nombreElement = document.getElementById('nombre');
        const apellidoElement = document.getElementById('apellido');
        const emailElement = document.getElementById('email');
        const editarBtn = document.getElementById('editarBtn');
        const guardarBtn = document.getElementById('guardarBtn');
        const eliminarBtn = document.getElementById('eliminarBtn');
        const eliminarCuentaBtn = document.getElementById('eliminarCuentaBtn');

// Variable para controlar el modo de edición
let modoEdicion = false;

// Añadir eventos a botones y demas

window.addEventListener("load", () => {
    cargarDatosDesdeAPI();
})

editarBtn.addEventListener('click', () => {
    habilitarEdicion();
})

guardarBtn.addEventListener('click', () => {
    guardarCambios();
} )

eliminarCuentaBtn.addEventListener('click', () => {
    if (window.confirm("Esta seguro de eliminar su cuenta?")) {
        eliminarcuenta();
      }}
)

let id = 0;
// Función para cargar los datos desde la API usando Fetch
async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch('http://localhost:4000/datos_cuenta'); // Ruta de lectura de cuenta
        const data = await response.json();
        // Actualiza los elementos HTML con los datos de la cuenta

            // Actualiza los elementos HTML con los datos de la cuenta
        data.forEach((entry) => {
           nombreElement.innerHTML = entry.name; 
           apellidoElement.innerHTML = entry.lastname;
           emailElement.innerHTML = entry.email;

          });
            
            console.log(data);
        
        } catch (error) {

        console.error('Error al cargar los datos:', error);
    }
}

// Función para crear los elementos input dinámicos
function crearInputsDinamicos() {
    // Crea elementos input para cada campo de edición
    let nuevoNombreInput = document.createElement('input');
    nuevoNombreInput.type = 'text';
    nuevoNombreInput.value = nombreElement.textContent;

    let nuevoApellidoInput = document.createElement('input');
    nuevoApellidoInput.type = 'text';
    nuevoApellidoInput.value = apellidoElement.textContent;

    let nuevoEmailInput = document.createElement('input');
    nuevoEmailInput.type = 'email';
    nuevoEmailInput.value = emailElement.textContent;

    // Reemplaza los elementos HTML existentes con los inputs dinámicos
    nombreElement.replaceWith(nuevoNombreInput);
    apellidoElement.replaceWith(nuevoApellidoInput);
    emailElement.replaceWith(nuevoEmailInput);
}

// Función para habilitar el modo de edición
function habilitarEdicion() {
    modoEdicion = true;
    // Oculta el botón de editar
    document.getElementById('editarBtn').style.display = 'none';
    // Muestra el botón de guardar y cancelar
    document.getElementById('guardarBtn').style.display = 'inline-block';
    // Llama a la función para crear los inputs dinámicos
    crearInputsDinamicos();
}

// Función para guardar los cambios y deshabilitar el modo de edición
async function guardarCambios() {
    modoEdicion = false;
    // Muestra el botón de editar
    document.getElementById('editarBtn').style.display = 'inline-block';
    // Oculta el botón de guardar y cancelar
    document.getElementById('guardarBtn').style.display = 'none';
    document.getElementById('cancelarBtn').style.display = 'none';
    // Deshabilita la edición de los campos
    nombreElement.readOnly = true;
    apellidoElement.readOnly = true;
    emailElement.readOnly = true;
    // Obtener los nuevos valores editados
    const nuevoNombre = nombreElement.value;
    const nuevoApellido = apellidoElement.value;
    const nuevoEmail = emailElement.value;
    try {
        // Realiza una solicitud para actualizar los cambios en la API (Debes implementar esta función)
        await fetch(`http://localhost:4000/actualizar_user/${id}`, {
            method: 'PUT', // Usar el método PUT para actualizar
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nuevoNombre, apellido: nuevoApellido, email: nuevoEmail }),
        });
        // Recargar los datos actualizados desde la API
        cargarDatosDesdeAPI();
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}

async function eliminarcuenta() {
    try {
      const response = await fetch(`http://localhost:4000/eliminar_cuenta/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar los datos.');
      }
  
      alert('Datos eliminados exitosamente.');
      tbody.removeChild(row);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al eliminar los datos.');
    }
  }
       
