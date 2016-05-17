;
(function () {
	"use strict";

	var PORT = 3000;

	var fs = require('fs');

	// NODE USES EXPRESS, EXPRESS SESSION, BODYPARSER, COOKIEPARSER, AND MONGOOSE
	
	var express = require('express');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var expressSession = require('express-session');
	var uuid = require('node-uuid');
	var mongoose = require('mongoose');

	// MONGOOSE SCHEMA FOR QUESTIONS AND COMMENTS
	var Comment = require('./Comment.js')
	var Question = require('./Question.js');

	// CONFIG WITH SECRET AND PORT
	var config = require('./config.js');

	var app = express();

	// COOL MIDDLEWARE STUFFS
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
	
	// OUR ROOT GET, REUTNRS THE INDEX.HTML PAGE AND BASE LAYOUT FOR REACT
	app.get("/", function (req, res) {
		if (!req.session.username) {
			res.redirect("/login");
			return;
		}

		res.sendFile(__dirname + "/public/index.html");
	});
	
	// GET AND POST QUESTIONS
	// GET CHECKS TO SEE IF THERE IS AN ACTIVE SESSION USERNAME
	app.get("/Questions", function (req, res) {
		if (!req.session.username) {
			res.send("[]");
			return;
		}
		// IF THERE IS AN ACTIVE SESSION, FINDS ALL ACTIVE QUESTIONS AND SENDS JSON DATA TO THE FRONTEND
		Question.find({}, "text username date", function (err, data) {
			if (err) {
				res.send("[]");
				return;
			}
			res.send(JSON.stringify(data));
		});
	});
	// POST CHECKS TO SEE IF THERE IS AN ACTIVE SESSION USERNAME
	app.post("/Questions", function (req, res) {
		if (!req.session.username) {
			res.send("error");
			return;
		}
		// CHECKS TO SEE IF THERE IS A VALUE IN THE NEWQUESTION BOX
		if (!req.body.newQuestion) {
			res.send("error");
			return;
		}
		// DATABASE CONSTRUCTOR THAT PASSES IN THE TEXT FIELD, SESSION USERNAME, AND THE CURRENT TIME
		var question = new Question({
			text: req.body.newQuestion,
			username: req.session.username,
			qID: uuid.v4(),
			date: new Date(),
			comments: []
		});
		// SAVES THE NEW CONSTRUCTOR TO THE DATABASE
		question.save(function (err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send("success");
		});
	});
	

	// GET QUESTION WHEN SELECTED AND QUESTION'S COMMENTS GET AND POST
	// GET TAKES THE USER TO A NEW COMMENTS PAGE WHERE USER CAN REPLY TO QUESTIONS.
	// GET REQUIRES SESSION USERNAME
	app.get("/comments", function (req, res) {
		if (!req.session.username) {
			res.send("[targetquestionerror]");
			return;
		}
		// GET FINDS THE ONE QUESTION SELECTED AND POPULATES THAT INFORMATION AT THE TOP OF THE COMMENTS PAGE
		Question.findOne({_id: req.query.question}, "text username date", function (err, data) {
			if (err) {
				res.send("[targetquestionfinderror]");
				return;
			}
			console.log(data);
			console.log(typeof(data));
			res.send(JSON.stringify(data));
		});
	});
	
	//GET COMMENTS AND POST COMMENTS
	//CHECKS TO MAKE SURE THERE IS A SESSION USERNAME
	app.get("/qcomments", function (req, res) {
		if (!req.session.username) {
			res.send("[targetquestionerror]");
			return;
		}
		//SEARCHES COMMMENT DATABASE FOR THE SELECTED QUESTION ID AND RETURNS ALL VALUES MATCHING
		Comment.find({qID: req.query.qID}, "text qID username date", function (err, data) {
			if (err) {
				res.send("[targetquestionfinderror]");
				return;
			}
			res.send(JSON.stringify(data));
		});
	});
	//POSTS NEW COMMENTS TO A SPECIFIC QUESTION PAGE, USING THE QID AS THE QUESTION IDENTIFIER FOR FUTURE SEARCHES
	app.post("/qcomments", function (req, res) {
		if (!req.session.username) {
			res.send("session error");
			return;
		}
		//REQUIRES THERE TO BE A VALUE IN THE TEXT FIELD PRIOR TO SUBMISSION
		if (!req.body.newComment) {
			res.send("comment error");
			return;
		}
		// DATABASE CONSTRUCTOR THAT PASSES IN THE QUESTION ID, TEXT FIELD, SESSION USERNAME, AND THE CURRENT TIME
		var comment = new Comment({
			text: req.body.newComment,
			username: req.session.username,
			qID: req.body.qID, 
			date: new Date(),
		});
		console.log(comment);
		//STORES DATA THE THE COMMENT ENTITY IN THE DATABASE
		comment.save(function (err) {
			if (err) {
				res.send("save error");
				return;
			}
			res.send("success");
		});
	});
	
	// GET AND POST USER LOGIN

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
	// WHEN LOGGING IN, CHECKS THE DATABASE FOR MATCHING USERNAME AND PASSWORD, SETS SESSION TO CURRENT USERNAME
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
	// MONGOOSE MODEL TO STORE USERNAME AND PASSWORD
	var User = mongoose.model("User", {
		username: String,
		password: String
	});
	// CREATES A NEW USER FUNCTION
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

	//ADD NEW USER GET AND POST 
	app.get('/create', function (req, res) {
		res.sendFile(__dirname + '/public/create.html');
	});
	// VALIDATES USERNAME AND PASSWORD WHEN CREATING A NEW USER, THEN REDIRECTS TO LOGIN IF CREATION WAS SUCCESFUL
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
	// EXPRESS PUBLIC FOLDER SERVER
	app.use(express.static('public'));

	// 404 ERRORS AND SUCH
	app.use(function (req, res, next) {
		res.status(404);
		res.send("File not found");
	});
	// APP LISTENER TO SET THE PORT AND LOGS THE START OF THE SERVER
	app.listen(PORT, function () {
		console.log("server started on port " + PORT);
	});

}());