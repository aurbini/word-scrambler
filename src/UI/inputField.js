import React, { useRef, useEffect } from 'react';

import './inputField.css'

const InputField = ( props ) => {

  
  const { 
    value, 
    onValueGuess, 
    isFocus } = props

  const inputFieldRef = useRef()

  useEffect(()=> {
    if(isFocus && inputFieldRef.current){
      inputFieldRef.current.focus()
    }
  }, [ isFocus, inputFieldRef ])
  const correctColor = value !== ''
  
  return ( 
    <input 
      ref={inputFieldRef}
      value={value}
      className={correctColor ? "correct-input" : ""}
      onChange={(event)=> onValueGuess(event.target.value)}
      autoFocus={isFocus}
      maxLength="1"
    />
   );
}
 
export default InputField;



