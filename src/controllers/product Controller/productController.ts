import { Request , Response } from "express";
import { s_getAllProducts , s_getProduct , s_addNewProduct, s_editProduct, s_deleteProduct } from "../../services/product services/productServices";
import asyncHandler from 'express-async-handler'
import { validationAddProduct, validationEditProduct } from "../../validations/productValidation";

//----------------------Get All Products ----------------------
export const getAllProducts = asyncHandler(async (req:Request , res: Response) => {

        const result = await s_getAllProducts(req, res);
        if(result?.length===0){
            res.status(404).json({msg:'Sorry, There Are No Products Yet'})
        }
             res.status(200).json(result)

})

// ----------------------Get Product ----------------------
export const getProduct = asyncHandler(async (req:Request , res: Response) => {

        const result = await s_getProduct(req, res);
        res.status(200).json(result)

}
)

// ---------------------- Add New Product----------------------
export const addNewproduct =asyncHandler( async (req:Request , res: Response) => {
    
       const {error}= validationAddProduct(req.body)
       if(error){
         res.status(201).json({message : error.message });
         return;
       }
        const result = await s_addNewProduct(req, res);
        res.status(200).json(result)

}
)
// ---------------------- Edit Product----------------------
export const editProduct =asyncHandler( async (req:Request , res: Response) => {
    
    const {error}= validationEditProduct(req.body)
    if(error){
      res.status(201).json({message : error.message });
      return;
    }
     const result = await s_editProduct(req, res);
     res.status(200).json(result)

}
)
//---------------------- Delete Product ----------------------
export const deleteProduct =asyncHandler(async (req:Request , res: Response) => {

        const result = await s_deleteProduct(req, res);
        res.status(200).json(result)

})

