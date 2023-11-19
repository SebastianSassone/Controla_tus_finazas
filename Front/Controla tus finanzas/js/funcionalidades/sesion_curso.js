let REGISTRARSE = document.getElementById('REGISTRARSE');
let INICIAR_SESION = document.getElementById('INICIAR_SESION');

// agregar que se refresque al cargar cerrar secion 

if(registro_realizado != 0 || sesion_en_curso != 0 ){
    REGISTRARSE.style.display = 'none';
    INICIAR_SESION.style.display = 'none';
}
