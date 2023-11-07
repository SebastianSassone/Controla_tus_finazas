/*Registro*/

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

/*Login*/

let passwordLogin = document.querySelector('.login');
let viewPasswordLogin = document.getElementById('viewPasswordLogin');
let click = false;

viewPasswordLogin.addEventListener('click', (e)=>{
  if(!click){
    passwordLogin.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})
