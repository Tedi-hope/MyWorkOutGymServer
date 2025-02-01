import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authenticateUser=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
      return res.status(401).send({message:'Unauthorized:No token provided'});
    }

    const token=authHeader.split(' ')[1];
     try{
        const decoded=jwt.verify(token,JWT_SECRET);

        if(!decoded || !decoded.islogged){
            return res.status(403).json({message:'Invalid token payload'});
        }
        req.user=decoded;
        console.log('Authenticated User:', req.user); // Add this log
        next();
     }
     catch(error){
        console.log(error.message);
        return res.status(403).send({message:'Unauthorized:Invalid or expired token'});
      }
}