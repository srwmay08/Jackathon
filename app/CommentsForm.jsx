var React = require('react');
var Bootstrap = require('react-bootstrap');

var CommentsForm = React.createClass({
    submit: function(evt) {
        evt.preventDefault();
        var newComment = $('#msg').val();
        var that = this;
        $.post('/Comments', {
            newComment: newComment
        }, function(response) {
            if (response == "success") {
                that.props.getComments();
                $('#msg').val('');
            }
        }, 'text');
    },
    render: function() {
        return (
            <div className="row">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <div className="col-sm-5 col-sm-offset-2">
                            <input type="text" name="msg" id="msg" className="form-control"></input>
                        </div>
                        <div className="col-sm-3">
                            <input type="submit" value="Post Comments" className="btn btn-default"></input>
                        </div>
                    </div>
                </form>
            </div>
					
        );
    }
});

module.exports =  CommentsForm;
