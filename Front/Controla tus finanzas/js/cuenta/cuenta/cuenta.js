const nombreElement = document.getElementById('nombre');
const apellidoElement = document.getElementById('apellido');
const emailElement = document.getElementById('email');
const editarBtn = document.getElementById('editarBtn');
const guardarBtn = document.getElementById('guardarBtn');
const eliminarBtn = document.getElementById('eliminarBtn');
const eliminarCuentaBtn = document.getElementById('eliminarCuenta');

// Variable para controlar el modo de edición
let modoEdicion = false;


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

// let id = 1;
// Función para cargar los datos desde la API usando Fetch
async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Ruta de lectura de cuenta
        // const response = await fetch('http://localhost:4000/datos_cuenta'); // Ruta de lectura de cuenta
        const data = await response.json();
        
            data.forEach((entry) => {
                
                nombreElement.innerHTML = entry.title; 
                // apellidoElement.innerHTML = entry.lastname;
                // emailElement.innerHTML = entry.email; 

        //    id = entry.id;
           console.log(id);
        
          });
        
            console.log(data);
            console.log(data.id);
        
        } catch (error) {

        console.error('Error al cargar los datos:', error);
    }
}

// Función para crear los elementos input dinámicos
function crearInputsDinamicos() {
    let nuevoNombreInput = document.createElement('input');
    nuevoNombreInput.type = 'text';
    nuevoNombreInput.value = nombreElement.textContent;

    let nuevoApellidoInput = document.createElement('input');
    nuevoApellidoInput.type = 'text';
    nuevoApellidoInput.value = apellidoElement.textContent;

    let nuevoEmailInput = document.createElement('input');
    nuevoEmailInput.type = 'email';
    nuevoEmailInput.value = emailElement.textContent;

    // nombreElement.replaceWith(nuevoNombreInput);
    // apellidoElement.replaceWith(nuevoApellidoInput);
    // emailElement.replaceWith(nuevoEmailInput);

    nombreElement.style.display = 'none';
    apellidoElement.style.display = 'none';
    emailElement.style.display = 'none';
}

// Función para habilitar el modo de edición
function habilitarEdicion() {
    modoEdicion = true;

    document.getElementById('editarBtn').style.display = 'none';

    document.getElementById('guardarBtn').style.display = 'inline-block';

    crearInputsDinamicos();
}

// Función para guardar los cambios y deshabilitar el modo de edición
async function guardarCambios() {
    modoEdicion = false;

    document.getElementById('editarBtn').style.display = 'inline-block';
  
    document.getElementById('guardarBtn').style.display = 'none';
 
    nuevoNombreInput.style.display = 'none'
    nuevoApellidoInput.style.display = 'none'
    nuevoEmailInput.style.display = 'none'

    nombreElement.style.display = 'flex';
    apellidoElement.style.display = 'flex';
    emailElement.style.display = 'flex';

    nombreElement.innerHTML = nuevoNombreInput.value
    apellidoElement.innerHTML = nuevoApellidoInput.value
    emailElement.innerHTML = nuevoEmailInput.value

    const nuevoNombre = nuevoNombreInput.value
    const nuevoApellido = nuevoApellidoInput.value
    const nuevoEmail = nuevoEmailInput.value
    try {
      
        await fetch(`http://localhost:4000/actualizar_user/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: nuevoNombre, apellido: nuevoApellido, email: nuevoEmail }),
        });
    
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
       
// Cerrar sesion

document.getElementById('cerrarSesionBtn').addEventListener('click', function() {
    fetch('http://localhost:4000/cerrar_sesion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.status === 200) {
         
        console.log('Sesión cerrada exitosamente');

        registro_realizado = 0; 
        sesion_en_curso = 0;

        } else if (response.status === 401) {
            console.log('No hay sesión activa para cerrar');
        } else {
            console.error('Error al cerrar sesión');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
});  
