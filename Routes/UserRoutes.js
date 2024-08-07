const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel = require("../Models/userModel")
const dotenv = require("dotenv");

dotenv.config();
const UserRouter=express.Router()

// this route for SignUp
UserRouter.post("/SignUp",async(req,res)=>{
    try {
        const { username, email, password} = req.body
    
        const isUser = await UserModel.findOne({ email })
        if (isUser) {
            return res.status(201).send({ msg: "user already present You can directly Login" })
    
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            const newUser= new UserModel({username,email,password:hash})
            console.log("Signup",newUser)
            await  newUser.save()
    
            res.status(200).send({ msg: "Registration Successful" })
        })
    
        
       } catch (error) {
        res.status(500).send({ msg: error.message })
       }

})




// this route for login
UserRouter.post("/Login",async(req,res)=>{
    try {
        const {username, email, password } = req.body
    
        let query={}
        if(email){
            query.email=email
        }
        if(username){
            query.username=username
        }
    
        const isUser= await UserModel.findOne(query)
        console.log("login",isUser)
    
        if(!isUser){
            return res.status(201).send({ msg: "You Need To Register" })
        }
        bcrypt.compare(password,isUser.password,(err,result)=>{
            if(result){
                const token= jwt.sign({UserID:isUser._id},process.env.TokenSecret,{expiresIn:"1h"})
                res.status(201).send({msg:"Login Successful",token,isUser})
            }else{
                return res.status(401).send({msg:"invalid credintials"})
            }
        })
        
       } catch (error) {
        res.status(500).send({ msg: error.message })
       }

})



module.exports={UserRouter}