import React, { useEffect } from 'react';

import InputField from '../UI/inputField';
import './LetterContainer.css'

const LetterContainer = ( props ) => {
  
  const { 
    onLetterGuess, 
    index,
    focusLetter,  
    value } = props
  
  //Does the current letter match the focused letter, true or false
  const isFocusLetter = focusLetter === index

  useEffect(() => {
  }, [])

  return ( 
    <div className="letter-container">
      <InputField 
        isFocus={isFocusLetter}
        onValueGuess={onLetterGuess}
        value={value || ''}/>
    </div>
   );
}
 
export default LetterContainer;