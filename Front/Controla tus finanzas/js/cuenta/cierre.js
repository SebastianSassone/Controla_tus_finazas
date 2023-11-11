window.addEventListener('load', () => {
    consultarCierre();
})

// Consultar cierre

async function consultarCierre() {
    try {
      const response = await fetch('http://localhost:4000/valances');
      if (!response.ok) {
        throw new Error('Error al obtener los datos.');
      }
  
      const data = await response.json();
      const mesActual = new Date().toLocaleString('es-ES', { month: 'numeric' });
  
      // Verificar si la fecha del valance es igual al mes actual
      for (const entry of data) {
        const fechaParts = entry.fecha.split('/');
        if (fechaParts.length === 3) {
          const mesValance = fechaParts[1];
          if (mesValance === mesActual) {
            console.log('Fecha actual y fecha del valance son iguales:', entry.fecha);
          } else {
            console.log('Mes diferente:', entry.fecha);
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
    
    let monto = document.getElementById('monto_in').value; 
    let meta = document.getElementById('met_aho').value; 
    let gastos = document.getElementById('total_gas').value; 
    let ahorro = document.getElementById('total_aho').value; 
  
    fecha = tolocaltimedate;
    metacumplida = si-no;

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

    } catch (error) {
        console.error('Error al guardar los datos:', error);
    }
}); 
