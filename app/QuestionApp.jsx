var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Question = require("./Question.jsx");
var QuestionForm = require('./QuestionForm.jsx');


// REACT QUESTION COMPONENT - HANDLES THE CREATION OF QUESTIONS AND RENDERING THEM TO THE PAGE
var QuestionApp = React.createClass({
	render: function() {
		var Questions = this.state.Questions;
		var QuestionHTML = [];
		// FOR LOOP TO CONVERT AND DISPLAY ALL QUESTIONS RETURNED IN JSON STRING TO HTML
		for(var i = 0; i < Questions.length; i++){
			QuestionHTML.push(<Question key={i} data={Questions[i]} />).reverse;
		}
		QuestionHTML.reverse();
		// RENDERS THE QUESTION FORM AND ALL PREVIOUSLY SUBMITTED QUESTIONS 
		return (<div>
			<QuestionForm getQuestions={this.getQuestions}/>
			{QuestionHTML}
		</div>);
	},
	
	// SETS THE STATE OF QUESTIONS TO AN EMPTY ARRAY
	getInitialState: function(){
		var stateObj = {
			Questions: []
		};
		return stateObj;
	},
	
	// JQUERY TO GET ALL QUESTIONS WHEN THE PAGE LOADS AND WHEN getQUESTIONS IS CALLED
	getQuestions: function() {
		var that = this;
		// JQUERY TO GET /QUESTIONS AND UPDATE THE STATE QUESTIONS WITH ALL RESULTS
		$.get('/Questions', function(result) {
			that.setState({
				Questions: result
			});
		}, 'json');
	},
	
	// WHEN THE PAGE MOUNTS, TELLS REACT TO GETQUESTIONS
	componentDidMount: function() {
		this.getQuestions();
	}
});

module.exports = QuestionApp;
