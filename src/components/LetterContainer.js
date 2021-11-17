import React, { useEffect } from "react";

import InputField from "../UI/inputField";
import "./LetterContainer.css";

const LetterContainer = (props) => {
  const { onLetterGuess, index, focusLetter, isCorrect } = props;

  //Does the current letter match the focused letter, true or false
  const isFocusLetter = focusLetter === index;

  useEffect(() => {}, []);

  return (
    <div className='letter-container'>
      <InputField
        isCorrect={isCorrect}
        isFocus={isFocusLetter}
        onValueGuess={onLetterGuess}
      />
    </div>
  );
};

export default LetterContainer;
