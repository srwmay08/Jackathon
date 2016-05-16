var React = require('react');
var Bootstrap = require('react-bootstrap');

var Comments = React.createClass({
    render: function() {
        return <div className="panel panel-default">
				<div className="qtext">{this.props.data.text}</div>
    	           
    		    </div>
    }
});

module.exports = Comments;
