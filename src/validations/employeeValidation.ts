import joi from 'joi';

export const ValidationToNewEmployee = (obj:object)=>{
    const schema = joi.object({
        firstName : joi.string().trim().min(2).max(25).required(),
        lastName : joi.string().trim().min(2).max(25).required(),
        gender:joi.string().trim().lowercase().valid('male','female').required(),
        birthDate: joi.date().iso().required()
    })
    return schema.validate(obj) // Allows you to see the error one by one.
    // return schema.validate(obj ,{abortEarly:false}) // this allows if you want to see all errors in once

}

export const ValidationToEditEmployee = (obj:object)=>{
    const schema = joi.object({
        firstName : joi.string().trim().min(2).max(25),
        lastName : joi.string().trim().min(2).max(25),
        gender:joi.string().trim().lowercase().valid('male','female'),
        birthDate: joi.date().iso()
    })
    return schema.validate(obj) // Allows you to see the error one by one.
    // return schema.validate(obj ,{abortEarly:false}) // this allows if you want to see all errors in once

}