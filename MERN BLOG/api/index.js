const express=require('express');
const app=express();
const cors=require('cors');
const User=require('./models/User');
const  mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
const secret='secret123';
mongoose.connect('mongodb://localhost:27017/mern-blog');



app.post('/register',async(req,res)=>{
    try {
        const {username,password}=req.body;
        const data=await User.create({
            username,
            password:bcrypt.hashSync(password,10),
        });
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: 'Invalid username or password' });
    }
});


app.post('/login',async(req,res)=>{
    try {
        const {username,password}=req.body;
        const data=await User.findOne({username:username});
        const isMatch=bcrypt.compareSync(password,data.password)
        
        if(isMatch)
            {
                const token=jwt.sign({username,id:data._id},secret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token,{httpOnly:true});
                    res.json(token);
                })
            }
            else{
                res.status(400).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    });
    
    app.get('/profile',(req,res)=>{
        const {token}=req.cookies;
         
    });



    app.listen(4000);