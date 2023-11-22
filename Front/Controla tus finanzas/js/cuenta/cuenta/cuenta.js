const nombreElement = document.getElementById('nombre');
const apellidoElement = document.getElementById('apellido');
const emailElement = document.getElementById('email');
const editarBtn = document.getElementById('editarBtn');
const guardarBtn = document.getElementById('guardarBtn');
const eliminarBtn = document.getElementById('eliminarBtn');
const eliminarCuentaBtn = document.getElementById('eliminarCuenta');

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

let id = 0;

async function cargarDatosDesdeAPI() {
    try {
        const response = await fetch('http://localhost:4000/datos_cuenta'); // Ruta de lectura de cuenta
        const data = await response.json();
        
            data.forEach((entry) => {
                
                nombreElement.value   = entry.name; 
                apellidoElement.value = entry.lastname;
                emailElement.value    = entry.email; 

           id = entry.id;
           console.log(id);
        
          });
        
            console.log(data);
            console.log(data.id);
        
        } catch (error) {

        console.error('Error al cargar los datos:', error);
    }
}

function habilitarEdicion() {
    modoEdicion = true;
    document.getElementById('editarBtn').style.display = 'none';
    document.getElementById('guardarBtn').style.display = 'inline-block';

    nombreElement.classList.remove('nombre');
    apellidoElement.classList.remove('apellido');
    emailElement.classList.remove('email');

    nombreElement.removeAttribute('readonly');
    apellidoElement.removeAttribute('readonly');
    emailElement.removeAttribute('readonly');
}

async function guardarCambios() {
    modoEdicion = false;

    document.getElementById('editarBtn').style.display = 'inline-block';
    document.getElementById('guardarBtn').style.display = 'none';

    nombreElement.classList.add('nombre');
    apellidoElement.classList.add('apellido');
    emailElement.classList.add('email');

    nombreElement.setAttribute('readonly', true);
    apellidoElement.setAttribute('readonly', true);
    emailElement.setAttribute('readonly', true);

    const nuevoNombre    =  nombreElement.value;
    const nuevoApellido  =  apellidoElement.value;
    const nuevoEmail     =  emailElement.value;
    try {
      
        await fetch(`http://localhost:4000/actualizar_user/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nuevoNombre, lastname: nuevoApellido, email: nuevoEmail }),
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
        sesion_en_curso    = 0;

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
