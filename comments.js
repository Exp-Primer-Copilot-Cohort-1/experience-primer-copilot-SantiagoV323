//create web server
// 1. load modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var db = require('./db');
var util = require('./util');
var async = require('async');

// 2. set port
var port = process.env.PORT || 3000;

// 3. set middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// 4. set router
router.route('/comments')
	.get(function(req, res) {
		fs.readFile(__dirname + '/public/data/comments.json', function(err, data) {
			if (err) {
				res.status(500).send(err);
				return;
			}
			var comments = JSON.parse(data);
			res.json(comments);
		});
	})
	.post(function(req, res) {
		fs.readFile(__dirname + '/public/data/comments.json', function(err, data) {
			if (err) {
				res.status(500).send(err);
				return;
			}
			var comments = JSON.parse(data);
			var newComment = {
				id: Date.now(),