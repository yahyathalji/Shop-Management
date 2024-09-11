import {Request , Response} from "express";
import { Customers} from "../../entities/Customers";
import { CustomerDetails} from "../../entities/CustomerDetails";

//----------------------- get All Customer-----------------------
export const s_allCustomers = async (req:Request , res :Response) =>{
    try{
        const allCustomers = await CustomerDetails.find({relations:['customer']});
        return allCustomers;
    }catch(err){
        console.log(err);
    }
}

// -----------------------get cusotmer by id-----------------------
export const s_getCustomer = async (req:Request , res:Response) =>{
try{
    const id:any = req.params.id
    const getCustomer= await CustomerDetails.findOne({where :{customerID:id} , relations:['customer']});
    return getCustomer;
}catch(err){
    console.log(err);
}
}


// -----------------------create new customer-----------------------
export const s_addCustomer = async (req:Request , res: Response) =>{
try{
    const {firstName,lastName,address,phoneNumber,email,dateOfBirth} = req.body;

        // I Did This To Make Sure There Is No Duplicate, If There Is, You Should Not Go To The Database
        const isExist = await CustomerDetails.findOne({where :[
            {email:email},
            {phoneNumber:phoneNumber}
        ]})
        if(isExist?.phoneNumber===phoneNumber){
            return `Oops ! This Phone Is Exist ,Try Again Another Phone Number`
        }else if(isExist?.email===email){
            return `Oops ! This Email Is Exist ,Try Again Another Email`
        }
    const cusomter = Customers.create({
        firstName:firstName,
        lastName:lastName
    })
    await cusomter.save();
    const parsedDateOfBirth = new Date(dateOfBirth);

    if (isNaN(parsedDateOfBirth.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Please use 'YYYY-MM-DD' format." });
    }
    const customerDetails =  CustomerDetails.create({
        address:address,
        phoneNumber:phoneNumber,
        email:email,
        dateOfBirth:parsedDateOfBirth
    })

    customerDetails.customer =cusomter
    const toSave= await customerDetails.save();

    return `New customer added successfully`;
}catch(err){
    console.log(err);
    return err
}

}


//-----------------------Update/Edit Customer-----------------------
export const s_editCustomer = async (req: Request, res: Response) => {
    try {
        // Check if the request body is empty
        if (Object.keys(req.body).length === 0) {
            return  "Please provide fields to update.";
        }

        const id: any = req.params.id;

        // Fetch customer details
        const getCustomer = await CustomerDetails.findOne({ where: { customerID: id }, relations: ['customer'] });
        if (getCustomer === null) {
            return "Customer not found.";
        }

        const { firstName, lastName, address, phoneNumber, email, dateOfBirth } = req.body;
        // I Did This To Make Sure There Is No Duplicate, If There Is, You Should Not Go To The Database
        const isExist = await CustomerDetails.findOne({where :[
            {email:email},
            {phoneNumber:phoneNumber}
        ]})
        if(isExist?.phoneNumber===phoneNumber){
            return `Oops ! This Phone Is Exist ,Try Again Another Phone Number`
        }else if(isExist?.email===email){
            return `Oops ! This Email Is Exist ,Try Again Another Email`
        }
        // Update customer if fields are provided
        if (firstName || lastName) {
            await Customers.update({ customerID: id }, { firstName, lastName });
        }

        // Handle date of birth
        let parsedDateOfBirth;
        if (dateOfBirth) {
            parsedDateOfBirth = new Date(dateOfBirth);
            if (isNaN(parsedDateOfBirth.getTime())) {
                return   "Invalid date format. Please use 'YYYY-MM-DD' format.";
            }
        }
        if (parsedDateOfBirth === undefined) {
            parsedDateOfBirth = getCustomer.dateOfBirth;
        }

        // Update customer details
        await CustomerDetails.update({ customerID: id }, {
            address,
            phoneNumber,
            email,
            dateOfBirth: parsedDateOfBirth
        });

        return "Customer updated successfully.";

    } catch (error) {
        console.error("Error updating customer:", error);
        return  "An error occurred while updating the customer.";
    }
}


// -----------------------Delete customer-----------------------
export const s_deleteCustomer = async (req: Request, res: Response) => {
    try {
        const id: any = req.params.id;

        if (id) {
            const deleteCustomerDetails = await CustomerDetails.findOne({ where: { customerID: id }, relations: ['customer'] });

            if (deleteCustomerDetails !== null) {
                await CustomerDetails.remove(deleteCustomerDetails);

                const deleteCustomer = await Customers.findOne({ where: { customerID: id } });
                if (deleteCustomer) {
                    await Customers.remove(deleteCustomer); 
                }

                return "Delete is successful";
            } else {
                return "Oops! Customer not found to delete.";
            }
        } else {
            return "Invalid customer ID";
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
        return "An error occurred while deleting the customer.";
    }
}
