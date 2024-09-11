import express from "express"
import {getEmployee , getAllEmployees , AddNewEmployee, editEmployee, deleteEmployee} from "../../controllers/employee Controller/employeeController"
import { ValidationToNewEmployee } from "../../validations/employeeValidation";
const employeeRoute = express.Router();


/**
 *  @description  Get All Employees
 *  @route        /allEmployees
 *  @method       Get
 *  @access       public
 * 
 */
employeeRoute.get("/allEmployees",getAllEmployees)

/**
 *  @description  Get Employee By Id
 *  @route        /getEmployee/:id
 *  @method       Get
 *  @access       public
 * 
 */
employeeRoute.get("/getEmployee/:id",getEmployee)

/**
 *  @description  Add New Employee
 *  @route        /addEmployee
 *  @method       Post
 *  @access       public
 * 
 */
employeeRoute.post("/addEmployee",AddNewEmployee)

/**
 *  @description  Edit Employee
 *  @route        /editEmployee/:id
 *  @method       Put
 *  @access       public
 * 
 */

employeeRoute.put("/editEmployee/:id",editEmployee)

/**
 *  @description  Delete Employee
 *  @route        /deleteEmployee/:id
 *  @method       Delete
 *  @access       public
 * 
 */
employeeRoute.delete("/deleteEmployee/:id",deleteEmployee)

export default employeeRoute;