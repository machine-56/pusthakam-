const express = require('express'); 
const homeRouter = express.Router();
const nav = require('../data/nav');

homeRouter.get('/',function(req,res){

    res.render('home',{nav});
    
})







module.exports = homeRouter;