var React = require('react');
var Bootstrap =  require('react-bootstrap');

var QuestionForm = React.createClass({
	submit: function(evt) {
		evt.preventDefault();
		var newQuestion = $('#msg').val();
		var that = this;
		$.post('/Questions',
			{newQuestion: newQuestion},
			function(response) {
				if (response == "success") {
					that.props.getQuestions();
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
				<input type="submit" value="Post Question" className="btn btn-default"></input>
			</form>
		);
	}
});

module.exports = QuestionForm;
