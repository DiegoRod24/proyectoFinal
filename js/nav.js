const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML=`
    <div class="nav">
    <img src="img/dark-logo.png" alt="" class="brand-logo" alt="">
    <div class="nav-items">
             <div class="search">
                <input type="text" class="search-box" placeholder="buscar marca, producto">
                <button class="search-btn">Buscar</button>
            </div>
            <a>
                <img src="./img/user.png" id="user-img" alt="">
                <div class="login-logout-popup hide">
                    <p class="account-info">Inicio sesion como, </p>
                    <button class="btn" id="user-btn">Salir</button>
               </div>
                </a>
                <a href="#"><img src="./img/cart.png" alt=""></a>
         </div>
    </div>
    <ul class="links-container">
        <li class="link-item"><a href="#home" class="link">home</a></li>
        <li class="link-item"><a href="#" class="link">women</a></li>
        <li class="link-item"><a href="#" class="link">men</a></li>
        <li class="link-item"><a href="#" class="link">kids</a></li>
        <li class="link-item"><a href="#" class="link">accesorios</a></li>
    </ul>   
`;
}

createNav();

// nav popup
const userImageButton =document.querySelector('#user-img');
const userPop =document.querySelector('.login-logout-popup');
const popuptext =document.querySelector('.account-info');
const actionBtn =document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})

window.onload = () => {
        let user = JSON.parse (sessionStorage.user || null);
        if(user != null){
            //means user is looged is
            popuptext.innerHTML = `Inicio sesion como, ${user.name}`;
            actionBtn.innerHTML = 'Salir';
            actionBtn.addEventListener('click', () => {
                sessionStorage.clear();
                location.reload();
            })
        } else {
            //user is logged out
            popuptext.innerHTML = 'inicia sesión para realizar tu pedido';
            actionBtn.innerHTML = 'Iniciar Sesion';
            actionBtn.addEventListener('click', () => {
                location.href = '/login';
            })


        }
}