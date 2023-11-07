//Registrase
const form_registro = document.getElementById('form_registro');

form_registro.addEventListener('submit', async (event) => {
     event.preventDefault();

     let name = document.getElementById('name').value;
     let lastname = document.getElementById('lastname').value;
     let email = document.getElementById('email').value;
     let password = document.getElementById('password').value;
     let confirmPassword = document.getElementById('confirmPassword').value;

    if (name.trim() === '' || lastname.trim() === '' || 
        email.trim() === '' || password.trim() === '' || 
        confirmPassword.trim() === '') {
       alert('Campos sin completar');
       return;
     }
   
     try {
       const noteData = {
        name, lastname, email, password, confirmPassword
       };
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
       
     console.log(name);
     console.log(lastname);
     console.log(email);
     console.log(password);
     console.log(confirmPassword);
     } catch (error) {}
   });

//Mostrar contraseña

let password = document.getElementById('password');
let viewPasswordReg1 = document.getElementById('viewPasswordReg1');
let click = false;

viewPasswordReg1.addEventListener('click', (e)=>{
  if(!click){
    password.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})

let confirmPassword = document.getElementById('confirmPassword');
let viewPasswordReg1 = document.getElementById('viewPasswordReg2');
let click = false;

viewPasswordReg2.addEventListener('click', (e)=>{
  if(!click){
    confirmPassword.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})

