var React = require('react');
var Bootstrap =  require('react-bootstrap');
var ReactDom = require('react-dom');
var QuestionApp = require('./QuestionApp.jsx');

ReactDom.render(
	<Router>
    	<Route path="/" component={QuestionApp} />
		<Route path="/comments" component={Comments} />
  	</Router>, 
	
	document.getElementById('app'));
