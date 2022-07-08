let openEditor;

const createProduct = (data) => {

    openEditor= () =>{
        sessionStorage.tempProduct=JSON.stringify(data);
        location.href = `/add-Product/${data.id}`;
    }

    let productContainer = document.querySelector('.product-container');
    productContainer.innerHTML += 
    ` <div class="product-card">
            <div class="product-image">
            ${data.draft ? `<span class="tag">Reclutar</span>` : ''}
            <img src="${data.images[0] || 'img/no image.png'}" class="product-thumb">
            <button class="card-action-btn edit-btn" onclick="openEditor()"><img src="img/editar.png" alt="">
            </button>
            <button class="card-action-btn open-btn" onclick="location.href =
             '/${data.id}'"><img src="img/open.png" alt=""></button>
            <button class="card-action-btn delete-popup-btn"
             onclick="openDeletePopup('/${data.id}')"><img src="img/delete.png"
              alt=""></button>

             </div>
    <div class="product-info">
        <h2 class="product-brand">${data.name}</h2>
        <p class="product-short-des">${data.shortDes}</p>
        <span class="price">${data.sellPrice}</span>
        <span class="actual-price">${data.actualPrice}</span>

    </div>
</div>`;
}

const openDeletePopup =(id) => {
    let deleteAlert = document.querySelector('.delete-alert');
    deleteAlert.style.display= 'flex';

    let closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => deleteAlert.style.display =null);

    let deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteItem(id))
}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method:'post',
        headers: new Headers({'Content-Type' :'application/json'}),
        body: JSON.stringify({id:id})
    }).then(res => res.json())
    .then(data =>{
        if(data=='success'){
            location.reload();
        }else{
            showAlert('Ocurrió algún error al eliminar el producto. Intentar otra vez');
        }
    })
}