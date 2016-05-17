var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comments = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');
var Question = require('./Question.jsx');

var CommentsApp = React.createClass({
	render: function() {
		var question = this.state.getQuestion;
		var q = null;
		if(question) {
			q = <Question data={question} />
		}
		return (
		<div>
			{q}
			{this.props.params.id}
			<CommentsForm getComments={this.getComments}/>
		</div>);
	},
	getInitialState: function(){
		var stateObj = {
			Comments: [],
			getQuestion: null
		};
		return stateObj;
	},
	getQuestion: function() {
		var that = this;
		$.get('/comments', {question: this.props.params.id}, function(result) {
			console.log(result);
			that.setState({
				getQuestion: result
			});
		}, 'json');
	},
	componentDidMount: function() {
		this.getQuestion();
	}
});

module.exports = CommentsApp;