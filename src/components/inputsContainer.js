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
       { props.sentence.split(' ').map((word, wordIndex) => {
         console.log(props.sentence.split(' ').length)
          return (
            <div 
              className="input-row-container"
              key={wordIndex}
            > {
                word.split('').map((letter, letterIndex) => {
                  inputFieldIndex++
                  return (
                    <div>
                      <InputField 
                        focusField={props.focusFieldIndex}
                        key={letterIndex}
                        className="input" 
                        index={inputFieldIndex}
                        handleChange={handleChange}
                        inputColor={props.inputColor}
                        enteredValues={props.guessedValues}
                      />
                      { letterIndex === word.length -1 && wordIndex < props.sentence.split(' ').length - 1 
                      ? <input className="space-field" /> : ""}
                    </div>
                  )
                     
                })
              }
            </div>
          )
        })}
    </div>
  );
}
 
export default InputsContainer;
