import {ac_in} from '../cuenta/iniciar_sesion/iniciar_sec';

let registrarse = document.getElementById('registrarse');
let iniciar_sesion = document.getElementById('iniciar_sesion');

registrarse.addEventListener('click', (event) => {
    bloquearEnlace(ac_in, event);
});

iniciar_sesion.addEventListener('click', (event) => {
    bloquearEnlace(ac_in, event);
});

function bloquearEnlace(ac_ina, event){   
    if(ac_in == false){
      event.preventDefault();
      alert('Registrase o iniciar sesion para continuar');
    };
};

// Agregar que se ponga en falce al iniciar sesion