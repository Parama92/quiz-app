import React from 'react';

class Question extends React.Component {
    render() {
        return (
            <div className='question-container'>
                <div className='question'>{this.props.question}</div>
                <input
                    type='radio'
                    name={"ques" + this.props.id}
                    value="option1"
                    id={this.props.id + 'o1'}
                />
                <label htmlFor={this.props.id + 'o1'}>
                    <div className='option'>{this.props.option1}</div>
                </label>
                <input
                    type='radio'
                    name={"ques" + this.props.id}
                    value="option2"
                    id={this.props.id + 'o2'}
                />
                <label htmlFor={this.props.id + 'o2'}>
                    <div className='option'>{this.props.option2}</div>
                </label>
                <input
                    type='radio'
                    name={"ques" + this.props.id}
                    value="option3"
                    id={this.props.id + 'o3'}
                />
                <label htmlFor={this.props.id + 'o3'}>
                    <div className='option'>{this.props.option3}</div>
                </label>
                <input
                    type='radio'
                    name={"ques" + this.props.id}
                    value="option4"
                    id={this.props.id + 'o4'}
                />
                <label htmlFor={this.props.id + 'o4'}>
                    <div className='option'>{this.props.option4}</div>
                </label>
            </div>
        )
    }
}

export default Question;