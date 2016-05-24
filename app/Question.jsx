var React = require('react');
var Bootstrap = require('react-bootstrap');
var Link = require('react-router').Link 

//* ^ Like before - using require being pages from elsewhere so this one "knows" about entities elsewhere.

// Creating a class uses elements from other pages to merge into the functionality defined on this page. Here we are creating the ability to type a question and giving it an id so we can later tie comments in. 
var Question = React.createClass({
    render: function() {
        return <div className="panel panel-default">
            <div className="question panel-body">
				<div className="qtext"><h4><Link to={"/comments/" + this.props.data._id}>{this.props.data.text}</Link></h4></div> //* the Link above creates a link between the question asked and the comments associated
                <div className="quser">
                    <strong>{this.props.data.username}&nbsp;</strong> //* here we show the username associated with the question.
                    posted this on {this.props.data.date}</div> //* Displays the date question posted
				<div className="qID hidden">{this.props.data.qID}</div> //* Displays the unique ID for question
            </div>
        </div>
    }
});

module.exports = Question; //* here we export the Question functionality for use elsewhere
