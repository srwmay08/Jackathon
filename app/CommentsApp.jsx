var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comment = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');

var CommentsApp = React.createClass({
	render: function() {
		var Comments = this.state.Comments;
		var CommentsHTML = [];
		for(var i = 0; i < Comments.length; i++){
			CommentsHTML.push(<Comments key={i} data={Comments[i]} />).reverse;
		}
		CommentsHTML.reverse();
		return (
		<div>
			{this.props.params.id}
			<CommentsForm getComments={this.getComments}/>
			{CommentsHTML}
		</div>);
	},
	getInitialState: function(){
		var stateObj = {
			Comments: []
		};
		return stateObj;
	},
	getQuestion: function() {
		var that = this;
		$.get('/comments', function(result) {
			that.setState({
				getQuestion: result
			});
		}, 'json');
	},
	getComments: function() {
		var that = this;
		$.get('/targetcomments', function(result) {
			that.setState({
				Comments: result
			});
		}, 'json');
	},
	componentDidMount: function() {
		this.getQuestion();
		this.getComments();
	}
});

module.exports = CommentsApp;