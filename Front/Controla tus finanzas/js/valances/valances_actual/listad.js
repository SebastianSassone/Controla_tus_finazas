let tbody = document.querySelector("#category-list tbody");
let isGrayRow = false;

async function agregarDetalle() {
  try {
    const response = await fetch('http://localhost:4000/valances_ingreso');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();

    // const mesActual = new Date().getMonth() + 1; // El mes actual es base 0, así que sumamos 1.

    // data.forEach((entry) => {
    //   const fechaParts = entry.fecha.split('/');
    //   if (fechaParts.length === 3) {
        const mesActual = new Date().getMonth() + 1;

        data.forEach(entry => {
        const fecha = new Date(entry.fecha);
        const mes = fecha.getMonth() + 1; // getMonth() devuelve el mes en base 0 (enero es 0), por eso sumamos 1

        if (mes === mesActual) {
        const mesValance = parseInt(fechaParts[1], 10);
        if (mesValance === mesActual) {
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
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


// async function agregarDetalle() {
//   try {
//     const response = await fetch('http://localhost:4000/valances');
//     if (!response.ok) {
//       throw new Error('Error al obtener los datos.');
//     }

//     const data = await response.json();

//     data.forEach((entry) => {
//       let row = document.createElement("tr");
//       row.dataset.id = entry.id;
//       row.innerHTML =
//         "<td>" + entry.producto + "</td>" +
//         "<td>" + entry.categoria + "</td>" +
//         "<td>" + entry.subcategoria + "</td>" +
//         "<td>" + entry.valor + "</td>" +
//         "<td>" + entry.fecha + "</td>" +
//         "<td>" + entry.hora + "</td>" +
//         "<td class='actions'>" +
//         "<div class='edit-btn' onclick='editarDetalle(this)'><div class='popup-text'>Editar</div></div>" +
//         "<div class='delete-btn' onclick='eliminarDetalle(this)'><div class='popup-text'>Borrar</div></div>" +
//         "<div class='save-btn' onclick='guardarEdicion(this)'><div class='popup-text'>Guardar</div></div>" +
//         "</td>";

//       let saveBtn = row.querySelector(".save-btn");
//       saveBtn.style.display = "none";
//       if (isGrayRow) {
//         row.classList.add("gray-row");
//       }

//       tbody.appendChild(row);

//       isGrayRow = !isGrayRow;
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

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

    const response = await fetch(`http://localhost:4000/actualizar_ingreso/${id}`, {
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
    const response = await fetch(`http://localhost:4000/borrar_ingreso/${id}`, {
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