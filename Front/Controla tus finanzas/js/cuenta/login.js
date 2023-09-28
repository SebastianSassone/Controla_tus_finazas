// Iniciar sesion

const form_in_sec = document.getElementById('form_in_sec');

form_in_sec.addEventListener('submit', async (event) => {
  event.preventDefault();

  let email = document.getElementById('email').value;
  let contraseña = document.getElementById('contraseña').value;

 if (email.trim() === '' || contraseña.trim() === '') {
    alert('Campos sin completar');
    return;
  }

  try {
    const noteData = {email, contraseña};
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      throw new Error('Error al agregar la nota.');
    }

    //window.location.replace("http://127.0.0.1:5500/html/cuenta.html");
    alert('Sesion iniciada');
  } catch (error) {}
});

console.log('hola ah')
