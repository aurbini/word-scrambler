import React, { useState, useEffect, useCallback } from "react";

import LetterContainer from "./LetterContainer";
import "./WordContainer.css";
import { updateWordIndexValue } from "../utils";

const WordContainer = (props) => {
  const { word, originalWord, onWordComplete, isCurrentWord } = props;
  const [wordState, setWordState] = useState(
    originalWord.split("").map((word) => {
      return "";
    })
  );
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);
  const lettersArray = word.split("");
  const handleLetterGuess = (guessedIndex) => (guessedLetter) => {
    //resetting the word state with the current guessed value
    setWordState(updateWordIndexValue(wordState, guessedIndex, guessedLetter));
  };

  const handleWordComplete = useCallback(() => {
    setActiveLetterIndex(null);
    onWordComplete(wordState);
  }, [onWordComplete, wordState]);

  useEffect(() => {
    if (wordState.find((letter) => letter === "") === "") {
      setActiveLetterIndex(wordState.indexOf(""));
    }
  }, [wordState]);

  useEffect(() => {
    if (isCurrentWord && activeLetterIndex === null) {
      setActiveLetterIndex(0);
    } else if (
      wordState.find((letter) => letter === "") !== "" &&
      isCurrentWord
    ) {
      handleWordComplete();
    }
  }, [wordState, isCurrentWord, handleWordComplete, originalWord.length]);

  return (
    <div className='word-container'>
      {lettersArray.map((letter, letterIndex) => {
        return (
          <LetterContainer
            key={letterIndex}
            onLetterGuess={handleLetterGuess(letterIndex)}
            index={letterIndex}
            focusLetter={isCurrentWord && activeLetterIndex}
            // value={wordState[letterIndex]}
            isCorrect={wordState[letterIndex] === originalWord[letterIndex]}
          />
        );
      })}
      <div className='space-field-box'></div>
    </div>
  );
};

export default WordContainer;
