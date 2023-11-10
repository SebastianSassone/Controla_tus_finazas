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

  async function valorAlim() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-alimentos');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const alimentacionData = await response.json();

      chartdata.push(["Alimentacion", alimentacionData]);

      total_gastos += alimentacionData;
      
      longCharData++;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorServi() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-servicios');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const serviciosData = await response.json();

      chartdata.push(["Servicios", serviciosData]);

      total_gastos += serviciosData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorHigie() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-otros');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const higieneData = await response.json();

      chartdata.push(["Higiene", higieneData]);

      total_gastos += higieneData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorSalud() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-transporte');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const saludData = await response.json();

      chartdata.push(["Salud", saludData]);

      total_gastos += saludData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorTransp() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-salud');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const transporteData = await response.json();

      chartdata.push(["Transporte", transporteData]);

      total_gastos += transporteData;
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  async function valorOtros() {
    try {
      const response = await fetch('http://localhost:4000/total-valor-higiene');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const otrosData = await response.json();

      chartdata.push(["Otros", otrosData]);

      total_gastos += otrosData;
      
      console.log(chartdata)
      
      longCharData++;;

    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  console.log(chartdata.length);

