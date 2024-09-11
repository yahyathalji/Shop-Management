import express from 'express';
import { getAllOrders ,getOrder,createOrder,deleteOrder } from '../../controllers/order Controller/orderController';

const orderRoute=express.Router();


/**
 *  @description  Get All Orders
 *  @route        /allorders
 *  @method       Get
 *  @access       public
 * 
 */
orderRoute.get("/allorders",getAllOrders)

/**
 *  @description  Get Order By Id
 *  @route        /getOrder/:id
 *  @method       Get
 *  @access       public
 * 
 */
orderRoute.get("/getOrder/:id",getOrder)

/**
 *  @description  Add New Order
 *  @route        /addOrder
 *  @method       Post
 *  @access       public
 * 
 */
orderRoute.post("/addOrder",createOrder)


/**
 *  @description  Delete Order
 *  @route        /deleteOrder/:id
 *  @method       Delete
 *  @access       public
 * 
 */
orderRoute.delete("/deleteOrder/:id",deleteOrder)

export default orderRoute;