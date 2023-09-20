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
        const cancelarBtn = document.getElementById('cancelarBtn');
        const eliminarBtn = document.getElementById('eliminarBtn');

        // Variable para controlar el modo de edición
        let modoEdicion = false;

        // Función para cargar los datos desde la API usando Fetch
        async function cargarDatosDesdeAPI() {
            try {
                const response = await fetch('http://localhost:4000/datos_cuenta'); // Ruta de lectura de cuenta
                const data = await response.json();
                // Actualiza los elementos HTML con los datos de la cuenta
                for (let i = 0; i < data.length; i++) {
            
                    nombreElement.textContent = data[i].name;
                    apellidoElement.textContent = data[i].lastname;
                    emailElement.textContent = data[i].email}

                    console.log(data)


                

            
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
        async function guardarCambios() {
            modoEdicion = false;
            editarBtn.style.display = 'inline-block';
            guardarBtn.style.display = 'none';
            cancelarBtn.style.display = 'none';
            // Deshabilita la edición de los campos
            nombreElement.contentEditable = false;
            apellidoElement.contentEditable = false;
            emailElement.contentEditable = false;
            // Obtener los nuevos valores editados
            const nuevoNombre = nombreElement.textContent;
            const nuevoApellido = apellidoElement.textContent;
            const nuevoEmail = emailElement.textContent;
            try {
                // Realiza una solicitud para actualizar los cambios en la API (Debes implementar esta función)
                await fetch('http://localhost:4000/actualizar_user/{id}', {
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
        async function eliminarCuenta() {
            try {
                // Realiza una solicitud para eliminar la cuenta en la API (Debes implementar esta función)
                await fetch('http://localhost:4000/eliminar_cuenta/{id}', {
                    method: 'DELETE', // Usar el método DELETE para eliminar
                });
                // Redirigir al usuario a una página adecuada después de eliminar la cuenta
                window.location.href = '/pagina_de_redireccion';
            } catch (error) {
                console.error('Error al eliminar la cuenta:', error);
            }
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
            document.getElementById('form_valores').style.display = 'block';
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
            // Volver a cargar y mostrar los valores originales desde la API
            cargarYMostrarValoresDesdeAPI();
            // Ocultar el formulario de edición
            document.getElementById('form_valores').style.display = 'none';
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
            body: JSON.stringify({ valor_inicial: nuevoValorInicial, meta_ahorro: nuevaMetaAhorro }),
        });

        // Recargar y mostrar los valores actualizados desde la API
        cargarYMostrarValoresDesdeAPI();

        // Ocultar el formulario de edición
        // document.getElementById('form_valores').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
});

       
