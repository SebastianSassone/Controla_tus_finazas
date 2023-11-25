window.addEventListener('load', () => {
    consultarCierre();
})

let section_form_cierre = document.getElementById('section_form_cierre'); 

section_form_cierre.style.display = 'none';

import { mont_inicial, met_ahorro, total_gastos, total_ahorro, meta_cumplida } from '../monto_meta/monto_meta';

monto_v = mont_inicial; 
meta_v = met_ahorro; 
gastos_v = total_gastos; 
ahorro_v = total_ahorro; 
meta_cumplida = meta_cumplida; 
let fech = "fecha"; 

//  let monto_v = 340000; 
//  let meta_v = 200000; 
//  let gastos_v = 130000; 
//  let ahorro_v = 210000;
//  let fech = "algo"; 
// let meta_cump =   "Si"; 

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
        console.log(`Se encontró un cierre para la fecha ${fecha}.`);
      
      } else {
        console.log(`No se encontró un cierre para la fecha ${fecha}.`);
        let section_form_cierre = document.getElementById('section_form_cierre'); 
        section_form_cierre.style.display = 'flex';
        let monto = document.getElementById('monto_in'); 
        let meta = document.getElementById('met_aho'); 
        let gastos = document.getElementById('total_gas'); 
        let ahorro = document.getElementById('total_aho'); 

        monto.value = monto_v;
        meta.value = meta_v;
        gastos.value = gastos_v;
        ahorro.value = ahorro_v;
      }
    } catch (error) {
      console.error('Error al verificar el cierre:', error);
    }
  }
  

// Guardar cierre

let form_cierre = document.getElementById('form_cierre'); 

form_cierre.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    monto = monto_v;
    meta = meta_v;
    gastos = gastos_v;     
    ahorro = ahorro_v;
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
