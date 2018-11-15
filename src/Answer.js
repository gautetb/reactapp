import React from 'react';

export class PostAnswer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
            postId: this.props.Question.id,
            postTitle: '',
            postDetails: '',
            postAnswers: ''
        }

            this.postDetails = this.postDetails.bind(this);
            this.postSubmit = this.postSubmit.bind(this);
        
    }

    postDetails(event) {
        this.setState({ postDetails: event.target.value })
    }

    postSubmit(event) {
        event.preventDefault();
        console.log(this.state.postTitle);
        fetch('http://localhost:60655/api/Answer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : this.state.postId,
                answers : this.state.postDetails

            })
        }).then((Response) => Response.JSON())
            .then((findresponse) => {
                alert(findresponse.result);
            })

    }

    render() {
        return(
<div className="container">
        <form className="form-horizontal">
            <fieldset>
            <legend>Post Answer</legend>
                <div className="form-group">
                    <label className="col-md-4 control-label" >Detaljer</label>
                    <div className="col-md-4">                     
                    <textarea type="text" className="form-control" rows="3" onChange={this.postDetails} ></textarea>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-4 control-label" ></label>
                    <div className="col-md-4">
                    <button type="submit" onClick={this.postSubmit} id="singlebutton" name="singlebutton" className="btn btn-primary">Button</button>
                    </div>
                </div>
                
            </fieldset>
        </form>
</div>

        )

    }
}