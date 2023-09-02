setInterval(updateDateTime, 1000);

function updateDateTime() {
    const now = new Date();

    const dateField = document.getElementById('date');
    dateField.value = now.toLocaleDateString();

    const timeField = document.getElementById('time');
    timeField.value = now.toLocaleTimeString();
}        

const form = document.getElementById('form_ingreso');
const section_form_ingreso = document.getElementById('section_form_ingreso');
const section_detalle = document.getElementById('section_detalle');
   
   form.addEventListener('submit', async (event) => {
     event.preventDefault();
     
     const product = document.getElementById('product');
     const valo = document.getElementById('valo');
     const categori = document.getElementById('categori');
     const subcategori = document.getElementById('subcategori');
     const fech = document.getElementById('fech');
     const hor = document.getElementById('hor');

     const producto = document.getElementById('producto').value;
     const select_categori = document.getElementById('select_categori').value;
     const subcategoria = document.getElementById('subcategoria').value;
     const valor = document.getElementById('valor').value;
     const date = document.getElementById('date').value;
     const time = document.getElementById('time').value;
    
     if (producto.trim() === '' || select_categori.trim() === '' || 
         subcategoria.trim() === '' || valor.trim() === '' || 
         date.trim() === '' || time.trim() === '' ) {
       alert('Campos sin completar');
       return;
     }
   
     try {
       const noteData = {producto, select_categori, subcategoria, valor, date, time};
       const response = await fetch('http://localhost:4000/guardar', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(noteData),
       });
   
       if (!response.ok) {
         throw new Error('Error al agregar el ingreso.');
       }
       section_form_ingreso.style.display = 'none';

       product.innerHTML = producto;
       valo.innerHTML = select_categori;
       categori.innerHTML = subcategoria;
       subcategori.innerHTML = valor;
       fech.innerHTML = date;
       hor.innerHTML = time;

       section_detalle.style.display = 'flex';
         
       alert('Ingreso realizado exitosamente.');
       form.reset();
     } catch (error) {
       console.error('Error:', error);
       alert('Ocurrió un error con el ingreso.');
       section_form_ingreso.style.display = 'none';

       product.innerHTML = producto;
       valo.innerHTML = valor;
       categori.innerHTML = select_categori;
       subcategori.innerHTML = subcategoria;
       fech.innerHTML = date;
       hor.innerHTML = time;
       
       section_detalle.style.display = 'flex';
     }
   });

const but_acep = document.getElementById('but_acep')

but_acep.addEventListener('click', () => {
  section_form_ingreso.style.display = 'flex';
  section_detalle.style.display = 'none';
})

