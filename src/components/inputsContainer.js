import React, { useEffect } from 'react';

import './inputsContainer.css'
import InputField from '../UI/inputField'
import Button from '../UI/button'



const InputsContainer = (props) => {

  useEffect(() => {
    const listener = e => {
      document.getElementsByClassName('button')[0].click()
    }
    if(props.showNextButton){
      document.addEventListener("keydown", listener)
    }
    return () => {
      document.removeEventListener("keydown", listener)
    }
  },[props.showNextButton]) 

  const handleInputChange = e => {
    const { value, name } = e.target
    const [ , fieldIndex ] = name.split("-")
    let fieldIntIndex = parseInt(fieldIndex, 10);
      props.onLetterGuess(e.target.value, fieldIntIndex, value.length ) 
  }

  let inputFieldIndex = 0

  return (  
    <form 
      className="inputs-container"
      onSubmit={props.onNextButtonClick}>
       { props.sentence.split(' ').map((word, wordIndex) => {
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
                        handleChange={handleInputChange}
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
    {props.showNextButton && <Button type="submit" /> }
   
    </form>
  );
}
 
export default InputsContainer;
