/*
en filtros un array para cada mes se le hace push de los datos segunla fecha, se deve multiplicar asi mismo para 
cargar la informacion o que simplemente mejor muestre en base a la haray de los eses en pantalla para ahoarra memoria
asique eso no ademas considerar crea rufncion que haga el proseso mediante parametros para eitar la recursion

nuevo preoblema cuando se hace el cierre en la base de datos queda la meat de ahoroo registrada por lo cual ademas
el listado global debe ser en una panatalla nueva por que tambien de debe agregar un nuevo listado y grafico , r
  ,  el nuevo litado deve incluir el monto inicial la meta de ahorro y el total de lo que se ahorro y gasto ese mes
  
  aqui solo se mostararan los datos ya no se podra editar ni eliminar ningun detalle
  
  para agregar nuevo detalle se pregunta to local date time string lese filtro ira en detalle*/

let tbody = document.querySelector("#category-list tbody");
let isGrayRow = false;

const meses = [enero :1 , febrero :2, marzo :3, abril : 4, mayo: 5, junio : 6 , julio :7, agosto
                :8, septiembre :9, octubre :10, noviembre :11, diciembre :12];


function filtrarMes(data){
if(data.fecha = 1){
  
}else if(data.fecha = 1){ }else if(data.fecha = 2){ }else if(data.fecha = 3){ }else if(data.fecha = 4){
  
}else if(data.fecha = 5){ }else if(data.fecha = 6){ }else if(data.fecha = 7){ }else if(data.fecha = 8){
  
}else if(data.fecha = 9){ }else if(data.fecha = 10){}else if(data.fecha = 11){ }else if(data.fecha = 12){ }}

let tbody = document.querySelector("#category-list tbody");
let isGrayRow = false;

async function agregarDetalle() {
  try {
    const response = await fetch('http://localhost:4000/valances');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();

    filtrarMes(data);
    
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

falta una variable
let met_ahorr = document.getElementById('met_ahorr');
let tot_gas = document.getElementById('tot_gas');
let tot_ahorr = document.getElementById('tot_ahorr');

function mostrarTotalGastosYmeta(){
async function sumar_total_gastos(){
    try { 
       const response = await fetch('http://localhost:4000/traer_valor_meta');
       const data = await response.json() 

       let total_gastos = data; 

       let met_ahorr = document.getElementById('met_ahorr').innerHtml = data.meta_ahorro;
        /*completar*/
      
       }catch (error) {
       console.error('Error al cargar los valores: ', error);
    };
};

window.addEventListener("load", () => {
  agregarDetalle();
});
