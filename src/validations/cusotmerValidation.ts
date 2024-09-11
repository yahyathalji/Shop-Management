import { check } from "express-validator"

export const createNewCustomerValidator = () => {
    return [
        check("firstName")
            .exists().withMessage("The First Name Is Required")
            .notEmpty().withMessage('First name cannot be empty')
            .isLength({ min: 2, max: 40 }).withMessage("Name should be between 2 and 40 characters"),

        check("lastName")
            .exists().withMessage("The Last Name Is Required")
            .notEmpty().withMessage('Last name cannot be empty')
            .isLength({ min: 2, max: 40 }).withMessage("Name should be between 2 and 40 characters"),

        check("address")
            .exists().withMessage("The Address Is Required")
            .notEmpty().withMessage('Address cannot be empty'),

        check("phoneNumber")
            .exists().withMessage("The Phone Number Is Required")
            .notEmpty().withMessage('Phone number cannot be empty')
            .isLength({ min: 10, max: 10 }).withMessage("Phone number must be exactly 10 digits")
            .isNumeric().withMessage("Phone number must contain only numbers"),

        check("email")
            .exists().withMessage("The Email Is Required")
            .notEmpty().withMessage('Email cannot be empty')
            .isEmail().withMessage("Invalid email format"),

        check("dateOfBirth")
            .exists().withMessage("The Date Of Birth Is Required")
            .notEmpty().withMessage('Date of birth cannot be empty')
            .isISO8601().withMessage("Date must be in the format YYYY-MM-DD")
            .toDate()
    ]
}


export const editCustomerValidator = () => {
    return [
        check("firstName")
            .optional() 
            .notEmpty().withMessage('First name cannot be empty')
            .isLength({ min: 2, max: 40 }).withMessage("Name should be between 2 and 40 characters"),

        check("lastName")
            .optional()
            .notEmpty().withMessage('Last name cannot be empty')
            .isLength({ min: 2, max: 40 }).withMessage("Name should be between 2 and 40 characters"),

        check("address")
            .optional() 
            .notEmpty().withMessage('Address cannot be empty'),

        check("phoneNumber")
            .optional() 
            .notEmpty().withMessage('Phone number cannot be empty')
            .isLength({ min: 10, max: 10 }).withMessage("Phone number must be exactly 10 digits")
            .isNumeric().withMessage("Phone number must contain only numbers"),

        check("email")
            .optional() 
            .notEmpty().withMessage('Email cannot be empty')
            .isEmail().withMessage("Invalid email format"),

        check("dateOfBirth")
            .optional() 
            .notEmpty().withMessage('Date of birth cannot be empty')
            .isISO8601().withMessage("Date must be in the format YYYY-MM-DD")
            .toDate()
    ];
}
