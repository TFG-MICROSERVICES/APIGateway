import { generateError } from "../utils/generateError.js";

export const isAdmin = (req,res,next) =>{
    try{    
        const { admin } = req.user;
        if(!admin) generateError('You dont allow this route',403);
        next();
    }catch(error){
        next(error);
    }
}