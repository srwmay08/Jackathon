var React = require("react");
var Bootstrap =  require('react-bootstrap');
var Comment = require("./Comments.jsx");
var CommentsForm = require('./CommentsForm.jsx');

var CommentsApp = React.createClass({
	render: function() {
		var Comments = this.state.Questions;
		var CommentsHTML = [];
		for(var i = 0; i < Questions.length; i++){
			CommentsHTML.push(<Comments key={i} data={Comments[i]} />).reverse;
		}
		QuestionHTML.reverse();
		return (<div>
			<CommentsFrom getComments={this.getComments}/>
			{CommentsHTML}
		</div>);
	},
	getInitialState: function(){
		var stateObj = {
			Comments: []
		};
		return stateObj;
	},
	getComments: function() {
		var that = this;
		$.get('/Comments', function(result) {
			that.setState({
				Comments: result
			});
		}, 'json');
	},
	componentDidMount: function() {
		this.getComments();
	}
});

module.exports = CommentsApp;