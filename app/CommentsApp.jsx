var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comments = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');
var Question = require('./Question.jsx');

//REACT COMPONENT THAT RENDERS THE SELECTED QUESTION, AND DISPLAYS ANY ASSOCIATED COMMENTS ON THAT QUESTION
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
		// LOOPS THROUGH ALL COMMENTS WITH A MATCHING QID AND CONVERTS THEM TO HTML
		for(var i = 0; i < qcomment.length; i++){
			CommentHTML.push(<Comments key={i} data={qcomment[i]} />);
		}
		CommentHTML.reverse();
		// THIS DISPLAYS A SELECTED QUESTION AND THE QID PLUS THE COMMENT FORM AND ALL COMMENTS RELATED TO THAT QID
		return (
		<div>
			{q}
			{this.props.params.id}
			<CommentsForm qID={this.props.params.id} getComments={this.getComments}/>
			{CommentHTML}
		</div>);
	},
	
	// SET INITIAL STATE OF QUESTION AND ANY COMMENTS
	getInitialState: function(){
		var stateObj = {
			getComments: [],
			getQuestion: null
		};
		return stateObj;
	},
	// GETS THE QUESTION WHEN THE PAGE LOADS, USING A PARAMETER PASSED INTO THE URL AND DOWN INTO THE PAGE
	getQuestion: function() {
		var that = this;
		$.get('/comments', {question: this.props.params.id}, function(result) {
			console.log(result);
			that.setState({
				getQuestion: result
			});
		}, 'json');
	},
	
	//GETS ALL COMMENTS IF ANY, WHEN THE PAGE LOADS, USING THE SAME QUESTION PARAMETER PASSED INTO THE URL AND DOWN INTO THE PAGE
	getComments: function() {
		var that = this;
		$.get('/qcomments', {qID: this.props.params.id}, function(result) {
			console.log(result);
			that.setState({
				getComments: result
			});
		}, 'json');
	},
	
	// WHEN THE PAGE MOUNTS, GETS QUESTION AND COMMENTS
	componentDidMount: function() {
		this.getQuestion();
		this.getComments();
	}
});

module.exports = CommentsApp;
