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
        socketClient.emit('notification', { products });

        socketClient.on('new-product', (data) => {
            io.emit('notification-in-real-time', { data });
        });
        socketClient.on('delete-product', (data) => {
            // console.log('entra')
            io.emit('notification-in-real-time', data);
        });

        socketClient.on('update-product', (data) => {
            io.emit('notification-in-real-time', data);
        })
        // socketClient.emit('notification-in-real-time', { products })
    });

    // io.on('new-product', (data) => {
    //     io.emit('notification-in-real-time', { data });
    // });
    // io.on('delete-product', (data) => {
    //     console.log('entra')
    //     io.emit('notification-in-real-time', data);
    // });
    console.log('Server socket running 🚀');
}

export const emitFromApi = (event, data) => io.emit(event, data);

// export const handleSocketConnection = (socket, productManager) => {
//     socket.on('new-product', async (data) => {
//         await productManager.addProduct({
//             title: data.title,
//             description: data.description,
//             code: data.code,
//             price: data.price,
//             stock: data.stock,
//             category: data.category,
//             thumbnails: []
//         });

//         const updatedProducts = await productManager.getProducts();

//         // io.emit('notification', { products: updatedProducts });
//         io.emit('notification-in-real-time', { products: updatedProducts });
//     });
// };
