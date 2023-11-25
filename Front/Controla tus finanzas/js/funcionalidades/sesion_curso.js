import {ac_ina} from '../cuenta/iniciar_sesion/iniciar_sec'

let registrarse = document.getElementById('registrarse');
let iniciar_sesion = document.getElementById('iniciar_sesion');

// agregar que se refresque al cargar cerrar secion 


function bloquearEnlace(ac_ina, event){
    
    if(ac_ina == falce){
      event.preventDefault();
      alert('Registrase o iniciar sesion para continuar');
    };

}
