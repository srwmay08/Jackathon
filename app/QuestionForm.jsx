var React = require('react');
var Bootstrap = require('react-bootstrap');

var QuestionForm = React.createClass({
    submit: function(evt) {
        evt.preventDefault(); //* Here we make sure that even if the event fails, the page continues to load
        var newQuestion = $('#msg').val(); //* The entire following section ensures that a new question can be created and pushed through without needing to be in real time.
        var that = this;
        $.post('/Questions', {
            newQuestion: newQuestion
        }, function(response) {
            if (response == "success") { //* Here getQuestions pulls all the questions previously asked as well as the new question. getQuestions(); was defined in our Question App 
                that.props.getQuestions();
                $('#msg').val('');
            }
        }, 'text');
    },
    render: function() { //* Below is the bootstrap to create the question form. 
        return (
            <div className="row">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <div className="col-sm-5 col-sm-offset-2">
                            <input type="text" name="msg" id="msg" className="form-control"></input>
                        </div>
                        <div className="col-sm-3">
                            <input type="submit" value="Post Question" className="btn btn-default"></input>
                        </div>
                    </div>
                </form>
            </div>
					
        );
    }
});

module.exports = QuestionForm;
