import express from 'express';
import {getAllProducts , getProduct , addNewproduct, editProduct, deleteProduct} from '../../controllers/product Controller/productController'
const productRoute = express.Router();

/**
 *  @description  Get All Products
 *  @route        /allProducts
 *  @method       Get
 *  @access       public
 * 
 */
productRoute.get("/allProducts",getAllProducts)

/**
 *  @description  Get Products By Id And category
 *  @route        /getProduct
 *  @method       Get
 *  @access       public
 * 
*/
productRoute.get("/getProduct",getProduct)

/**
 *  @description  Add New Products
 *  @route        /addProduct
 *  @method       Post
 *  @access       public
 * 
 */
productRoute.post("/addProduct",addNewproduct)
/**
 *  @description  Edit Products
 *  @route        /editProduct?category=categoryName OR /editProduct?id=23
 *  @method       Put
 *  @access       public
 * 
 */
productRoute.put("/editProduct" ,editProduct)
/**
 *  @description  Delete Products by category Name
 *  @route        /deleteProduct?category=categoryName
 *  @method       Delete
 *  @access       public
 * 
 */
productRoute.delete("/deleteProduct",deleteProduct)

export default productRoute; 