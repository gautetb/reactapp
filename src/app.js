import React from 'react';
import { QuestionList } from './QuestionList';


export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <QuestionList/>
            </div>
        );
    }
}