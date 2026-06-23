import express from 'express' ;
import { createProduct, getProducts, updateProduct } from '../controllers/product.js';

const router = express.Router() 

router.route("/").get(getProducts).post(createProduct)
router.route("/:id").put(updateProduct)


export default router