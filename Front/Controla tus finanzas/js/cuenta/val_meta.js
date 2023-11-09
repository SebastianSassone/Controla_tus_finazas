//Agregar en anbas que cuando se guarden los cambios deje de ser un input y vuelva a ser una valor normal un p
//Y lo del gasto total
   // suma todo TODO despues loresta al total y compara si el resultado es mayor o igual a la meta da que se esta 
   // cuempliendo si el resultado es menor da que la meta esta incunprida Quien establece el plazo de la meta? 
   // es automatico a  un mes es por mes automatico se va sumando en unregistro al finalizar el mes se muestran 
   // los datos de cada categotia, abajo de todo se muestra historico
   // El cierre se hace automaticamente a fin de mes y se agrega al listado
   // Hacer una qry que sume todo que la fecha se registre con java y el cierre se haga desde ai
   // Agregar el guardar directamente y no solo desde editar y que antes de pedir que se ingrse el valor deve consulta 
   // si esta o no ya cargado en caso de estarlo no deve mostrar el formulario podria ser un boolean

//Ingresar valor inicial y meta de ahorro
// Variables para los elementos HTML
const montoInicialMostrado = document.getElementById('montoInicialMostrado');
const metaAhorroMostrada = document.getElementById('metaAhorroMostrada');
const editarBt = document.getElementById('editarBt');
const eliminarBt = document.getElementById('eliminarBt');
const guardarCambiosBt = document.getElementById('guardarCambiosBt');

window.addEventListener('load', () => {
    cargarYMostrarValoresDesdeAPI();
});

editarBt.addEventListener('click', () => {
    habilitarEdicionValMeta();
});

guardarCambiosBt.addEventListener('click', () => {
    guardarCambiosValMeta();
});
//Control de val meta

// Variable para controlar el modo de edición
let modoEdit = false;

//Variables para calcular meta de ahorro cumplida

let mont_inicial = 0;

let met_ahorro = 0;

console.log(' id desde val meta' + id);

// Obtener referencias a los elementos del formulario
const formIngresoValores = document.getElementById('form_ingreso_valores');
// Variables para los campos de entrada del formulario

// Agregar un evento de escucha al formulario
formIngresoValores.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la acción de envío predeterminada

    let monto_inicial = document.getElementById('monto_inicial').value;
    let meta_ahorro = document.getElementById('meta_ahorro').value;

    try {
        const noteData = { monto_inicial, meta_ahorro};
        await fetch('http://localhost:4000/guardar_valor_meta', {
            method: 'POST', // Usar el método POST para crear nuevos datos
            headers: {
                'Content-Type': 'application/json',
            },
            //Toma los valores pasados desde el front como null se guardan en la base d atos desde
            //post man no
            body: JSON.stringify(noteData),
        });

         console.log(monto_inicial);
         console.log(meta_ahorro);
        // Recargar y mostrar los valores actualizados desde la API
        cargarYMostrarValoresDesdeAPI();
        // Ocultar el formulario de edición
        // document.getElementById('form_valores').style.display = 'none';
    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}); 

// Función para cargar y mostrar los valores desde la API
async function cargarYMostrarValoresDesdeAPI() {
    try {
        const response = await fetch('http://localhost:4000/traer_valor_meta'); // Ruta de lectura de montos
        const data = await response.json();

        console.log(data);
       
        data.forEach((entry) => {
        mont_inicial = entry.monto_inicial;
        met_ahorro = entry.meta_ahorro;
        console.log(mont_inicial);
        console.log(met_ahorro);
           
        if(mont_inicial || met_ahorro > 0){
        formIngresoValores.style.display = 'none';
        }

        // Mostrar los valores
        montoInicialMostrado.textContent = entry.valor_inicial;
        metaAhorroMostrada.textContent =  entry.meta_ahorro; 
        });
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

function crearInputsDinamicosValMeta() {
    // Crea elementos input para cada campo de edición
    let nuevoMonto = document.createElement('input');
    nuevoMonto.type = 'text';
    nuevoMonto.value = montoInicialMostrado.textContent;

    let nuevaMeta = document.createElement('input');
    nuevaMeta.type = 'text';
    nuevaMeta.value = metaAhorroMostrada.textContent;

    // Reemplaza los elementos HTML existentes con los inputs dinámicos
    montoInicialMostrado.replaceWith(nuevoMonto);
    metaAhorroMostrada.replaceWith(nuevaMeta);
}

// Función para habilitar el modo de edición
function habilitarEdicionValMeta() {
    modoEdit = true;
    editarBt.style.display = 'none';
    eliminarBt.style.display = 'none';
    guardarCambiosBt.style.display = 'inline-block';

   crearInputsDinamicosValMeta(); 
    // Habilitar la edición de los campos
}

// Función para guardar los cambios y deshabilitar el modo de edición
async function guardarCambiosValMeta() {
    modoEdit = false;
    editarBt.style.display = 'inline-block';
    eliminarBt.style.display = 'inline-block';
    guardarCambiosBt.style.display = 'none';
    // Deshabilitar la edición de los campos
    montoInicialMostrado.setAttribute('readonly', true);
    metaAhorroMostrada.setAttribute('readonly', true);
    // Obtener los valores editados
    const nuevoMontoInicial = montoInicialMostrado.value;
    const nuevaMetaAhorro = metaAhorroMostrada.value;
    try {
        // Realiza una solicitud para actualizar los cambios en la API (Debes implementar esta función)
        await fetch('http://localhost:4000/actualizar_valor_meta/{id}', {
            method: 'PUT', // Usar el método PUT para actualizar
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ monto_inicial: nuevoMontoInicial, meta_ahorro: nuevaMetaAhorro }),
        });
        // Recargar y mostrar los valores actualizados desde la API
        cargarYMostrarValoresDesdeAPI();
       
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}        

function mostrarTotalGastosYmeta(){
async function sumar_total_gastos(){
    try { 
       const response = await fetch('http://localhost:4000/suma_total');
       const data = await response.json() 

       let total_gastos = data; 

       if(total_gastos <= met_ahorro ){console.log('Meta de ahorro cumplida')
          }else{
          console.log('Meta de ahorro no cumplida')};  
       }catch (error) {
       console.error('Error al cargar los valores: ', error);
    };
};

sumar_total_gastos()

let gastos_acumulados = val_inicial - total_gastos;

console.log('El total de los gasto asta la actuidad es de ', gastos_acumulados);
}



