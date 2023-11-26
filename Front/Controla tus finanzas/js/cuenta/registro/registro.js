//Registrase
const form_registro = document.getElementById('form_registro');

let ac_in = false;

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
         throw new Error('Error al registrarse');
       }
  
      // window.location.replace("http://127.0.0.1:5500/index.html");
        alert('Registro realizado exitosamente.');
        
        ac_in = true;
      
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

viewPasswordReg1.addEventListener('change', (event)=>{
  if(!click){
    password.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})

let confirmPassword = document.getElementById('confirmPassword');
let viewPasswordReg2 = document.getElementById('viewPasswordReg2');

viewPasswordReg2.addEventListener('change', (event)=>{
  if(!click){
    confirmPassword.type = 'text'
    click = true
  }else if(click){
    confirmPassword.type = 'password'
    click = false
  }
})

// export {ac_in};