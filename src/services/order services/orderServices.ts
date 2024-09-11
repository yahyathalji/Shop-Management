import { Request , Response } from "express";
import { Orders} from "../../entities/Orders";
import { Employees } from "../../entities/Employees";
import { Products } from "../../entities/Products";
import { Customers } from "../../entities/Customers";
import { AppDataSource } from "../../database/db";
import {In} from 'typeorm'

// ----------------------Get All Orders----------------------
export const s_getAllOrders = async(req:Request,res:Response)=>{
    
    try{
        const getAllOrders= await Orders.find({relations:['employee' ,'customer','products']})
         const all=getAllOrders.map(order =>({
            orderId:order.orderID,
            orderDate:order.orderDate,
            orderTotal:order.orderTotal +"$",
            employeeName:order.employee.firstName,
            customerName:order.customer.firstName,
            productname:order.products.map(p => p.category).join(" , ")
         }))
        return all;

    }catch(err){
    console.log(err);
    }
}

// ----------------------Get Order by Id----------------------
export const s_getOrder = async(req:Request,res:Response)=>{
    try{
        const idorder:any=req.params.id
        const getOrder= await Orders.find({where:{orderID:idorder},relations:['employee' ,'customer','products']})
         const singleOrder=getOrder.map(order =>({
            orderId:order.orderID,
            orderDate:order.orderDate,
            orderTotal:order.orderTotal,
            employeeName:order.employee.firstName,
            customerName:order.customer.firstName,
            productname:order.products.map(p => p.category)
         }))
        return singleOrder;

    }catch(err){
        console.log(err);
    }
}


// ----------------------Create Order----------------------
export const s_createOrder = async (req: Request, res: Response) => {
// Get the query runner from AppDataSource
const queryRunner = AppDataSource.createQueryRunner();

    try {
        await queryRunner.startTransaction();

        const { empId, custId, products } = req.body;

        const empIsExist = await Employees.findOne( { where: { employeeID: empId } });
        if (!empIsExist) {
            return res.status(400).json({ message: "The employee number is incorrect or the account does not exist" });
        }

        const custIsExist = await Customers.findOne( { where: { customerID: custId } });
        if (!custIsExist) {
            return res.status(400).json({ message: "The customer number is incorrect or the account does not exist" });
        }

        // Extract categories from products
        const categories = products.map((p: { category: string }) => p.category); // or p => p.category === category
        
        // Extract quantities from products
        const quantities = products.map((p: { quantity: number }) => p.quantity); // or p => p.quantity === quantity

        // Check if the products exist
        const productsIsExist = await Products.find( {
            where: {
                category: In(categories)
            }
        });
        if (productsIsExist.length !== categories.length) {
            return res.status(400).json({ message: "Sorry, some products do not exist." });
        }
        let orderTotal: number = 0;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const quantityToCheck = quantities[i];

            const product = productsIsExist.find(p => p.category === category);
            if (!product) {
                await queryRunner.rollbackTransaction();
                return res.status(400).json({ message: `Product with category '${category}' does not exist.` });
            }

            const availableQuantity = product.quantity ?? 0;

            // Check the available quantity
            if (availableQuantity < quantityToCheck) {
                await queryRunner.rollbackTransaction();
                return res.status(400).json({ message: `The quantity required for category '${category}' is greater than the quantity available.` });
            }

            // Update the quantity
            product.quantity = availableQuantity - quantityToCheck;
            orderTotal += product.price * quantityToCheck;

            // Save the changes to the product
            await queryRunner.manager.save(product); //   await Products.save(product);
        }

        // Create order
        const createOrder = Orders.create({
            orderTotal: orderTotal,
            orderDate: new Date(),
            customer: custIsExist,
            employee: empIsExist,
            products: productsIsExist,
        });

        await queryRunner.manager.save(createOrder);
        await queryRunner.commitTransaction();

        res.status(201).json({ message: "Order created successfully", order: createOrder });
    } catch (err) {
        await queryRunner.rollbackTransaction();
        console.error(err);
        res.status(500).json({ message: "An error occurred while creating the order" });
    } finally {
        await queryRunner.release();
    }
};


// ----------------------Delete Order----------------------
export const s_deleteOrder = async(req:Request,res:Response)=>{
    try{
        const id:any = req.params.id
        console.log(typeof id);
        if(! (id > 0)){
            return `Oops ! Not Found id numbers`
        }
        const deleteOrder = await Orders.delete({orderID:id})
        if(deleteOrder.affected && deleteOrder.affected>0){
            return `The deletion process was completed successfully.`
        }else{
            return `Not in database`
        }
    }catch(err){
        console.log(err);
    }
}
