var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comments = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');
var Question = require('./Question.jsx');

var CommentsApp = React.createClass({
	render: function() {
		var question = this.state.getQuestion;
		var qcomment = this.state.getComments;
		console.log(qcomment);
		var q = null;
		var qc = null;
		var CommentHTML = [];
		if(question) {
			q = <Question data={question} />
		}
		for(var i = 0; i < qcomment.length; i++){
			CommentHTML.push(<Comments key={i} data={qcomment[i]} />);
		}
		CommentHTML.reverse();
		return (
		<div>
			{q}
			{this.props.params.id}
			<CommentsForm qID={this.props.params.id} getComments={this.getComments}/>
			{CommentHTML}
		</div>);
	},
	getInitialState: function(){
		var stateObj = {
			getComments: [],
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
	getComments: function() {
		var that = this;
		$.get('/qcomments', {qID: this.props.params.id}, function(result) {
			console.log(result);
			that.setState({
				getComments: result
			});
		}, 'json');
	},
	componentDidMount: function() {
		this.getQuestion();
		this.getComments();
	}
});

module.exports = CommentsApp;