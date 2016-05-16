var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comments = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');
var Question = require('./Question.jsx');

var CommentsApp = React.createClass({
	render: function() {
		var Comments = this.state.Comments;
		var question = this.state.getQuestion;
		var q = null;
		if(question) {
			q = <Question data={question} />
		}
		var CommentsHTML = [];
		for(var i = 0; i < Comments.length; i++){
			CommentsHTML.push(<Comments key={i} data={Comments[i]} />).reverse;
		}
		CommentsHTML.reverse();
		return (
		<div>
			{q}
			{this.props.params.id}
			<CommentsForm getComments={this.getComments}/>
			{CommentsHTML}
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