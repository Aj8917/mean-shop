import express from 'express';
const router = express.Router();
import { getPrducts,getPrductById,createProduct,updateProduct , deleteProduct} from '../controllers/productController.js';
import { protect , admin} from '../middleware/authMiddleware.js';



router.route('/')
      .get(getPrducts)
      .post(protect,admin ,createProduct);
router.route('/:id')
      .get(getPrductById)
      .put(protect , admin ,updateProduct)
      .delete(protect , admin ,deleteProduct);;

export default router;
