require('dotenv').config();

const express=require('express');
const connectDB=require('./server/config/db')
const port=5000||process.env.port;
const app=express();
const expressLayout= require('express-ejs-layouts');
const methodOverride=require('method-override');
const cookieParser=require("cookie-parser");
const session=require('express-session');
const MongoStore=require("connect-mongo");

connectDB();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static("public"));

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:"mongodb://localhost:27017/blog"
    })
}))


app.use(expressLayout);
app.set('layout', 'layouts/main')
app.set('view engine','ejs')

app.use("/",require('./server/routes/main'))
app.use("/",require('./server/routes/admin'))

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})
