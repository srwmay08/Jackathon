svar React = require('react');
var Bootstrap =  require('react-bootstrap');

var CommentForm = React.createClass({
	submit: function(evt) {
		evt.preventDefault();
		var newComment = $('#msg').val();
		var that = this;
		$.post('/Comment',
			{newComment: newComment},
			function(response) {
				if (response == "success") {
					that.props.getComment();
					$('#msg').val('');
				}
			},
			'text'
		);
	},
	render: function() {
		return (
			<form onSubmit={this.submit}>
				<input type="text" name="msg" id="msg"></input>
				<input type="submit" value="Post Comment" className="btn btn-default"></input>
			</form>
		);
	}
});

module.exports = CommentForm;
