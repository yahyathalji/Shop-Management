import { Request, Response } from "express";
import { Products } from "../../entities/Products";

export const s_getAllProducts = async (req:Request , res:Response) => {
    try{
            const getAllProducts = await Products.find();
            if(getAllProducts){
                return getAllProducts;
            }else{
                return `Oops ! Sorry, There Are No Products Yet.`
            }

    }catch(err){
        console.log(err);
    }
}

export const s_getProduct = async (req: Request, res: Response) => {
    try {
        const id: any = req.query.id;
        const category: any = req.query.category;

        if (category) {
            const isExist = await Products.findOne({ where: { category: category } });
            if (isExist) {
                return res.status(200).json(isExist);
            } else {
                return res.status(404).json({ message: "Sorry, category not found." });
            }
        }

        if (id) {
            const isExist = await Products.findOne({ where: { productID: id } });
            if (isExist) {
                return res.status(200).json(isExist); 
            } else {
                return res.status(404).json({ message: "Sorry, product not found by id." });
            }
        }
        return res.status(400).json({ message: "Please provide either 'id' or 'category'." });

    } catch (err) {
        console.error(err);
    }
}


export const s_addNewProduct = async (req: Request , res:Response) => {
    try{
        const {category, price, quantity} = req.body;
// I Did This To Make Sure There Is No Duplicate, If There Is, You Should Not Go To The Database
        const isExist = await Products.findOne({where:{category:category}});
        if(isExist?.category ===category){
            return `Sorry, This Item Already Exists.`
        }

        const addProduct = Products.create({
            category:category,
            price:price, 
            quantity:quantity
        })
        await addProduct.save();
        return `The Product Has Been Added Successfully.`
    }catch(err){
        console.log(err);
    }
}

export const s_editProduct =async (req:Request ,res:Response) => {
    try {
        const categorys: any = req.query.category;
        if (categorys) {
            const isExist = await Products.findOne({ where: { category: categorys } });

            if (isExist) {
                const{category , price , quantity} = req.body;
                if(isExist?.category===categorys){
                    return `Sorry, This Item Already Exists.`
                }
                console.log(req.body.price);
                if(category || price || quantity){
                 await Products.update({ category: categorys } ,{
                    category,
                    price,
                    quantity
                })
                return `update Products Successfully`
            }
            } else {
                return  "Sorry, category not found.";
            }
        }
    } catch (err) {
        console.error(err);
    }
}


export const s_deleteProduct = async (req: Request, res: Response) => {
    try {
        const categorys: any = req.query.category ;
        if (categorys) {
            const product = await Products.findOne({ where: { category: categorys } });
            if (product) {
                const result=await Products.delete({ category: categorys });
                if(result.affected && result.affected >0){
                    console.log(result.affected);
                    return `The Products: '${product.category}' has been deleted successfully.`;
                }else{
                    return `No products found with category`
                }
            } else {
                return 'Sorry, category not found.';
            }
        } else {
            return 'Category query parameter is required.';
        }
    } catch (err) {
        console.error(err);
    }
}