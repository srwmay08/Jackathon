var React = require('react');
var Bootstrap = require('react-bootstrap');
var Link = require('react-router').Link 

// REACT COMPONENT THAT DISPLAYS EACH QUESTION AND FORMATS THEM USING BOOTSTRAP
var Question = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="question panel-body">
				<div className="qtext"><h4><Link to={"/comments/" + this.props.data._id}>{this.props.data.text}</Link></h4></div>
                <div className="quser">
                    <strong>{this.props.data.username}&nbsp;</strong>
                    posted this on {this.props.data.date}</div>
				<div className="qID hidden">{this.props.data.qID}</div>
            </div>
        </div>
    }
});

module.exports = Question;
