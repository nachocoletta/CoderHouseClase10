// socket.js

import { Server } from 'socket.io';
import { ProductManager } from './classes/productManager.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = path.resolve(__dirname, '../src/data/products.json');

let io;

const productManager = new ProductManager(absolutePath);

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`);

        const products = await productManager.getProducts();
        socketClient.emit('listProducts', products);

        socketClient.on('addProduct', async (newProduct) => {
            await productManager.addProduct(newProduct)
            let products = await productManager.getProducts()
            io.emit('listProducts', products)
        })

        socketClient.on('deleteProduct', async (idProduct) => {
            console.log("idProduct", idProduct)
            await productManager.deleteProduct(idProduct)
            let products = await productManager.getProducts()
            io.emit('listProducts', products)
        })
        socketClient.on('disconnect', () => {
            console.log(`Se ha desconectado el cliente con id ${socketClient.id}`)
        })
    });
    console.log('Server socket running 🚀');
}

export const emitFromApi = (event, data) => io.emit(event, data);
