import React from 'react';
import {PostAnswer} from './Answer';
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

    updateState() {
        this.setState ({shown: false});
    }

    render() {
        const { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading..</div>;
        } else {
            return (
                <div className="App">
                    <ul>
                        {
                            items.map(e => (
                                <div>                                
                                    <li key={e.id}>Tittel: {e.title} svar: {e.answers.map(i => (<li key={i.id}>{i.text}</li>))}</li>
                                    <PostAnswer Question={e.id}/>
                                </div>
                            ))
                        }
                    </ul>
                    <PostQuestion fetchList={this.fetchData}/>
                </div>
            )
        }
    }
}