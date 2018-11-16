import React from 'react';
import { PostAnswer } from './Answer';
import { PostQuestion } from './PostQuestion';

export class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            shown: true
        }

        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        console.log('fetchData called');
        fetch("http://localhost:60655/api/Question").then(res => res.json()).then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }

    render() {
        const { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading..</div>;
        } else {
            return (
                

<div id="accordion">
<PostQuestion fetchData={this.fetchData}/>
{items.map(e => (
                               
<div className="card">
    <div className="card-header" id="headingOne">
      <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target={'#collapse'+1+e.id} aria-expanded="true" aria-controls={'collapse'+1+e.id}>
        {e.title}
        </button>
      </h5>
    </div>

    <div id={'collapse'+1+e.id} className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body">
      {e.answers.map(i => (<li key={i.id}>{i.text}</li>))}
        </div>
        <PostAnswer Question={e.id}/>
    </div>
  </div>

))}

</div>
            )
        }
    }
}