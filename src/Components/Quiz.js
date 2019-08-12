import React from "react";

import Question from './Question';
import '../quiz.css';

class Quiz extends React.Component {
    state = {
        error: null,
        quiz: [],
        isLoaded: false,
        isComplete: false,
        score: -1
    }
    componentDidMount() {
        fetch("https://c1397b42.ngrok.io/getQuiz")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    quiz: data,
                    isLoaded: true
                })
            })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const answers = this.state.quiz.map(question => {
            const answer = event.target["ques" + question.id].value;
            return {
                id: question.id,
                answer
            }
        })
        fetch('https://c1397b42.ngrok.io/submitQuiz', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(answers)
        })
            .then(res => res.json())
            .then(score => {
                this.setState({
                    isComplete: true,
                    score
                })
            })
    }
    render() {
        return (
            <div id='quiz'>
                <div className='heading'>
                    <h1>
                        Quiz&nbsp;&nbsp;
                        <i className="fas fa-angle-double-down"></i>
                    </h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.quiz.map((question) => <Question key={question.id} {...question} />)
                    }
                    <input type="submit" value='Submit Quiz' />
                </form>
                <div className='results'>
                    {this.state.isComplete &&
                        <div id='scores'>Your score is : {this.state.score}!</div>
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;