valorAlim();
valorServi();
valorHigie();
valorSalud();
valorTransp();
valorOtros();

let chartdata = [];

let longCharData = 0;

let total_gastos = 0;

async function waitForCounterToReach(targetCount) {

  while (longCharData < targetCount) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
  }

  console.log(total_gastos);
  
  mosGrafic();
  console.log(`El contador ha alcanzado ${targetCount}.`);
}

waitForCounterToReach(6);

function mosGrafic(){
anychart.onDocumentReady(function () {
    // create pie chart with passed data
    
    let chart = anychart.pie(chartdata);

    // set chart title text settings
    chart.title('Grafico de valances consumo diario');
    // set chart labels position to outside
    chart.labels().position('outside');
    // set legend title settings
    chart
      .legend()
      .title()
      .enabled(true)
      .text('Categorias')
      .padding([0, 0, 10, 0]);

    // set legend position and items layout
    chart
      .legend()
      .position('center-bottom')
      .itemsLayout('horizontal')
      .align('center');

    // set container id for the chart
    chart.container('container');
    // initiate chart drawing
    chart.draw();
  })};

//Filtrar datos


function sumarValoresPorFecha(data, mesSeleccionado) {
  const mesNumero = parseInt(mesSeleccionado, 10);

  if (mesNumero < 1 || mesNumero > 12) {
    alert('Mes no seleccionado');
    return 0; // Devolvemos 0 si el mes no es válido
  }

  let total = 0;

  data.forEach(entry => {
    const fecha = new Date(entry.fecha);
    const mes = fecha.getMonth() + 1; // getMonth() devuelve el mes en base 0 (enero es 0), por eso sumamos 1
    console.log(entry.valor);
    if (mes === mesNumero) {
      total += entry.valor;
    }
  });

  return total;
}


async function valorAlim() {
  try {
    const response = await fetch('http://localhost:4000/total_alimentos');
    if (!response.ok) {
      throw new Error('Error al obtener los datos de alimentación.');
    }

    const alimentacionData = await response.json();

    console.log(alimentacionData);

    const select = document.getElementById('select_mes');
    const mesSeleccionado = select.value;

    const resultadosFiltrados = filtrarMes(alimentacionData, mesSeleccionado);

    if (resultadosFiltrados > 0) {
      // chartdata.push(["Alimentacion", resultadosFiltrados]);
        console.log("Alimentacion", resultadosFiltrados);
    
      // Sumar los valores filtrados
      total_gastos += resultadosFiltrados;
    
      longCharData++;
    } else {
      console.log('No hay datos para el mes seleccionado:', mesSeleccionado);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

const select = document.getElementById('select_mes');
select.addEventListener('change', () => {
  valorAlim();
  console.log(select.value);
});

  async function valorServi() {
    try {
      const response = await fetch('http://localhost:4000/total_servicios');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const serviciosData = await response.json();

       const select = document.getElementById('select_mes');
       
       const mesSeleccionado = select.value;

       const resultadosFiltrados = filtrarMes(serviciosData, mesSeleccionado);

      chartdata.push(["Servicios", serviciosData]);

      total_gastos += serviciosData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorHigie() {
    try {
      const response = await fetch('http://localhost:4000/total_otros');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const higieneData = await response.json();

       const select = document.getElementById('select_mes');
       
       const mesSeleccionado = select.value;

       const resultadosFiltrados = filtrarMes(higieneData, mesSeleccionado);

      chartdata.push(["Higiene", higieneData]);

      total_gastos += higieneData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorSalud() {
    try {
      const response = await fetch('http://localhost:4000/total_transporte');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const saludData = await response.json();

       const select = document.getElementById('select_mes');
       
       const mesSeleccionado = select.value;

       const resultadosFiltrados = filtrarMes(saludData, mesSeleccionado);

      chartdata.push(["Salud", saludData]);

      total_gastos += saludData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorTransp() {
    try {
      const response = await fetch('http://localhost:4000/total_salud');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const transporteData = await response.json();

       const select = document.getElementById('select_mes');
       
       const mesSeleccionado = select.value;

       const resultadosFiltrados = filtrarMes(transporteData, mesSeleccionado);

      chartdata.push(["Transporte", transporteData]);

      total_gastos += transporteData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorOtros() {
    try {
      const response = await fetch('http://localhost:4000/total_higiene');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const otrosData = await response.json();

       const select = document.getElementById('select_mes');
       
       const mesSeleccionado = select.value;

       const resultadosFiltrados = filtrarMes(otrosData, mesSeleccionado);

      chartdata.push(["Otros", otrosData]);

      total_gastos += otrosData;
      
      console.log(chartdata)
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  console.log(chartdata.length);

