var React = require('react');
var Bootstrap =  require('react-bootstrap');
var ReactDom = require('react-dom');
var QuestionApp = require('./QuestionApp.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Comments = require ('./CommentsApp.jsx');

ReactDom.render((
	<Router>
    	<Route path="/" component={QuestionApp} />
		<Route path="/comments" component={Comments} />
  	</Router>), document.getElementById('app'));
