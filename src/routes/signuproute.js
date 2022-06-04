const express = require('express'); 
const signupRouter = express.Router();
const user = require('../data/user');

signupRouter.get('/',function(req,res){

    res.render('signup',{});
    
})

signupRouter.get("/adduser",function(req,res){
    
    var newuser = {
        "uid":req.query.uid, //Part #2 point 10
        "pwd":req.query.pwd  //
    };
    console.log(newuser);
    user.push(newuser);
    console.log(user);
    res.redirect("/login");
})

module.exports = signupRouter;