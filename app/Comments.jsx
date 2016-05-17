var React = require('react');
var Bootstrap = require('react-bootstrap');

// RENDERS THE INDIVIDUAL COMMENTS THAT HAVE BEEN POSTED TO EACH QUESTION PAGE
var Comments = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="question panel-body">
				<div className="qtext"><h4>{this.props.data.text}</h4></div>
                <div className="quser">
                    <strong>{this.props.data.username}&nbsp;</strong>
                    posted this on {this.props.data.date}</div>
				<div className="qID hidden">{this.props.data.qID}</div>
            </div>
        </div>
    }
});

module.exports = Comments;
