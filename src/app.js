import React from 'react';
import { QuestionList } from './QuestionList';
import { Navbar} from './Navbar';


export class App extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <QuestionList/>
            </div>
        );
    }
}