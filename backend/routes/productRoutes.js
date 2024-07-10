import express from 'express';
const router = express.Router();
import { getPrducts,getPrductById,createProduct,updateProduct} from '../controllers/productController.js';
import { protect , admin} from '../middleware/authMiddleware.js';



router.route('/')
      .get(getPrducts)
      .post(protect,admin ,createProduct);
router.route('/:id').get(getPrductById).put(protect , admin ,updateProduct);

export default router;
