import React from 'react';

export class PostQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: '',
            postTitle: '',
            postDetails: '',
        }

            this.postDetails = this.postDetails.bind(this);
            this.changePostTitle = this.changePostTitle.bind(this);
            this.postSubmit = this.postSubmit.bind(this);
        
    }

    postDetails(event) {
        this.setState({ postDetails: event.target.value })
    }

    changePostTitle(event) {
        this.setState({ postTitle: event.target.value })
    }

    postSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:60655/api/Question', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.postTitle,
                details: this.state.postDetails
            })
        }).then(res => {
            if(res.ok)
                this.props.fetchData();
                console.log('postsubmit');
        }); 
    }

    render() {
        return(
<div className="container">
        <form className="form-horizontal">
            <fieldset>
            <legend>Post Question</legend>
                <div className="form-group">
                    <label className="col-md-4 control-label" >Tittel</label>  
                    <div className="col-md-4">
                    <input value={this.state.postTitle} onChange={this.changePostTitle} id="exampleInput1" name="textinput" type="text" placeholder="placeholder" className="form-control input-md"/>                
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-4 control-label" >Detaljer</label>
                    <div className="col-md-4">                     
                    <textarea type="text" className="form-control" rows="3" onChange={this.postDetails} ></textarea>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-4 control-label" ></label>
                    <div className="col-md-4">
                    <button type="submit"  onClick={this.postSubmit}  className="btn btn-primary">Button</button>
                    </div>
                </div>
            </fieldset>
        </form>
</div>

        )

    }
}