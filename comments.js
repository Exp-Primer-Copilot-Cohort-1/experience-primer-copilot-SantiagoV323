//create web server
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//create connection with mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CommentsDB');
mongoose.Promise = global.Promise;
//create schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    name: String,
    email: String,
    comment: String,
    date: String
});
//create model
var Comment = mongoose.model('Comment', commentSchema);
//get all comments from database
router.get('/all', function(req, res) {
    Comment.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});
//add new comment to database
router.post('/new', urlencodedParser, function(req, res) {
    var newComment = Comment(req.body).save(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});
//delete comment from database
router.post('/delete', urlencodedParser, function(req, res) {
    Comment.find({ _id: req.body.id }).remove(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});
//export module
module.exports = router;