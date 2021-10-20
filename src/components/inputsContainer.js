import React from 'react';

import './inputsContainer.css'
import InputField from '../UI/inputField'

const InputsContainer = (props) => {

  const handleChange = e => {
    const { value, name } = e.target
    const [ , fieldIndex ] = name.split("-")
    let fieldIntIndex = parseInt(fieldIndex, 10);
      props.onLetterGuess(e.target.value, fieldIntIndex, value.length ) 
  }
  let inputFieldIndex = 0

  return (  
    <div className="inputs-container">
       { props.sentence.split(' ').map((word, index) => {
          return (
            <div 
              className="input-row-container"
              key={index}>
              {
                word.split('').map((letter, index) => {
                  inputFieldIndex++
                  return <InputField 
                          focusField={props.focusFieldIndex}
                          key={index}
                          className="input" 
                          index={inputFieldIndex}
                          handleChange={handleChange}
                          inputColor={props.inputColor}
                          enteredValues={props.guessedValues}
                        />
                })
              }
              <div className="space"></div>
            </div>
          )
        })}
    </div>
  );
}
 
export default InputsContainer;
