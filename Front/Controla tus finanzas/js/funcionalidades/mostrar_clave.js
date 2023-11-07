let password = document.getElementById('password');
let viewPassword = document.getElementById('viewPassword');
let click = false;

viewPassword.addEventListener('click', (e)=>{
  if(!click){
    password.type = 'text'
    click = true
  }else if(click){
    password.type = 'password'
    click = false
  }
})

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
