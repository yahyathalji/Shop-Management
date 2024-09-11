import { Request , Response } from "express";
import { s_getAllEmployees ,s_getSingleEmployee ,s_addEmployee ,s_editEmployee ,s_deleteEmployee} from "../../services/employee services/employeeServices";
import { ValidationToNewEmployee ,ValidationToEditEmployee} from "../../validations/employeeValidation";

//----------------------GET ALL EMPLOYEES----------------------
export const getAllEmployees = async (req:Request , res :Response)=>{
    try{
        const result = await s_getAllEmployees(req, res)
        if(result?.length===0){
            res.status(400).json({msg: 'Oops ! Database is empty No employees yet'});
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        console.log(err);
    }
}

//----------------------GET A SIGNNLE EMPLOYEE----------------------
export const getEmployee = async (req:Request , res :Response)=>{
    try{
        const result = await s_getSingleEmployee(req, res)
        res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
}

//----------------------ADD NEW EMPLOYEE ----------------------
export const AddNewEmployee = async (req:Request , res :Response)=>{

    try{
        const {error} = ValidationToNewEmployee(req.body);
        if(error){
                return res.status(400).json({message : error.message });
            }else{
                const result = await s_addEmployee(req,res)
                res.status(200).json(result);
            }
    }catch(err){
        console.log(err);
    }
}

//----------------------Edit EMPLOYEE----------------------
export const editEmployee = async (req:Request , res :Response)=>{

    try{
        const {error} = ValidationToEditEmployee(req.body);
        if(error){
                return res.status(400).json({message : error.message });
            }else{
                const result = await s_editEmployee(req,res)
                res.status(200).json(result);
            }
    }catch(err){
        console.log(err);
    }
}


//----------------------Delete EMPLOYEE----------------------
export const deleteEmployee = async (req:Request , res :Response)=>{

    try{
         const result = await s_deleteEmployee(req,res)
         res.status(200).json(result);
    }catch(err){
        console.log(err);
    }
}


