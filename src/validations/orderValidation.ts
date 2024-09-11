import joi from "joi";

export const ValidationAddOrder = (obj: Object) => {
    const schema = joi.object({
        empId: joi.number().integer().positive().required(),
        custId: joi.number().integer().positive().required(),
        products: joi.array().items(
            joi.object({
                category: joi.string().required(),
                quantity: joi.number().integer().positive().required()
            })
        ).required()
    });

    return schema.validate(obj, { abortEarly: false });
}

