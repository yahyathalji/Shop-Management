import { Request , Response } from "express";
import { s_addCustomer, s_allCustomers, s_editCustomer, s_getCustomer ,s_deleteCustomer } from "../../services/customer services/customerServices";
import {validationResult} from "express-validator"


// ----------------------get all customer ----------------------
export const allCustomers = async (req :Request, res:Response) =>{
    const result = await s_allCustomers(req,res);
    if(result?.length ===0){
        res.status(404).json({msg:`Is Not Found Yet...`});

    }else{
        res.status(200).json(result);
    }
}

// ----------------------get a customer by id ----------------------
export const getCustomer = async (req:Request , res:Response) =>{
    const result = await s_getCustomer(req, res);
    if(result ===null){
        res.status(404).json({msg:` Opes! Is Not Found...`});

    }else{
        res.status(200).json(result);

    }
}

// ----------------------create new customer ----------------------
export const addCustomer = async (req:Request , res:Response) =>{
    
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        res.json({
            error:true,
            errors:errors.array()[0],
            message :"there are some validation"
        })
        
    }else{
        const result = await s_addCustomer(req, res);
        res.status(200).json(result);
    }
} 
 
// ----------------------Update/Edit customer ----------------------
export const editCustomer = async (req:Request , res:Response) =>{
try{
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        res.json({
            error:true,
            errors:errors.array()[0],
            message :"there are some validation"
        })
        
    }else{
        const result = await s_editCustomer(req, res);
        res.status(200).json(result);
    }
}catch{}
}

// ----------------------Delete a customer by id ----------------------
export const deleteCustomer = async (req:Request , res:Response) =>{
    const result = await s_deleteCustomer(req, res);
    if(result ===null){
        res.status(404).json({msg:` Opes! Is Not Found...`});
    }else{
        res.status(200).json(result);
    }
}
