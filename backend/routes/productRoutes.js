import express from 'express';
const router = express.Router();
import { getPrducts,getPrductById } from '../controllers/productController.js';



router.route('/').get(getPrducts);
router.route('/:id').get(getPrductById);

export default router;
