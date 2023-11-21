const tbody = document.querySelector("#category-list tbody");
let isGrayRow = false;

function filtrarMes(data, mesSeleccionado) {
  const mesNumero = parseInt(mesSeleccionado, 10);

  if (mesNumero < 1 || mesNumero > 12) {
    console.log('Mes no seleccionado');
    return;
  }

  const resultadosFiltrados = data.filter(entry => {
    const fechaParts = entry.fecha.split('/');
    if (fechaParts.length === 3) {
      const mes = parseInt(fechaParts[1], 10);
      return mes === mesNumero;
    }
    return false;
  });

  // Borra las filas actuales antes de mostrar las nuevas.
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  resultadosFiltrados.forEach((entry) => {
    let row = document.createElement("tr");
    row.dataset.id = entry.id;
    row.innerHTML =
      "<td>" + entry.producto + "</td>" +
      "<td>" + entry.categoria + "</td>" +
      "<td>" + entry.subcategoria + "</td>" +
      "<td>" + entry.valor + "</td>" +
      "<td>" + entry.fecha + "</td>" +
      "<td>" + entry.hora + "</td>";

    if (isGrayRow) {
      row.classList.add("gray-row");
    }

    tbody.appendChild(row);

    isGrayRow = !isGrayRow;
  });
}

async function agregarDetalle() {
  try {
    const response = await fetch('http://localhost:4000/valances_ingreso');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();

    const select = document.getElementById('select_mes');
    const mesSeleccionado = select.value;

    filtrarMes(data, mesSeleccionado);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Agregar un event listener para el cambio en el select.
const selection = document.getElementById('select_mes');
selection.addEventListener('change', () => {
agregarDetalle();
cargarYTraerCierre();
console.log(select.value);
});

// También puedes llamar a agregarDetalle() cuando se carga la página.
window.addEventListener('load', () => {
  agregarDetalle();
});


//Mostrar cierre 

let mont_ini = document.getElementById('val_ini');
let met_ahorr = document.getElementById('met_ahorr');
let tot_gas = document.getElementById('tot_gas');
let tot_ahorr = document.getElementById('tot_ahorr');
let meta_cumplida = document.getElementById('meta_cumplida');

async function cargarYTraerCierre() {
    try {
            const response = await fetch('http://localhost:4000/traer_cierre'); // Ruta de lectura de montos
            const data = await response.json();

            console.log(data);
     
            data.forEach((entry) => {
              mont_ini.innerHTML = entry.monto; 
              met_ahorr.innerHTML = entry.meta;
              tot_gas.innerHTML = entry.gastos;
              tot_ahorr.innerHTML = entry.ahorro;
              meta_cumplida.innerHTML = entry.meta_cumplida;                              
          // completar |^|
        })
      
  } catch (error) {
                  console.error('Error al cargar los valores:', error);
    }
            }