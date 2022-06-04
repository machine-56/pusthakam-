const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');
const nav = require('../data/nav');


//router to render books page
booksRouter.get('/',function(req,res){

    bookdata.find() 
    .then(function (books) {

    res.render('books',{
        books, nav
    });

    })
})



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{nav});

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    })



//router for singlebook
booksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    book, nav
                })

            })
    
});




//router to delete book
booksRouter.post('/delete', (req, res) => {
        bookdata.deleteOne({ _id: req.body.id }) //Part #2 point 9
            .then(() => {

                    res.redirect('/books');

                }).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
    })



//router to edit book
booksRouter.post('/edit', function (req, res) {

    bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {data,nav})
        }
    })
})



//router to update book
booksRouter.post('/update', (req, res) => {
        bookdata.updateOne({_id: req.body.id}, { $set: req.body }, (err, data) => { //Part #2 point 9
                if (err) {
                    res.json({ status: "Failed" });
                }
                else if (data.n == 0) {
                    res.json({ status: "No match Found" });
                }
                else {
                    res.redirect("/books");
                }

            });
    })







module.exports = booksRouter;