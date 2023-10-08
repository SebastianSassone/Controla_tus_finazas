setInterval(updateDateTime, 1000);

function updateDateTime() {
    const now = new Date();

    const dateField = document.getElementById('fecha');
    dateField.value = now.toLocaleDateString();

    const timeField = document.getElementById('hora');
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
     const categoria = document.getElementById('categoria').value;
     const subcategoria = document.getElementById('subcategoria').value;
     const valor = document.getElementById('valor').value;
     const fecha = document.getElementById('fecha').value;
     const hora = document.getElementById('hora').value;
    
     if (producto.trim() === '' || categoria.trim() === '' || 
         subcategoria.trim() === '' || valor.trim() === '' || 
         fecha.trim() === '' || hora.trim() === '' ) {
       alert('Campos sin completar');
       return;
     }
   
     try {
       const noteData = {producto, categoria, subcategoria, valor, fecha, hora};
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

