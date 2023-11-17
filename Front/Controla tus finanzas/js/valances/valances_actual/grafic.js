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

waitForCounterToReach(6)
select.addEventListener('change', () => {
  valorAlim();
  valorServi();
  valorHigie();
  valorSalud();
  valorTransp();
  valorOtros();
  console.log(select.value);
});

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


function sumarValoresPorFecha(data) {

  let total = 0;

  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth() + 1;

  const resultadosFiltrados = data.filter(entry => {
    const fechaParts = entry.fecha.split('/');
    if (fechaParts.length === 3) {
      const mes = parseInt(fechaParts[1], 10);
      return mes === mesActual;
    }
    return false;
  

  resultadosFiltrados.forEach(entry => {
      total += entry.valor;
      console.log(entry.valor);
    
  });

  return total;

});
}


async function valorAlim() {
  try {
    const response = await fetch('http://localhost:4000/total_alimentos');
    if (!response.ok) {
      throw new Error('Error al obtener los datos de alimentación.');
    }

    const alimentacionData = await response.json();

    console.log(alimentacionData);

    const resultadosFiltrados = sumarValoresPorFecha(alimentacionData, mesSeleccionado);

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

  async function valorServi() {
    try {
      const response = await fetch('http://localhost:4000/total_servicios');
      if (!response.ok) {
        throw new Error('Error al obtener las notas.');
      }
  
      const serviciosData = await response.json();

  
       


       const resultadosFiltrados = sumarValoresPorFecha(serviciosData, mesSeleccionado);

      chartdata.push(["Servicios", resultadosFiltrados]);

      total_gastos += resultadosFiltrados;
      
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

  
       


       const resultadosFiltrados = sumarValoresPorFecha(higieneData, mesSeleccionado);

      chartdata.push(["Higiene", resultadosFiltrados]);

      total_gastos += resultadosFiltrados;
      
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

  
       


       const resultadosFiltrados = sumarValoresPorFecha(saludData, mesSeleccionado);

      chartdata.push(["Salud", resultadosFiltrados]);

      total_gastos += resultadosFiltrados;
      
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

  
       


       const resultadosFiltrados = sumarValoresPorFecha(transporteData, mesSeleccionado);

      chartdata.push(["Transporte", resultadosFiltrados]);

      total_gastos += resultadosFiltrados;
      
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

  
       


       const resultadosFiltrados = sumarValoresPorFecha(otrosData, mesSeleccionado);

      chartdata.push(["Otros", resultadosFiltrados]);

      total_gastos += resultadosFiltrados;
      
      console.log(chartdata)
      
      longCharData++;;
      console.log(total_gastos);
    } catch (error) {
      console.error('Error:', error);
      
    }
  }

  console.log(chartdata.length);
  console.log(total_gastos);


// valorAlim();
// valorServi();
// valorHigie();
// valorSalud();
// valorTransp();
// valorOtros();

// let chartdata = [];

// let longCharData = 0;

// let total_gastos = 0;

// async function waitForCounterToReach(targetCount) {

//   while (longCharData < targetCount) {
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
//   }

//   console.log(total_gastos);
  
//   mosGrafic();
//   console.log(`El contador ha alcanzado ${targetCount}.`);
// }

// waitForCounterToReach(6);

// function mosGrafic(){
// anychart.onDocumentReady(function () {
//     // create pie chart with passed data
    
//     let chart = anychart.pie(chartdata);

//     // set chart title text settings
//     chart.title('Grafico de valances consumo diario');
//     // set chart labels position to outside
//     chart.labels().position('outside');
//     // set legend title settings
//     chart
//       .legend()
//       .title()
//       .enabled(true)
//       .text('Categorias')
//       .padding([0, 0, 10, 0]);

//     // set legend position and items layout
//     chart
//       .legend()
//       .position('center-bottom')
//       .itemsLayout('horizontal')
//       .align('center');

//     // set container id for the chart
//     chart.container('container');
//     // initiate chart drawing
//     chart.draw();
//   })};



// //Filtrar datos mas for each falta actualizar las funciones

//   function sumarValoresPorFecha(data) {
//   const mesActual = new Date().getMonth() + 1;

//   let total = 0;

//   data.forEach(entry => {
//     const fecha = new Date(entry.fecha);
//     const mes = fecha.getMonth() + 1; // getMonth() devuelve el mes en base 0 (enero es 0), por eso sumamos 1

//     if (mes === mesActual) {
//       total += entry.valor;
//     }
//   });

//   return total;
// }
  
//   async function valorAlim() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-alimentos');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const alimentacionData = await response.json();

//       if (esMesActual(higieneData)) {
//         chartdata.push(["Higiene", higieneData]);
  
//         total_gastos += higieneData;
  
//         longCharData++;
//       } else {
//         console.log('El dato no es del mes actual:', higieneData.fecha);
//       }

//       // chartdata.push(["Alimentacion", alimentacionData]);

//       // total_gastos += alimentacionData;
      
//       // longCharData++;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   async function valorServi() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-servicios');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const serviciosData = await response.json();

//       chartdata.push(["Servicios", serviciosData]);

//       total_gastos += serviciosData;
      
//       longCharData++;;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   async function valorHigie() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-otros');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const higieneData = await response.json();

//       chartdata.push(["Higiene", higieneData]);

//       total_gastos += higieneData;
      
//       longCharData++;;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   async function valorSalud() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-transporte');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const saludData = await response.json();

//       chartdata.push(["Salud", saludData]);

//       total_gastos += saludData;
      
//       longCharData++;;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   async function valorTransp() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-salud');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const transporteData = await response.json();

//       chartdata.push(["Transporte", transporteData]);

//       total_gastos += transporteData;
      
//       longCharData++;;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   async function valorOtros() {
//     try {
//       const response = await fetch('http://localhost:4000/total-valor-higiene');
//       if (!response.ok) {
//         throw new Error('Error al obtener las notas.');
//       }
  
//       const otrosData = await response.json();

//       chartdata.push(["Otros", otrosData]);

//       total_gastos += otrosData;
      
//       console.log(chartdata)
      
//       longCharData++;;

//     } catch (error) {
//       console.error('Error:', error);
      
//     }
//   }

//   console.log(chartdata.length);

