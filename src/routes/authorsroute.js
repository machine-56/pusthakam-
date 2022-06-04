const express = require('express'); 
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordata = require('../model/AuthorModel');
const nav = require('../data/nav');


//router to render authors page
authorsRouter.get('/',function(req,res){

    authordata.find() 
    .then(function (authors) {

    res.render('authors',{
        authors,nav
    });

    })
})



//router to render add author page
authorsRouter.get('/addauthor',function(req,res){
    res.render('addauthor',{nav});

});




//router to add author
authorsRouter.post('/add', function (req, res) {

    var item={
        title:req.body.title,
        image:req.body.images, //on ejs page Part #2 point 8
        about:req.body.about
    }
    console.log(item)  ;
    const author = new authordata(item);
    author.save();
    res.redirect('/authors');

})




//router for single author
authorsRouter.get('/:id',function(req,res){
    const id = req.params.id;
    authordata.findOne({ _id: id })
            .then(function (author) {
                res.render('author', {
                    author, nav
                })

            })
    
});




//router to delete author
authorsRouter.post('/delete', (req, res) => {
        authordata.deleteOne({ _id: req.body.id }) //Part #2 point 9
            .then(() => {

                    res.redirect('/authors');

                }).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
    })



//router to edit author
authorsRouter.post('/edit', function (req, res) {

    authordata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editauthor', {data,nav})
        }
    })
})




//router to update author
authorsRouter.post('/update', (req, res) => {

        authordata.updateOne({_id: req.body.id}, { $set: req.body }, (err, data) => { //Part #2 point 9
                if (err) {
                    res.json({ status: "Failed" });
                }
                else if (data.n == 0) {
                    res.json({ status: "No match Found" });
                }
                else {
                    res.redirect("/authors");
                }

            });
    })






module.exports = authorsRouter;