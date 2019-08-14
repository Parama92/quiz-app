import React from "react";

import Question from './Question';
import '../quiz.css';

class Quiz extends React.Component {
    state = {
        error: null,
        quiz: [],
        isLoaded: false,
        isComplete: false,
        overlay: "overlay",
        score: -1
    }
    componentDidMount() {
        fetch("https://got-quiz-api.herokuapp.com/getQuiz")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    quiz: data,
                    isLoaded: true,
                    overlay: "hide"
                })
            })
    }
    handleSubmit = (event) => {
        this.setState({
            overlay: "overlay"
        })
        event.preventDefault();
        const answers = this.state.quiz.map(question => {
            const answer = event.target["ques" + question.id].value;
            return {
                id: question.id,
                answer
            }
        })
        fetch('https://got-quiz-api.herokuapp.com/submitQuiz', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(answers)
        })
            .then(res => res.json())
            .then(score => {
                this.setState({
                    overlay: "hide",
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
                        <a href='#q1'><i className="fas fa-angle-double-down"></i>
                        </a>
                    </h1>
                </div>
                <div className={this.state.overlay}>
                    <div className='loading'>
                        <i className="fas fa-question q1"></i>
                        <i className="fas fa-male"></i>
                        <i className="fas fa-question q2"></i>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.quiz.map((question, index) => <Question key={question.id} {...question} index={index + 1} />)
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