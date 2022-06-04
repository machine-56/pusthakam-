// "main": app.js Part #1 point 1
const express = require('express'); 
const path = require ('path'); 
const bodyParser = require('body-parser'); //Part #1 point 2
const cors = require('cors');





const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter'); //Part #1 point 3
const booksRouter = require('./src/routes/booksroute');
const authorsRouter = require('./src/routes/authorsroute');

const app = new express; 


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(cors()); //Part #2 point 7
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{});
    
});



// const port = process.env.port || 8191;

app.listen(process.env.port || 8191,()=>{
    console.log(`Server Ready on 8191`); //Part #1 point 5
});