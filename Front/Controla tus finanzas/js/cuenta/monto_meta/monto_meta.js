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

eliminarBt.addEventListener('click',  () => {
    eliminarMontMeta();
})


let modoEdit = false;

//Variables para calcular meta de ahorro cumplida

let mont_inicial = 0;
let met_ahorro = 0;
let total_gastos = 0;
let total_ahorro = 0;
let meta_cumplida = "";
let id = 0;

console.log(' id desde val meta  ' + id);

const formIngresoValores = document.getElementById('form_ingreso_valores');


formIngresoValores.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    let monto_inicial = document.getElementById('monto_inicial').value;
    let meta_ahorro = document.getElementById('meta_ahorro').value;

    try {
        const noteData = { monto_inicial, meta_ahorro};
        await fetch('http://localhost:4000/guardar_valor_meta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
           
            body: JSON.stringify(noteData),
        });

         console.log(monto_inicial);
         console.log(meta_ahorro);
        
        cargarYMostrarValoresDesdeAPI();
        
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
           
        if(mont_inicial != 0 || met_ahorro != 0){
        formIngresoValores.style.display = 'none';
        

        montoInicialMostrado.textContent = entry.monto_inicial;
        metaAhorroMostrada.textContent =  entry.meta_ahorro; 

        let tot_gas_in = total_gastos;

        calcular_gastos(monto_inicial, meta_ahorro, tot_gas_in);
    }
        });
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

function crearInputsDinamicosValMeta() {

    let nuevoMonto = document.createElement('input');
    nuevoMonto.type = 'text';
    nuevoMonto.value = montoInicialMostrado.textContent;

    let nuevaMeta = document.createElement('input');
    nuevaMeta.type = 'text';
    nuevaMeta.value = metaAhorroMostrada.textContent;

    
    montoInicialMostrado.style.display = "none";
    metaAhorroMostrada.style.display = "none";

    montoInicialMostrado.insertAdjacentElement('afterend', nuevaMeta);
    metaAhorroMostrada.insertAdjacentElement('afterend', nuevoMonto);
}


function habilitarEdicionValMeta() {
    modoEdit = true;
    editarBt.style.display = 'none';
    eliminarBt.style.display = 'none';
    guardarCambiosBt.style.display = 'inline-block';

   crearInputsDinamicosValMeta(); 
    
}

// Función para guardar los cambios y deshabilitar el modo de edición
async function guardarCambiosValMeta() {
    modoEdit = false;
    editarBt.style.display = 'inline-block';
    eliminarBt.style.display = 'inline-block';
    guardarCambiosBt.style.display = 'none';

    montoInicialMostrado.setAttribute('readonly', true);
    metaAhorroMostrada.setAttribute('readonly', true);

    nuevaMeta.style.display = "none";
    nuevoMonto.style.display = "none";

    montoInicialMostrado.style.display = "flex";
    metaAhorroMostrada.style.display = "flex"; 
    
    montoInicialMostrado.innerHTML = nuevaMeta.value;
    metaAhorroMostrada.innerHTML = nuevoMonto.value;

    const nuevoMontoInicial = nuevaMeta.value;
    const nuevaMetaAhorro = nuevoMonto.value;
    try {
        
        await fetch(`http://localhost:4000/actualizar_valor_meta/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ monto_inicial: nuevoMontoInicial, meta_ahorro: nuevaMetaAhorro }),
        });
        
          nuevoMonto.replaceWith(montoInicialMostrado);
          nuevaMeta.replaceWith(metaAhorroMostrada);
          cargarYMostrarValoresDesdeAPI();
       
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}        

async function eliminarMontMeta() {
    try {
      const response = await fetch(`http://localhost:4000/borrar_valor_meta/${id}`, {
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

function calcular_gastos(mont, met, tot_gas){
  
        mont_inicial = mont;
        met_ahorro = met;
        total_gastos = tot_gas;

       if(total_gastos <= met_ahorro ){
        console.log('Meta de ahorro cumplida');
          total_ahorro = mont_inicial - total_gastos;
          meta_cumplida = "Si";
          }else{
          console.log('Meta de ahorro no cumplida');
          total_ahorro = mont_inicial - total_gastos;
          meta_cumplida = "No";
        };  
                  
          console.log('El total de los gasto asta la actuidad es de ', gastos_acumulados);
  
        };

        




