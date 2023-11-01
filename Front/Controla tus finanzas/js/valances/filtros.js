const meses = [enero :1 , febrero :2, marzo :3, abril : 4, mayo: 5, junio : 6 , julio :7, agosto
                :8, septiembre :9, octubre :10, noviembre :11, diciembre :12];

const enero = [producto : , categoria: , subcategoria: , valor: , fecha: , hora:];

function pushArray(mes, datos){
        mes.push[0] =  datos.producto 
        mes.push[1] =  entry.categoria 
        enero.push[2] =  entry.subcategoria 
        enero.push[3] =  entry.valor 
        enero.push[4] =  entry.fecha 
        enero.push[5] =  entry.hora
}

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

/*
en filtros un array para cada mes se le hace push de los datos segunla fecha, se deve multiplicar asi mismo para 
cargar la informacion o que simplemente mejor muestre en base a la haray de los eses en pantalla para ahoarra memoria
asique eso no ademas considerar crea rufncion que haga el proseso mediante parametros para eitar la recursion

nuevo preoblema cuando se hace el cierre en la base de datos queda la meat de ahoroo registrada por lo cual ademas
el listado global debe ser en una panatalla nueva por que tambien de debe agregar un nuevo listado y grafico , r
  ,  el nuevo litado deve incluir el monto inicial la meta de ahorro y el total de lo que se ahorro y gasto ese mes*/

let tbody = document.querySelector("#category-list tbody");
let isGrayRow = false;

async function agregarDetalle() {
  try {
    const response = await fetch('http://localhost:4000/valances');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();

    data.forEach((entry) => {
      let row = document.createElement("tr");
      row.dataset.id = entry.id;
      row.innerHTML =
        "<td>" + entry.producto + "</td>" +
        "<td>" + entry.categoria + "</td>" +
        "<td>" + entry.subcategoria + "</td>" +
        "<td>" + entry.valor + "</td>" +
        "<td>" + entry.fecha + "</td>" +
        "<td>" + entry.hora + "</td>" +
        "<td class='actions'>" +
        "<div class='edit-btn' onclick='editarDetalle(this)'><div class='popup-text'>Editar</div></div>" +
        "<div class='delete-btn' onclick='eliminarDetalle(this)'><div class='popup-text'>Borrar</div></div>" +
        "<div class='save-btn' onclick='guardarEdicion(this)'><div class='popup-text'>Guardar</div></div>" +
        "</td>";

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

async function editarDetalle(btn) {
  let row = btn.parentNode.parentNode;
  let cells = row.querySelectorAll("td:not(.actions)");
  let id = row.dataset.id;

  row.classList.add("editing");

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let currentValue = cell.innerText;

    cell.innerHTML = "<input type='text' value='" + currentValue + "'>";
  }

  let editBtn = row.querySelector(".edit-btn");
  let deleteBtn = row.querySelector(".delete-btn");
  let saveBtn = row.querySelector(".save-btn");

  editBtn.style.display = "none";
  deleteBtn.style.display = "none";
  saveBtn.style.display = "inline-block";
}

async function guardarEdicion(btn) {
  let row = btn.parentNode.parentNode;
  let cells = row.querySelectorAll("td:not(.actions)");
  let id = row.dataset.id;

  row.classList.remove("editing");

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let input = cell.querySelector("input");
    let newValue = input.value;

    cell.innerHTML = newValue;
  }

  let editBtn = row.querySelector(".edit-btn");
  let deleteBtn = row.querySelector(".delete-btn");
  let saveBtn = row.querySelector(".save-btn");

  editBtn.style.display = "inline-block";
  deleteBtn.style.display = "inline-block";
  saveBtn.style.display = "none";

  // Código para actualizar los datos en la API utilizando fetch
  try {
    let producto = cells[0].innerText;
    let categoria = cells[1].innerText;
    let subcategoria = cells[2].innerText;
    let valor = cells[3].innerText;
    let fecha = cells[4].innerText;
    let hora = cells[5].innerText;

    const response = await fetch(`http://localhost:4000/actualizar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({producto, categoria, subcategoria, valor, fecha, hora}),
    });

    if (!response.ok) {
      throw new Error('Error al guardar los cambios.');
    }

    alert('Cambios guardados exitosamente.');
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al guardar los cambios.');
  }
}

async function eliminarDetalle(btn) {
  let row = btn.parentNode.parentNode;
  let id = row.dataset.id;

  try {
    const response = await fetch(`http://localhost:4000/borrar/${id}`, {
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

window.addEventListener("load", () => {
  agregarDetalle();
});
