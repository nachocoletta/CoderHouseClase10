(function () {
    const socket = io();

    // form - products
    const formAddProduct = document.getElementById('form-add-product')
    // const deleteProduct = document.getElementById('btn-delete-product')
    const formDeleteProduct = document.getElementById('form-delete-product')
    // const deleteProduct = document.getElementById('btn-delete-product');

    // deleteProduct.addEventListener('submit', (event) => {
    //     // console.log('click');
    //     // event.preventDefault();
    //     const idProduct = document.getElementById('input-id-product').value;

    //     socket.emit('deleteProduct', idProduct)
    //     document.getElementById('input-id-product').value = '';

    // });

    formAddProduct?.addEventListener('submit', (event => {
        event.preventDefault();
        // const idProduct = document.getElementById('input-id-product').value
        // console.log(idProduct)
        // console.log('click en el boton del formulario')
        const newProduct = {
            title: document.getElementById('input-title').value,
            description: document.getElementById('input-description').value,
            code: document.getElementById('input-code').value,
            price: document.getElementById('input-price').value,
            stock: document.getElementById('input-stock').value,
            category: document.getElementById('input-category').value,
            thumbnails: []
        }

        socket.emit('addProduct', newProduct)

        document.getElementById('input-title').value = '';
        document.getElementById('input-description').value = '';
        document.getElementById('input-code').value = '';
        document.getElementById('input-price').value = '';
        document.getElementById('input-stock').value = '';
        document.getElementById('input-category').value = '';
    }))

    formDeleteProduct.addEventListener('submit', (event) => {
        event.preventDefault();
        const idProduct = document.getElementById('input-id-product').value;
        socket.emit('deleteProduct', idProduct)
        document.getElementById('input-id-product').value = '';
    })

    socket.on('listProducts', (products) => {
        const container = document.getElementById('log-products-in-real-time')

        container.innerHTML = "";
        products.forEach((prod) => {
            const p = document.createElement('p');
            p.innerText = `ID: ${prod.id} - Title: ${prod.title} - Description: ${prod.description} - Code: ${prod.code} - Price: $${prod.price} - Stock: ${prod.stock} - Category: ${prod.category}`;
            const hr = document.createElement('hr')
            container.appendChild(hr)
            container.appendChild(p);
        });
    })
})();
