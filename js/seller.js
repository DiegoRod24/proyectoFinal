let loader = document.querySelector('.loader');

const becomeSellerElement = document.querySelector('.become-seller');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () =>{
    if(sessionStorage.user){
        let user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
           // becomeSellerElement.classList.remove('hide');
        }else{
            location.replace('/login');
        }
    }else{
        location.replace('/login');
    }
}

showApplyFormBtn.addEventListener('click', () =>{
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

//envio de formulario

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#bussiness-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number= document.querySelector('#number');
const tac= document.querySelector('#terms-and-cond');
const legitInfo= document.querySelector('#legitInfo');

applyFormButton.addEventListener('click', () =>{
    if(!businessName.value.length || !address.value.length
        || !about.value.length || !number.value.length){
            showAlert('llenar todas los campos');
        } else if( !tac.checked || !legitInfo.checked){
            showAlert('debes aceptar los términos y condiciones')
        }else{
            //haciendo solicitud de servidor
            loader.style.display = 'block';
            sendData('/seller', {
                name: businessName.value,
                address: address.value,
                about: about.value,
                number: number.value,
                tac: tac.checked,
                legit:legitInfo.checked,
                email: JSON.parse(sessionStorage.user).email
            })
        }
})
