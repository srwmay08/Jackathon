var React = require('react');
var Bootstrap = require('react-bootstrap');

var Comment = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="comment panel-body">
                <div className="ctext"><h4>{this.props.data.text}</h4></div>
                <div className="cuser">
                    <strong>{this.props.data.username}&nbsp;</strong>
                    posted this on {this.props.data.date}</div>
									<div className="qID hidden">{this.props.data.qID}</div>
            </div>
        </div>
    }
});

module.exports = Comment;
