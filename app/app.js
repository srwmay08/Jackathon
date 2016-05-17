var React = require('react');
var Bootstrap =  require('react-bootstrap');
var ReactDom = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var QuestionApp = require('./QuestionApp.jsx');
var CommentsApp = require ('./CommentsApp.jsx');

// APP FRONT END REQUIRES REACT, BOOTSTRAP, REACT-ROUTER,  

ReactDom.render((
	<Router>
    	<Route path="/" component={QuestionApp} />
		<Route path="/comments/:id" component={CommentsApp} />
  	</Router>), document.getElementById('app'));
