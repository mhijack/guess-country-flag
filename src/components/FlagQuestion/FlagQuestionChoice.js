import React from 'react';

const FlagQuestionChoice = props => {
  return (
    <label>
      {props.name}
      <input type="radio" value={props.name} name="name" onClick={() => props.onClick(props.value)} required/>
    </label>
  )
}

export default FlagQuestionChoice;