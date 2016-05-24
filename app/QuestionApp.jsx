var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Question = require("./Question.jsx");
var QuestionForm = require('./QuestionForm.jsx');

var QuestionApp = React.createClass({
	render: function() {
		var Questions = this.state.Questions; //* {I'M NOT SURE WHAT THIS DOES]
		var QuestionHTML = []; //* Here our questions are stored in an array
		for(var i = 0; i < Questions.length; i++){
			QuestionHTML.push(<Question key={i} data={Questions[i]} />).reverse; //* We take the questions entered on our page and reverse them so the newest ones show up first in the array, then push them onto the Questions HTML Array for reference later. 
		}
		QuestionHTML.reverse(); //* Here is our function for actually reversing the questions on our page. 
		return (<div>
			<QuestionForm getQuestions={this.getQuestions}/> //* this is where we get the questions to reverse, from the question form
			{QuestionHTML}
		</div>);
	},
	getInitialState: function(){
		var stateObj = {
			Questions: [] //* here is the empty questions array at the onset of the app running. Essentially, at start we have nothing in the array. {I DON'T REMEMBER WHY WE NEED AN EMPTY ARRAY]
		};
		return stateObj;
	},
	getQuestions: function() {
		var that = this;
		$.get('/Questions', function(result) { //* here the questions are displayed to the user on the page using "Get"
			that.setState({
				Questions: result
			});
		}, 'json');
	},
	componentDidMount: function() {
		this.getQuestions();
	}
});

module.exports = QuestionApp; 
