import React, { useEffect } from 'react';

import InputField from '../UI/inputField';
import './LetterContainer.css'

const LetterContainer = ( props ) => {
  
  const { 
    onLetterGuess, 
    index,
    focusLetter,  
    value } = props

  const isFocusLetter = focusLetter === index

  useEffect(() => {
  }, [])

  return ( 
    <div className="letter-container">
      <InputField 
        isFocus={isFocusLetter}
        index={index}
        onValueGuess={onLetterGuess}
        value={value || ''}/>
    </div>
   );
}
 
export default LetterContainer;