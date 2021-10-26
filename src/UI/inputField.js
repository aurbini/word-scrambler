import React, { useRef, useEffect } from 'react';

import './inputField.css'

const InputField = ( props ) => {

  
  const { 
    value, 
    onValueGuess, 
    index, 
    isFocus } = props
  console.log(`input should be true if ${isFocus}`)

  const inputFieldRef = useRef()

  useEffect(()=> {
    if(isFocus && inputFieldRef.current){
      inputFieldRef.current.focus()
    }
  }, [ isFocus, inputFieldRef ])

  return ( 
    <input 
      ref={inputFieldRef}
      value={value}
      className="input-field"
      onChange={(event)=> onValueGuess(event.target.value)}
      autoFocus={isFocus}
      maxLength="1"
    />
   );
}
 
export default InputField;









     // {
      //   `input-field 
      //    ${searchThroughArrayOfObjects(props.enteredValues, props.index , 'inputColor') === 'green'
      //   ? "correct-letter-background" : "" } `}      
      // value={searchThroughArrayOfObjects(props.enteredValues, props.index, 'value')}
      // className={guessedValue}
      // type="text"
      // name={`field-${index}`}
      // maxLength="1"
      // onChange={onLetterGuess}
      // autoFocus={focusField}
      // autoFocus={props.enteredValues.find(letterObject => props.index === 1 & letterObject.value === "") ? true : false}