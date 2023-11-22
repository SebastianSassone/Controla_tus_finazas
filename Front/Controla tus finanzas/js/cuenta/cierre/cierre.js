window.addEventListener('load', () => {
    consultarCierre();
})

//Agregar una columna a base tabla de ingreso que indica si forma parde su cierre o no en el caso de 
//hacerlo no se tiene en cuenta ese elemento, si no forma parte de un cierre se mostrara que hace falta 
//relizar un cierre, en caso cntrrio ademas en el filtro se preguntara si el valance tiene numero de fecha de 
//mes menor al mes actual y si fue echo un cierre en ese mes por defeto en ingreso se guardara no y despues se imrimra si
//a la hora de realizar el cierre, sino podemos preguntar por el cierre del mes anterior el cual 
//se le guarda fecha osea que se pregunta si el mes anterior al actual tiene un cierre en la tabla cierre
//de no ser asi se le activa el cierre al usurio y de ser asi no se hace.


monto_v = mont_inicial; 
meta_v = met_ahorro; 
gastos_v = total_gastos; 
ahorro_v = total_ahorro; 
meta_cumplida = meta_cumplida; 

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
  

      for (const entry of data) {
        const fechaParts = entry.fecha.split('/');
        if (fechaParts.length === 3) {
          const mesValance = fechaParts[1];
          if (mesValance != mesActual) {
            let monto = document.getElementById('monto_in'); 
            let meta = document.getElementById('met_aho'); 
            let gastos = document.getElementById('total_gas'); 
            let ahorro = document.getElementById('total_aho'); 

            monto.value = monto_v;
            meta.value = meta_v;
            gastos.value = gastos_v;
            ahorro.value = ahorro_v;
            fecha = entry.fecha;

          }
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

// Guardar cierre

//Cargar el formulario con los valores que se taen desde back mas las operaciones echas en el front

let section_form_cierre = document.getElementById('section_form_cierre'); 

let form_cierre = document.getElementById('form_cierre'); 

form_cierre.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la acción de envío predeterminada
    
    monto = monto_v;
    meta = meta_v;
    gastos = gastos_v;
    ahorro = ahorro_v;
    fecha =  fech;
    meta_cumplida = meta_cump;
  
    try {
        const noteData = {monto,  meta, gastos, ahorro, fecha, meta_cumplida};
        await fetch('http://localhost:4000/guardar_cierre', {
            method: 'POST', // Usar el método POST para crear nuevos datos
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
