const montoInicialMostrado = document.getElementById('montoInicialMostrado');
const metaAhorroMostrada = document.getElementById('metaAhorroMostrada');
const editarBt = document.getElementById('editarBt');
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

let nuevoMonto;
let nuevaMeta;

let modoEdit = false;

// Data garfico

let data = [];

//Calcular meta de ahorro cumplida

let mont_inicial = 0;
let met_ahorro = 0;
let total_gastos = 0;
let total_ahorro = 0;
let meta_cumplida = "";

if(mont_inicial == 0 || met_ahorro == 0) {
    let div_valores = document.getElementById('div_valores');
    div_valores.style.display = 'none';
}

// console.log(' id desde val meta  ' + id);

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
        
        let div_valores = document.getElementById('div_valores');
        div_valores.style.display = 'flex';

        montoInicialMostrado.value = entry.monto_inicial;
        metaAhorroMostrada.value =  entry.meta_ahorro; 

        sumarTotalGastos();

        mont_inicial = entry.monto_inicial;
        met_ahorro = entry.meta_ahorro; 
    }
        });
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

function habilitarEdicionValMeta() {
    modoEdit = true;
    editarBt.style.display = 'none';
    eliminarBt.style.display = 'none';
    guardarCambiosBt.style.display = 'inline-block';

    montoInicialMostrado.classList.remove('montoInicialMostrado');
    metaAhorroMostrada.classList.remove('metaAhorroMostrada');
    
    montoInicialMostrado.removeAttribute('readonly');
    metaAhorroMostrada.removeAttribute('readonly');

}

async function guardarCambiosValMeta() {
    modoEdit = false;
    editarBt.style.display = 'inline-block';
    eliminarBt.style.display = 'inline-block';
    guardarCambiosBt.style.display = 'none';

    montoInicialMostrado.classList.add('montoInicialMostrado');
    metaAhorroMostrada.classList.add('metaAhorroMostrada');
    
    montoInicialMostrado.setAttribute('readonly', true);
    metaAhorroMostrada.setAttribute('readonly', true);

    const nuevoMontoInicial = montoInicialMostrado.value;
    const nuevaMetaAhorro   = metaAhorroMostrada.value;

    try {
        
        await fetch(`http://localhost:4000/actualizar_valor_meta/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ monto_inicial: nuevoMontoInicial, meta_ahorro: nuevaMetaAhorro }),
        });
        
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

  async function sumarTotalGastos() {
    try {
      const response = await fetch('http://localhost:4000/valances_ingreso');
      if (!response.ok) {
        throw new Error('Error al obtener los datos.');
      }
  
      const data = await response.json();
  
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth() + 1;
  
      const resultadosFiltrados = data.filter(entry => {
        const fechaParts = entry.fecha.split('/');
        if (fechaParts.length === 3) {
          const mes = parseInt(fechaParts[1], 10);
          return mes === mesActual;
        }
        return false;
      });
  
      resultadosFiltrados.forEach((entry) => {
        total_gastos += entry.valor;
      });

      console.log('La suma total del valor de los elementos del mes actual es:', total_gastos);
      // if(total_gastos > 0){
      // calcular_gastos()}

    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
  

function calcular_gastos(){
  
        mont_inicial 
        met_ahorro 
        total_gastos;

       if(total_gastos <= met_ahorro ){
        console.log('Meta de ahorro cumplida');
          total_ahorro = mont_inicial - total_gastos;
          meta_cumplida = "Si";
          }else{
          console.log('Meta de ahorro no cumplida');
          total_ahorro = mont_inicial - total_gastos;
          meta_cumplida = "No";
        };  
                  
        data.push(total_gastos);
        data.push(total_ahorro);

          console.log('El total de los gasto asta la actuidad es de ', total_gastos);
  
        };

//Grafico

function mostarGraficoCuenta(){
const DATA_COUNT = 2;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const datos = {
    labels: ['Gasto', 'Ahorro'],
    datasets: [
        {
            label: 'Dataset 1',
            data , 
            backgroundColor: [
              'Black',
              'Green'
            ],
        }
    ]
};

const config = {
    type: 'doughnut',
    data: datos,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            }
        }
    },
};

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config);
};}

// promesa hgastos
async function waitForCounterToReach() {

  while (total_gastos <= 0) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
  }
    calcular_gastos(); 
    mostarGraficoCuenta();
  }

// export { mont_inicial, met_ahorro, total_gastos, total_ahorro, meta_cumplida};        




