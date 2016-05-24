var React = require('react');
var Bootstrap =  require('react-bootstrap');
var ReactDom = require('react-dom');
var QuestionApp = require('./QuestionApp.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var CommentsApp = require ('./CommentsApp.jsx');
//* ^ the above variables tie the pages being routed to the router by pulling them in using "require"

//* Here we tell the DOM what to render on which paths and where to pull their components from. i.e the Node for comments and for questions

ReactDom.render((
	<Router>
    	<Route path="/" component={QuestionApp} />
		<Route path="/comments/:id" component={CommentsApp} /> //* we chose to tie in the :id so that the comment would be tied to the question it's associate with
  	</Router>), document.getElementById('app'));
