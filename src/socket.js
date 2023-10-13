import { Server } from 'socket.io'
import { ProductManager } from './classes/productManager.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = path.resolve(__dirname, '../src/data/products.json');

let io;


// console.log("absolutePath", absolutePath)
const productManager = new ProductManager(absolutePath)

// console.log("aca los productos", await productManager.getProducts())

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient) => {
        console.log(`Se ha conectado un nuevo cliente 🎉 (${socketClient.id})`)
        const products = await productManager.getProducts();
        socketClient.emit('notification', { products })
    })

    console.log('Server socket running 🚀');
}

export const emitFromApi = (event, data) => {
    console.log('event', event)
    console.log('data', data)
    return io.emit(event, data);
}