import { Router } from 'express';
import { ProductManager } from '../classes/productManager.js'
const router = Router();

const productManager = new ProductManager('src/data/products.json')

router.get('/', async (req, res) => {
    const product = await productManager.getProducts();
    // console.log(products)
    res.render('home', {
        product
    })
})

router.post('/', async (req, res) => {
    console.log('entra a la ruta')
    res.status(200).send('ok')
    const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    } = req.body;

    try {
        if (
            !(
                title &&
                description &&
                code &&
                price &&
                stock &&
                category
            )
        ) {
            return res.status(400).json({ error: `Some data is missing` });
        }
        if (
            !(
                typeof title === 'string' &&
                typeof description === 'string' &&
                typeof code === 'string' &&
                typeof price === 'number' &&
                typeof stock === 'number' &&
                typeof category === 'string'
            )
        ) {
            return res.status(400).json({
                error: `Any type received doesn't match`
            });
        }
        const newProduct = {
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails
        };

        let result = await productManager.addProduct(newProduct);

        if (typeof result !== 'string') {
            let products = await productManager.getProducts()
            emitFromApi('addProduct', products);
            res.status(201).send(newProduct);
        } else {
            return res.status(400).json({ error: result });
        }
    } catch (error) {
        console.log('error', error);
        return res.status(500).send(error);
    }
});

export default router