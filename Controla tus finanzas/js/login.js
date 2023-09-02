// Registrase
const form_registro = document.getElementById('form_registro');

form_registro.addEventListener('submit', async (event) => {
     event.preventDefault();

     let nombre = document.getElementById('nombre').value;
     let apellido = document.getElementById('apellido').value;
     let email = document.getElementById('email').value;
     let contraseña1 = document.getElementById('contraseña1').value;
     let contraseña2 = document.getElementById('contraseña2').value;

    if (nombre.trim() === '' || apellido.trim() === '' || 
        email.trim() === '' || contraseña1.trim() === '' || 
        contraseña2.trim() === '') {
       alert('Campos sin completar');
       return;
     }
   
     try {
       const noteData = {nombre, apellido, email, contraseña1, contraseña2};
       const response = await fetch('http://localhost:4000/registrar_user', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(noteData),
       });
   
       if (!response.ok) {
         throw new Error('Error al agregar la nota.');
       }
      //  window.location.href = "/seccion"
      // window.location.replace("http://127.0.0.1:5500/html/cuenta.html");
       alert('Registro realizado exitosamente.');
     } catch (error) {}
   });


// Iniciar sesion

// const form_in_sec = document.getElementById('form_in_sec');

// form_in_sec.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   let email = document.getElementById('email').value;
//   let contraseña = document.getElementById('contraseña').value;

//  if (email.trim() === '' || contraseña.trim() === '') {
//     alert('Campos sin completar');
//     return;
//   }

//   try {
//     const noteData = {email, contraseña};
//     const response = await fetch('http://localhost:4000/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(noteData),
//     });

//     if (!response.ok) {
//       throw new Error('Error al agregar la nota.');
//     }

//     window.location.replace("http://127.0.0.1:5500/html/cuenta.html");
//     alert('Sesion iniciada');
//   } catch (error) {}
// });

console.log('hola ah')
