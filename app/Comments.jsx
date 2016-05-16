var React = require('react');
var Bootstrap = require('react-bootstrap');

var Comments = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="question panel-body">
				<div className="qtext"><h4><a href="/comments">{this.props.data.text}</a></h4></div>
                <div className="quser">
                    <strong>{this.props.data.username}&nbsp;</strong>
                    posted this on {this.props.data.date}</div>
				<div className="qID hidden">{this.props.data.qID}</div>
            </div>
        </div>
    }
});

module.exports = Comments;