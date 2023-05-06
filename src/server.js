const express =require("express")
const bodyparser = require("body-parser")
const path = require("path")
const port = 3000;

const users_collection1 =require('./userdatabase/userdata')
require('./userdatabase/mongoose_connection')

const app = express()


app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(express.json())

let mainfolder = path.join(__dirname,"../");
app.use(express.static(mainfolder))

app.get('/', (req,res)=>{
    res.send('home page')
})

app.get('/register', (rew,res)=>{
    res.sendFile(mainfolder+"/register.html")
})

app.get('/login', (rew,res)=>{
    console.log(mainfolder+"login.html")
    res.sendFile(mainfolder+"login.html")
})


app.post("/register",(req,res)=>{
    // console.log(req.body);
    let req_userdata = new users_collection1(req.body);
    console.log(req_userdata.password);
    console.log(req_userdata.confirm_password);
    if(req_userdata.password == req_userdata.confirm_password){
        req_userdata.save();
        res.redirect('/register_success.html')
    }else{
        res.redirect('/failed.html')
    }
    console.log(req_userdata);
    // console.log(req.body.password);
    // mongodb://localhost:27017/
})



app.post('/login',async(req,res)=>{
    let newusername = req.body.username;
    let userpassword = req.body.password;
    // console.log(newusername);
    // console.log(userpassword);


    let req_userdata =await users_collection1.findOne({username:newusername})
    if(req_userdata!= null){
        let req_newuserdata =await users_collection1.findOne({password:userpassword})
        if(req_newuserdata != null){
            res.redirect('/login_success.html')
        }else{
            res.redirect('/failed.html')
        }
    }else{
        res.redirect('/failed.html')
    }
    res.end();
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})