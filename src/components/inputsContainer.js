import React from 'react';

import './inputsContainer.css'
import InputField from '../UI/inputField'

const InputsContainer = (props) => {
  let inputFieldCounter = 0


  const handleChange = e => {
    const { maxLength, value, name } = e.target
    const [ , fieldIndex ] = name.split("-")
    let fieldIntIndex = parseInt(fieldIndex, 10);

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < props.sentence.length) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );
        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus();
        }
      }
    } 
    props.onLetterGuess(e.target.value, fieldIntIndex )
  }
  
  return (  
    <div className="inputs-container">
       { props.sentence.split(' ').map(word => {
          return (
            <div 
              className="input-row-container"
              key={Math.random()}>
              {
                word.split('').map(letter => {
                  inputFieldCounter++
                  return <InputField 
                          focusField={props.focusFieldIndex}
                          key={Math.random()}
                          className="input" 
                          index={inputFieldCounter}
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
