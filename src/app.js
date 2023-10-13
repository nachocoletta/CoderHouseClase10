import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import productRouterInRealTime from './routers/product.router.js';
import productsRouter from './routers/products.router.js'
import handlebars from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Obtén la ruta del directorio 'src'
const srcDir = dirname(__dirname);

// Obtén la ruta del directorio 'utils' dentro de 'src'
const utilsDir = path.join(srcDir, 'utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Utiliza 'utilsDir' para construir la ruta a la carpeta 'public'
const publicDir = path.join(utilsDir, '../public');
app.use(express.static(publicDir));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter)
app.use('/api/realtimeproducts', productRouterInRealTime);


app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
});

export default app;
