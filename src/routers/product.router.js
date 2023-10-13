import { Router } from 'express';
import { emitFromApi } from '../socket.js'

const router = Router();

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/realtimeproducts', async (req, res) => {
  res.render('realtimeproducts')
})


router.post('/', async (req, res) => {
  const hola = emitFromApi('new-message-from-api',
    { username: 'api', text: 'Hola desde el API' })
  res.status(200).json(hola)
})

export default router;