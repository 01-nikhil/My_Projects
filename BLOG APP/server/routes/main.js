const express= require('express');
const router=express.Router();
const Post=require('../models/schema')
const User=require('../models/user')

router.get('',async (req,res)=>{

    
    try{
        const locals={
            title:"NODEjs Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }

        const perPage=10;
        const page=req.query.page || 1;
        const data= await Post.aggregate([ {$sort:{createdAt:-1}}])
        .skip(perPage*page-perPage)
        .limit(perPage)
        .exec();

        const count=await Post.countDocuments();
        const nextPage=parseInt(page)+1;
        const hasNextPage=nextPage<=Math.ceil(count/perPage);
       
        res.render('index',{
            locals,
            data,
            current :page,
            nextPage:hasNextPage?nextPage:null,
        })
    }
    
    catch(err){
        console.log(err);
    }   

})


router.get('/post/:id',async (req,res)=>{

    
    try{
        const locals={
            title:"NODEjs Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }

        const slug=req.params.id;
        const data=await Post.findById({_id:slug})
        res.render("post",{locals,data});
    }
    
    catch(err){
        console.log(err);
    }   

})
router.post('/search',async (req,res)=>{

    
    try{
        const locals={
            title:"NODEjs Blog",
            description:"Blog creation using NodeJS,Express and MongoDB"
        }

        let searchTerm= req.body.searchTerm;
        const searchNoSpecialCharacter= searchTerm.replace("/^[a-zA-Z0-9]*$/","");
        const data= await Post.find({
            $or:[
                {title :{$regex: new RegExp(searchNoSpecialCharacter,"i")}},
                {body :{$regex: new RegExp(searchNoSpecialCharacter,"i")}}
            ]
        })
    res.render("search",{locals,data});

    }
    
    catch(err){
        console.log(err);
    }   

})





router.get('/about',(req,res)=>{
    res.render('about')
})

module.exports=router;