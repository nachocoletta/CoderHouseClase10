
(function () {
    const socket = io();

    // form - products
    const formProducts = document.getElementById('form-products')
    // input - product
    const inputProduct = document.getElementById('input-product')
    // log - products
    const logProducts = document.getElementById('log-products')

    formProducts.addEventListener('submit', (event => {
        event.preventDefault()
        const text = inputProduct.value;
        socket.emit('new-product')

    }))


    function updateProducts(products) {
        logProducts.innerText = "";
        products.forEach((prod) => {
            console.log(prod)
            const p = document.createElement('p');
            p.innerText = `${prod.id} - ${prod.title} - ${prod.description} - ${prod.code} - ${prod.price} - ${prod.stock}`;
            logProducts.appendChild(p)
        })
    }

    socket.on('notification', ({ products }) => {
        updateProducts(products);
    });

    socket.on('new-message-from-api', (message) => {
        console.log('new-message-from-api ->', message)
    })
    // socket.document('')
})();