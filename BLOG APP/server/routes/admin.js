const express= require('express');
const router=express.Router();
const Post=require('../models/schema')
const User=require('../models/user')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const adminLayout='../views/layouts/admin';

const jwtSecret=process.env.JWT_SECRET;


const authMiddleware =(req,res,next)=>{

    const token=req.cookies.token;
     if(!token)
     {
        return res.status(401).json({message:"Unauthorized"});
    }
    
    try {
        const decoded=jwt.verify(token,jwtSecret)
        req.userId=decoded.userId;
        next();
        
    } catch (error) {
         return res.status(401).json({message:"Unauthorized"});
        
     }
}




router.get('/admin',async (req,res)=>{

    
    try{
        const locals={
            title:"Admin Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }
        res.render("./admin/login",{locals,layout:adminLayout})
    }
    
    catch(err){
        console.log(err);
    }   

})



router.post('/register',async (req,res)=>{
    
    
    try{
        const{username,password}=req.body;
        const hasedPassword= await bcrypt.hash(password,10);
        try {
            const user= await User.create({username,password:hasedPassword});
            res.status(201).json({message:"User created",user});
        } catch (error) {
            return res.status(409).json({ message: "Username already in use" });
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }   
    
})


router.post('/admin',async (req,res)=>{

    
    try{
        const{username,password}=req.body;
        const user=await User.findOne({username});
        if(!user)
        {
           return res.status(409).json({message:"Invalid credentials"});
        }
        const isValidPassword=await bcrypt.compare(password,user.password);
        
        if(!isValidPassword)
            {
                return res.status(409).json({message:"Invalid credentials"});
            }
         
            const token=jwt.sign({userId:user._id},jwtSecret)
            res.cookie('token',token,{httpOnly:true});

            res.redirect("/dashboard");
    }
    
    catch(err){
        console.log(err);
    }   

})




router.get('/dashboard' ,authMiddleware,async (req,res)=>{
    try {
        const locals={
            title:"Admin Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }
        const data=await Post.find();
        res.render("./admin/dashboard",{locals,data,layout:adminLayout})
    } catch (error) {
        console.log(error);
    }
});



router.get('/add-post' ,authMiddleware,async (req,res)=>{
    try {
        const locals={
            title:"Admin Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }
        const data=await Post.find();
        res.render("./admin/add-post",{locals,layout:adminLayout})
    } catch (error) {
        console.log(error);
    }
});


router.post('/add-post' ,authMiddleware,async (req,res)=>{
    try {
        try{
        const newPost= new Post({
            title:req.body.title,
            body:req.body.body,
        })
        await Post.create(newPost);
        res.redirect("/dashboard");
    }
    catch(error){
        console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});


router.get('/edit-post/:id' ,authMiddleware,async (req,res)=>{
    try {
        const data=await Post.findOne({_id:req.params.id});
        res.render("admin/edit-post",{data,layout:adminLayout})
    }
    catch(error){
        console.log(error);
        }
});

router.put('/edit-post/:id' ,authMiddleware,async (req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            body:req.body.body,
            updatedAt:Date.now()
        })
        res.redirect(`/post/${req.params.id}`)
    }
    catch(error){
        console.log(error);
    }
});

router.delete('/delete-post/:id' ,authMiddleware,async (req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect("/dashboard");
    }
    catch(error){
        console.log(error);
    }
});

router.get('/logout',async (req,res)=>{
    try {
        res.clearCookie('token');
        res.redirect("/");
    }
    catch(error){
        console.log(error);
        }
});

module.exports=router;