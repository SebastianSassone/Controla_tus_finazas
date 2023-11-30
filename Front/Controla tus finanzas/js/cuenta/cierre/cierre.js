window.addEventListener('load', () => {
    consultarCierre();
})

let section_form_cierre = document.getElementById('section_form_cierre'); 

section_form_cierre.style.display = 'none';
  
let monto_v = 0; 
let meta_v = 0; 
let tot_gas = 10;
let tot_ahorro = 0; 
let meta_cump = "Si"; 
let fech = "fecha"; 

// Consultar cierre
  async function consultarCierre() {
    try {
      const response = await fetch('http://localhost:4000/valances_ingreso');
      if (!response.ok) {
        throw new Error('Error al obtener los datos.');
      }
  
      const data = await response.json();
      const mesActual = new Date().toLocaleString('es-ES', { month: 'numeric' });
  
      let fechaMenorAmesActualEncontrada = false;
  
      for (const entry of data) {
        const fechaParts = entry.fecha.split('/');
        if (fechaParts.length === 3) {
          const mesValance = fechaParts[1];
          if (mesValance !== mesActual) {
            fechaMenorAmesActualEncontrada = true;
            const fechaMenorAmesActual = entry.fecha;
            fech = entry.fecha;
            await verificarCierre(fechaMenorAmesActual);
          }
        }
      }
  
      if (!fechaMenorAmesActualEncontrada) {
    
        console.log('No hay ingresos con fecha anterior al mes actual.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  async function verificarCierre(fecha) {
    try {
      const response = await fetch('http://localhost:4000/traer_cierre');
      const data = await response.json();
  
      const mesActual = new Date().toLocaleString('es-ES', { month: 'numeric' });
  
      const cierreEncontrado = data.find((entry) => {
        const fechaParts = entry.fecha.split('/');
        return fechaParts.length === 3 && fechaParts[1] === mesActual;
      });
  
      if (cierreEncontrado) {
        console.log(`No se encontró un cierre para la fecha ${fecha}.`);
        traerMontoMeta();
        sumarTotalGastos(fecha);
      } else {
        console.log(`Se encontró un cierre para la fecha ${fecha}.`);
      }
    } catch (error) {
      console.error('Error al verificar el cierre:', error);
    }
  }
  
  //Calcular total gastos

  async function sumarTotalGastos(fechaVerificada) {
    try {
      const response = await fetch('http://localhost:4000/valances_ingreso');
      if (!response.ok) {
        throw new Error('Error al obtener los datos.');
      }
  
      const data = await response.json();
    
      console.log('Datos obtenidos:', data);
  
      const mesNumero = parseInt(fechaVerificada.split('/')[1], 10);
      console.log('Mes verificado:', mesNumero);

      const resultadosFiltrados = data.filter(entry => {
      const fechaParts = entry.fecha.split('/');
      if (fechaParts.length === 3) {
        const mes = parseInt(fechaParts[1], 10);
        return mes === mesNumero;
      }
       return false;
      });

      console.log('Resultados filtrados:', resultadosFiltrados);

      resultadosFiltrados.forEach((entry) => {
      console.log('Valor de ingreso:', entry.valor);
      tot_gas += entry.valor;
      });
  
      console.log('La suma total del valor de los elementos del mes verificado es:', tot_gas);
  
    } catch (error) {
      console.error('Ocurrió un error:', error);
    }
  }
  

  // Traer monto meta

  async function traerMontoMeta() {
    try {
        const response = await fetch('http://localhost:4000/traer_valor_meta'); // Ruta de lectura de montos
        const data = await response.json();

        console.log(data);
       
        data.forEach((entry) => {
        monto_v = entry.monto_inicial;
        meta_v = entry.meta_ahorro;
      })
       
    }catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}
  

// Guardar cierre

let form_cierre = document.getElementById('form_cierre'); 

form_cierre.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    monto = monto_v;
    meta = meta_v;
    gastos = tot_gas;     
    ahorro = tot_ahorro;
    fecha = fech;
    meta_cumplida = meta_cump;
    
    try {
      const noteData = {monto,  meta, gastos, ahorro, fecha, meta_cumplida};
      await fetch('http://localhost:4000/guardar_cierre', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(noteData),
        });
        
        section_form_cierre.style.display = 'none';  
        
        alert('Cierre realizado exito');

    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}); 

        // Calcular cierre
        
 function calcularGastosCierre(){
     
  monto_v;
  meta_v;
  tot_gas;

 if(tot_gas <= meta_v ){
    console.log('Meta de ahorro cumplida');
    tot_ahorro = monto_v - tot_gas;
    meta_cump = "Si";
    }else{
    console.log('Meta de ahorro no cumplida');
    tot_ahorro = monto_v - tot_gas;
    meta_cump = "No";
  }
     let section_form_cierre = document.getElementById('section_form_cierre'); 
      section_form_cierre.style.display = 'flex';
      let monto = document.getElementById('monto_in'); 
      let meta = document.getElementById('met_aho'); 
      let gastos = document.getElementById('total_gas'); 
      let ahorro = document.getElementById('total_aho'); 
      monto.value = monto_v;
      meta.value = meta_v;
      gastos.value = tot_gas;
      ahorro.value = tot_ahorro;
  };

  async function esperarTotalGastosCierre() {
    while (tot_gas <= 0) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
    }
    calcularGastosCierre(); 
    }
  
    esperarTotalGastosCierre();        