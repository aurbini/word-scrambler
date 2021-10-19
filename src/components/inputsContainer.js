import React from 'react';

import './inputsContainer.css'
import InputField from '../UI/inputField'

const InputsContainer = (props) => {
  let inputFieldCounter = 0


  const handleChange = e => {
    const { value, name } = e.target
    const [ , fieldIndex ] = name.split("-")
    let fieldIntIndex = parseInt(fieldIndex, 10);
      props.onLetterGuess(e.target.value, fieldIntIndex, value.length ) 
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
