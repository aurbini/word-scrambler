import React, { useRef, useEffect } from "react";

import "./inputField.css";

const InputField = (props) => {
  const { onValueGuess, isCorrect, isFocus } = props;

  const inputFieldRef = useRef();

  useEffect(() => {
    if (isFocus && inputFieldRef.current) {
      inputFieldRef.current.focus();
    }
  }, [isFocus, inputFieldRef]);
  // const correctColor = value !== "";

  return (
    <input
      ref={inputFieldRef}
      className={isCorrect ? "correct-input" : ""}
      onChange={(event) => onValueGuess(event.target.value)}
      autoFocus={isFocus}
      maxLength='1'
    />
  );
};

export default InputField;
