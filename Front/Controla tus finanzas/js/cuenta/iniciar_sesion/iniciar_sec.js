// import {ac_in} from '../registro/registro';

// Iniciar sesion

let sesion_en_curso = 0;

const form_in_sec = document.getElementById('form_in_sec');

form_in_sec.addEventListener('submit', async (event) => {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

 if (email.trim() === '' || password.trim() === '') {
    alert('Campos sin completar');
    return;
  }

  try {
    const noteData = {email, password};
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesion.');
    }

    window.location.replace("http://localhost:5500/html/cuenta.html");
    ac_in = true;
    
    alert('Sesion iniciada');
  } catch (error) {}
});

//Mostrar contaseña
let passwordLogin = document.getElementById('password');
let viewPasswordLogin = document.getElementById('viewPasswordLogin');
let click = false;

viewPasswordLogin.addEventListener('change', (event) => {
  if(!click){
    passwordLogin.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})
