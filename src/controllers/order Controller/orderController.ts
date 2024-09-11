import { Request ,Response } from "express";
import { s_getAllOrders ,s_getOrder , s_createOrder ,s_deleteOrder} from "../../services/order services/orderServices";
import {ValidationAddOrder } from "../../validations/orderValidation";


// ----------------------Get All Orders----------------------
export const getAllOrders = async (req:Request,res:Response ) => {
    
        try{
            const result = await s_getAllOrders(req, res)
            if(result?.length===0){
                res.status(400).json({msg: 'Oops ! Database is empty No orders yet'});
            }else{
                res.status(200).json(result);
            }
        }catch(err){
            console.log(err);
        }
    
}

// ----------------------Get Order by Id----------------------
export const getOrder = async (req:Request,res:Response ) => {
    try{
        const result = await s_getOrder(req, res)
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
}

// ----------------------Create Order----------------------
export const createOrder = async (req:Request,res:Response ) => {

    try{
        const {error} = ValidationAddOrder(req.body);
        if(error){
                return res.status(400).json({message : error.message });
            }else{
                const result = await s_createOrder(req,res)
                res.status(200).json(result);
            }
    }catch(err){
        console.log(err);
    }
}


// ----------------------Delete Order----------------------
export const deleteOrder = async (req:Request,res:Response ) => {
    try{
        const result = await s_deleteOrder(req,res)
        res.status(200).json(result);
   }catch(err){
       console.log(err);
   }
}