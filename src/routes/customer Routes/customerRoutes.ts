import express from "express"
import { addCustomer, allCustomers, getCustomer ,editCustomer,deleteCustomer } from "../../controllers/customer Controller/customerController";
import { createNewCustomerValidator, editCustomerValidator } from "../../validations/cusotmerValidation";

const customerRoute = express.Router();
customerRoute.use(express.json());


/**
 *  @description  Get All Customers
 *  @route        /allCustomers
 *  @method       Get
 *  @access       public
 * 
 */

customerRoute.get("/allCustomers",allCustomers)

/**
 *  @description  Get Customers By Id
 *  @route        /getCustomer/:id
 *  @method       Get
 *  @access       public
 * 
 */
customerRoute.get("/getCustomer/:id",getCustomer)

/**
 *  @description  Create New Customer and i'm add validation 
 *  @route        /addCustomer
 *  @method       Post
 *  @access       public
 * 
 */
customerRoute.post("/addCustomer",createNewCustomerValidator(),addCustomer)

/**
 *  @description  Edit Customer
 *  @route        /editCustomer/:id
 *  @method       Put
 *  @access       public
 * 
 */
customerRoute.put("/editCustomer/:id",editCustomerValidator(),editCustomer)

/**
 *  @description  Delete Customer
 *  @route        /deleteCustomer/:id
 *  @method       Delete
 *  @access       public
 * 
 */
customerRoute.delete("/deleteCustomer/:id",deleteCustomer)



export default customerRoute;