import express from 'express';
const router = express.Router();
import { getPrducts,getPrductById,createProduct} from '../controllers/productController.js';
import { protect , admin} from '../middleware/authMiddleware.js';



router.route('/')
      .get(getPrducts)
      .post(protect,admin ,createProduct);
router.route('/:id').get(getPrductById);

export default router;
