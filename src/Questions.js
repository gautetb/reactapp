import React from 'react';
import {PostAnswer} from './Answer';

export class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            shown: true,
            postId: '',
            postTitle: '',
            postDetails: ''
            
        }

        this.postDetails = this.postDetails.bind(this);
        this.changePostTitle = this.changePostTitle.bind(this);
        this.postSubmit = this.postSubmit.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:60655/api/Question").then(res => res.json()).then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }

    postDetails(event) {
        this.setState({ postDetails: event.target.value })
    }

    changePostTitle(event) {
        this.setState({ postTitle: event.target.value })
    }

    postSubmit(event) {
        event.preventDefault();
        this.setState ({shown: false})
        console.log(this.state.shown)
        console.log(this.state.postTitle);
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
        }).then((Response) => Response.json())
            .then((findresponse) => {
                alert(findresponse.result);
            })
        
            
            console.log(this.state.shown);
    }

    render() {
        const { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading..</div>;
        } else {
            return (
                <div>
                                    <div className="App">
                    <ul>
                        {
                            items.map(e => (
                                <div>                                
                                    <li key={e.id}>
                                    Tittel: {e.title} 
                                    <ul>
                                    {e.answers.map(i => (<li key={i.id}>{i.text}</li>))}
                                    </ul>

                                    </li>
                                    <PostAnswer Question={e.id}/>
                                </div>
                            ))
                        }

                    </ul>


                </div>
                    <div className="container">
        <form className="form-horizontal">
            <fieldset>
            <legend>Post Question here: </legend>
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
                    <button type="submit" onClick={this.postSubmit} id="singlebutton" name="singlebutton" className="btn btn-primary">Button</button>
                    </div>
                </div>
            </fieldset>
        </form>
</div>
                </div>      
            )
        }

        
    }
}
