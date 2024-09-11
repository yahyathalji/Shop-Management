import { Request , Response } from "express";
import { Employees } from "../../entities/Employees";

// -------------------GET ALL EMPLOYEES-------------------
export const s_getAllEmployees = async (req:Request , res: Response)=>{
    try{
        const allEmployees = await Employees.find();
        if(allEmployees){
            return allEmployees;
        }else{
            return  `Oops ! Not Found Employees 404`;
        }

    }catch(err){
        console.log(err);
    }
}
//-------------------GET A SINGLE EMPLOYEE BY ID-------------------
export const s_getSingleEmployee = async (req:Request , res:Response)=>{
    try{
        const id :any = req.params.id;
        if(id){
            const getEmployee= await Employees.findOne({where :{employeeID:id}});
            if(getEmployee){
                return getEmployee
            }else{
                return `Oops ! Not Found Employee`;
            }
        }else{
            return `Please Enter The Id To Search`;
        }

    }catch(err){

        console.log(err);
    }
}

// -------------------ADD EMPLOYEE-------------------
export const s_addEmployee = async(req:Request , res: Response)=>{
    try{
        const {firstName ,lastName, gender ,birthDate } = req.body;
        
        const parsedDateBirth = new Date(birthDate);
        if (isNaN(parsedDateBirth.getTime())) {
            return  "Invalid date format. Please use 'YYYY-MM-DD' format.";
        }
        
        const newEmployee =  Employees.create({
            firstName:firstName,
            lastName:lastName,
            gender:gender,
            birthDate:parsedDateBirth
        })
        const toSave=  await newEmployee.save();
      return `The Added Employee Is Successfully`;
    //   return toSave;
    }catch(err){
        console.log(err);
    }
}

// -------------------EDIT EMPLOYEE-------------------
export const s_editEmployee = async (req:Request , res:Response) =>{
    try{
        const id :any = req.params.id;
        if(id){
            const isFound = await Employees.findOne({where :{employeeID:id}});
            if(isFound){
                if(Object.keys(req.body).length ===0){
                    return  "Please provide fields to update.";
                }
                const {firstName ,lastName, gender ,birthDate } = req.body;
                var parsedDateBirth
                if(birthDate){
                    parsedDateBirth = new Date(birthDate);
                    if (isNaN(parsedDateBirth.getTime())) {
                        return  "Invalid date format. Please use 'YYYY-MM-DD' format.";
                    }
                }
                if(firstName || lastName || gender)
                    await Employees.update({employeeID:id},{
                firstName,
                lastName,
                gender,
                birthDate:parsedDateBirth
            });
            return `The Edit Employee Is Successfully`
        }else{
            return `Oops ! Is Not Found 404`
        }
    }else{
        return `Please Enter The Id To Search`;           
    }
    
}catch(err){
    console.log(err);
}
}

// -------------------Delete EMPLOYEE-------------------
export const s_deleteEmployee = async (req:Request , res:Response) =>{
    try{
        const id:any = req.params.id;
        const isExsist = await Employees.findOne({where:{employeeID:id}})
        if(isExsist){
            await Employees.remove(isExsist);
            return `The Employee : '${isExsist.firstName}' Is Deleted, Successfully `
        }else{
            return `Oops ! Is Not Exsist To Delete , Try Again`
        }
    }catch(err){
        console.log(err);
    }
}