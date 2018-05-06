import React from 'react';
import FlagQuestionChoice from './FlagQuestionChoice';
import FlagQuestionCorrect from './FlagQuestionCorrect';
import FlagQuestionWrong from './FlagQuestionWrong';
import NextBtn from '../NextBtn';

const QUESTION_STATE = {
  QUESTION: 1,
  QUESTION_CORRECT: 2,
  QUESTION_WRONG: 3,
}

class FlagQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      QUESTION_STATE: QUESTION_STATE.QUESTION,
      picked: undefined,
    }
  }

  handleClick = value => {
    // compare value of radio button with option
    this.setState({ picked: value })
  }

  handleNext = () => {
    this.setState(prevState => {
      return { QUESTION_STATE: QUESTION_STATE.QUESTION}
    }, () => {
      this.props.handleNext();
    })
  }

  handleSubmit = e => {
    // set QUESTION_STATE
    let stateNum;
    if (this.state.picked === this.props.correctOption) {
      stateNum = 2;
    } else if (this.state.picked !== this.props.correctOption) {
      stateNum = 3;
    }
    e.preventDefault();
    this.setState({ QUESTION_STATE: stateNum })
  }

	render() {
		// if correct, render 'correct'
    // if wrong, render 'wrong'
    const {QUESTION_STATE} = this.state;
    const { countries, options} = this.props;
    let display;
    if (QUESTION_STATE === 1) {
      // render choices
      const optionChoice = options.map((option, index) => {
        return <FlagQuestionChoice key={index} value={option} name={countries[option].name} onClick={this.handleClick}/>
      })
      display = (
        <form onSubmit={this.handleSubmit}>
          {optionChoice}
          <button type="submit">Submit</button>
        </form>
      )
    } else if (QUESTION_STATE === 2) {
      // render right
      display = (
        <div><FlagQuestionCorrect /><NextBtn handleNext={this.handleNext}/>
        </div>
      )
    } else if (QUESTION_STATE === 3) {
      // render wrong
      display = (
        <div>
          <FlagQuestionWrong correctOption={this.props.countries[this.props.correctOption].name} />
          <NextBtn handleNext={this.handleNext} />
        </div>
      )
    }

		return (
      <div>
        {display}
      </div>
		);
	}
}

export default FlagQuestion;