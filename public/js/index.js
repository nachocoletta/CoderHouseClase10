(function () {
    const socket = io();
    // console.log('index')

    // form - products
    const formProducts = document.getElementById('form-products')
    // input - product
    const inputProduct = document.getElementById('input-product')
    // log - products
    const logProducts = document.getElementById('log-products')
    // log - products - in - real - time
    const logProductsInRealTime = document.getElementById('log-products-in-real-time')

    formProducts?.addEventListener('submit', (event => {
        event.preventDefault();

        // Obtener valores del formulario
        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const code = document.getElementById('input-code').value;
        const price = document.getElementById('input-price').value;
        const stock = document.getElementById('input-stock').value;
        const category = document.getElementById('input-category').value;

        // Enviar evento al servidor con el nuevo producto
        socket.emit('new-product', { title, description, code, price, stock, category });
    }))

    function updateProducts(container, products) {
        // console.log("container", container)
        // console.log("products", products)
        if (container) {
            container.innerHTML = "";
            products.forEach((prod) => {
                const p = document.createElement('p');
                p.innerText = `${prod.id} - ${prod.title} - ${prod.description} - ${prod.code} - ${prod.price} - ${prod.stock}`;
                container.appendChild(p);
            });
        }
    }


    socket.on('notification', ({ products }) => {
        // console.log("logProducts", logProducts)
        // console.log("logProductsInRealTime", logProductsInRealTime)
        // updateProducts(logProductsInRealTime, products);
        // updateProducts(logProducts, products);
        // console.log("products", products)
        // console.log('entra a notification', logProducts, logProductsInRealTime)
        // updateProducts(logProductsInRealTime, products)
        // console.log("logProducts", logProducts)
        updateProducts(logProducts, products);

        // if (!logProducts) {
        //     // console.log('entra a notifications', logProductsInRealTime)
        //     updateProducts(logProductsInRealTime, products);
        // }
        // if (!logProductsInRealTime) {
        //     // console.log('entra a notifications', logProducts)
        //     updateProducts(logProducts, products);
        // }
    });

    socket.on('notification-in-real-time', ({ products }) => {
        // console.log("products", products)
        updateProducts(logProductsInRealTime, products);
        // console.log("logProductsInRealTime", logProductsInRealTime)
        // const logProductsInRealTime = document.getElementById('log-products-in-real-time')

        // console.log("logProductsInRealTime", logProductsInRealTime)
        // updateProducts(logProductsInRealTime, products);
    })
    socket.on('new-product',  //console.log('hola')
        (products) => {
            // console.log('entra')
            if (!logProducts) {
                // console.log('entra a notifications', logProductsInRealTime)
                updateProducts(logProductsInRealTime, products);
            }
            // if (!logProductsInRealTime) {
            //     // console.log('entra a notifications', logProducts)
            //     updateProducts(logProducts, products);
            // }
        }
    );
    socket.on('delete-product',
        (products) => {
            // if (!logProducts) {
            updateProducts(logProductsInRealTime, products);
        }
    );

    socket.on('update-product',
        (products) => {
            updateProducts(logProductsInRealTime, products);
        }
    )
    // socket.on('new-message-from-api', (message) => {
    //     console.log('new-message-from-api ->', message)
    // });
})();
