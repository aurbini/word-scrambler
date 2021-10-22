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
      document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter'){
          listener()
        }
      })
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
       { props.shuffledSentence.map((shuffledWord, wordIndex) => {
         const arrayOfShuffledLetters = shuffledWord.split('')
          return (
            <div 
              className="input-row-container"
              key={wordIndex}
            > {
                arrayOfShuffledLetters.map((letter, letterIndex) => {
                  inputFieldIndex++
                  return (
                    <div className="letter-container">
                      <InputField 
                        focusField={props.focusFieldIndex}
                        key={inputFieldIndex}
                        className="input" 
                        index={inputFieldIndex}
                        handleChange={handleInputChange}
                        enteredValues={props.guessedValues}
                      />
                      { letterIndex === shuffledWord.length -1 && wordIndex < props.shuffledSentence.length - 1 
                      ? <input className="space-field" /> 
                      : ""}
                    </div>
                  )
                     
                })
              }
            </div>
          )
        })}
    { props.showNextButton && <Button type="submit" /> }
   
    </form>
  );
}
 
export default InputsContainer;
