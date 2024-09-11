import joi from "joi";

export const validationAddProduct = (obj:Object) =>{
    const schema = joi.object({
        category : joi.string().trim().required(),
        price : joi.number().greater(0).required(),
        quantity : joi.number().min(0).required()
    })
    return schema.validate(obj) 
}

export const validationEditProduct = (obj:Object) =>{
    const schema = joi.object({
        category : joi.string().trim(),
        price : joi.number().greater(0),
        quantity : joi.number().min(0)
    })
    return schema.validate(obj) 
}