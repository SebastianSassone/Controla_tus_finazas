const meses = [enero :1 , febrero :2, marzo :3, abril : 4, mayo: 5, junio : 6 , julio :7, agosto
                :8, septiembre :9, octubre :10, noviembre :11, diciembre :12];

const enero = [producto : , categoria: , subcategoria: , valor: , fecha: , hora:];

async function agregarDetalle() {
  try {
    const response = await fetch('http://localhost:4000/valances');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();

    data.forEach((entry) => {
      if ( entry.fecha[4] == 1 ){
        enero.push[0] =  entry.producto 
        enero.push[1] =  entry.categoria 
        enero.push[2] =  entry.subcategoria 
        enero.push[3] =  entry.valor 
        enero.push[4] =  entry.fecha 
        enero.push[5] =  entry.hora } else if( entry.fecha[4] == 2 ) 
      {
        febrero.push[0] =  entry.producto 
        febrero.push[1] =  entry.categoria 
        febrero.push[2] =  entry.subcategoria 
        febrero.push[3] =  entry.valor 
        febrero.push[4] =  entry.fecha 
        febrero.push[5] =  entry.hora 
        }

      let saveBtn = row.querySelector(".save-btn");
      saveBtn.style.display = "none";
      if (isGrayRow) {
        row.classList.add("gray-row");
      }

      tbody.appendChild(row);

      isGrayRow = !isGrayRow;
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/*nuevo preoblema cuando se hace el cierre en la base de datos queda la meat de ahoroo registrada por lo cual ademas
el listado global debe ser en una panatalla nueva por que tambien de debe agregar un nuevo listado y grafico , r
  ,  el nuevo litado deve incluir el monto inicial la meta de ahorro y el total de lo que se ahorro y gasto ese mes*/
