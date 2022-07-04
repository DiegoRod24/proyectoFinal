window.onload = () => {
    if(sessionStorage.user){
        user =JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/');
        }
    }
}

const loader = document.querySelector('.loader');

//select inputs
const submitBtn = document.querySelector('.submit-btn');
const name = document.querySelector('#name') || null;
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;
const tac = document.querySelector("#terms-and-cond") || null;
const notification = document.querySelector('#notification') || null;

submitBtn.addEventListener('click', () => {
if(name != null){ //sign up page
    if(name.value.length<3){
        showAlert('el nombre debe tener 3 letras');
    } else if(!email.value.length){
        showAlert('ingrese su correo');
    } else if(password.value.length < 8){
        showAlert('ingrese 8 caracteres como minimo');
    } else if(!number.value.length){
        showAlert('Ingrese su numero de celular');
    } /*else if(!Number(number.value) || number.value.length < 10){
        showAlert('Numero invalido, porfavor vuelve a intentarlo');
    } */ else if(!tac.checked){
        showAlert('debes aceptar los terminos y condiciones');
    } else{
        loader.style.display='block';
        sendData('/signup', {
            name: name.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked,
            notification: notification.checked,
            seller:false
        })
    } 
} else{
    //login page 
        if(!email.value.length || !password.value.length){
            showAlert('ingresar los datos de acceso');
        } else {
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    } 
})
