var React = require('react');

var Question = React.createClass({
	render: function(){
		return <div class="question">
					<div class="qtext">{this.props.data.text}</div>
					<div class="quser"><strong>{this.props.data.username}</strong> posted this on {this.props.data.date}</div>
					<div class="qID">{this.props.data.qID}</div>
					</div>
	}
});

module.exports = Question;
