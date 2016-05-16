;
(function () {
	"use strict";

	var PORT = 3000;

	var fs = require('fs');

	var express = require('express');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');
	var uuid = require('node-uuid');
	var mongoose = require('mongoose');
	var Router = require('react-router').Router
	var Route = require('react-router').Route
	var Link = require('react-router').Link

	var Comment = require('./Comment.js')
	var Question = require('./Question.js');

	var config = require('./config.js');

	var app = express();


	mongoose.connect('mongodb://localhost');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(expressSession({
		secret: config.secret,
		resave: true,
		saveUninitialized: true
	}));

	app.get("/", function (req, res) {
		if (!req.session.username) {
			res.redirect("/login");
			return;
		}

		res.sendFile(__dirname + "/public/index.html");
	});

	app.get("/Questions", function (req, res) {
		if (!req.session.username) {
			res.send("[]");
			return;
		}
		Question.find({}, "text username date", function (err, data) {
			if (err) {
				res.send("[]");
				return;
			}
			res.send(JSON.stringify(data));
		});
	});

	// QUESTION AND QUESTION'S COMMENTS GET

	app.get("/comments", function (req, res) {
		if (!req.session.username) {
			res.send("[targetquestionerror]");
			return;
		}
		Question.findOne({_id: req.query.question}, "text username date", function (err, data) {
			if (err) {
				res.send("[targetquestionfinderror]");
				return;
			}
			console.log(data);
			console.log(typeof (data));
			res.send(JSON.stringify(data.text));
		});
	});

//	app.get("/targetquestion", function (req, res) {
//		
//	});
//	
//	app.get("/targetcomments", function (req, res) {
//		if (!req.session.username) {
//			res.send("[targetcommentserror]");
//			return;
//		}
//		Comment.find({}, "text username date", function (err, data) {
//			if (err) {
//				res.send("[targetcommentfinderror]");
//				return;
//			}
//			res.send(JSON.stringify(data));
//		});
//	});


	app.post("/Questions", function (req, res) {
		if (!req.session.username) {
			res.send("error");
			return;
		}

		if (!req.body.newQuestion) {
			res.send("error");
			return;
		}
		var question = new Question({
			text: req.body.newQuestion,
			username: req.session.username,
			date: new Date()
		});
		question.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send("success");
		});
	});

	//	function QuestionElement(username, Question){
	//		this.username = username;
	//		this.Question = Question
	//	}



	app.get("/login", function (req, res) {
		res.sendFile(__dirname + '/public/login.html');
		//		loader.load("users.txt", users);
	});

	function logInUser(user, pass, callback) {
		console.log("logInUser CALLED");
		User.find({
			username: user,
			password: pass
		}, "username", callback);
	}

	app.post("/login", function (req, res) {
		if (req.body.username && req.body.password) {
			logInUser(
				req.body.username,
				req.body.password,
				function (err, data) {
					if (err) {
						console.log("THERE WAS AN ERROR WITH YOUR USER");
						res.redirect("/login");
						return;
					}
					req.session.username = req.body.username;
					res.redirect("/");
					return;
				}
			);
		}
	});

	var User = mongoose.model("User", {
		username: String,
		password: String
	});

	function createNewUser(user, pass) {
		var user = new User({
			username: user,
			password: pass
		});
		user.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
		});

	}
	//ADD NEW USER
	app.get('/create', function (req, res) {
		res.sendFile(__dirname + '/public/create.html');
	});

	app.post('/create', function (req, res) {
		if (req.body.username && req.body.password && req.body.pwconfirm) {
			if (req.body.password == req.body.pwconfirm) {
				createNewUser(req.body.username, req.body.password);
				res.redirect("/login");
				return;
			} else {
				res.send("Passwords don't match");
			}
		}
	});

	app.get('/commment', function (req, res) {

	});

	app.use(express.static('public'));

	app.use(function (req, res, next) {
		res.status(404);
		res.send("File not found");
	});

	app.listen(PORT, function () {
		console.log("server started on port " + PORT);
	});

}());