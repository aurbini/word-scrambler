import React, { useState, useEffect, useCallback } from "react";

import LetterContainer from "./LetterContainer";
import "./WordContainer.css";
import { updateWordIndexValue } from "../utils";

const findEmptyValue = (arrayOfLetters) => {
  for (let i = 0; i <= arrayOfLetters.length; i++) {
    if (arrayOfLetters[i] === "") return i;
  }
};
const WordContainer = (props) => {
  const {
    word,
    originalWord,
    onWordComplete,
    isCurrentWord,
    currentWordIndex,
    wordIndex,
    changeCurrentWord,
  } = props;
  const [wordState, setWordState] = useState(
    originalWord.split("").map((word) => {
      return "";
    })
  );
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);
  const lettersArray = word.split("");

  const handleLetterGuess =
    (guessedLetterIndex, wordIndex) => (guessedLetter) => {
      //resetting the word state with the current guessed value
      if (guessedLetter === "" && currentWordIndex !== wordIndex) {
        changeCurrentWord(wordIndex);
      }
      setWordState(
        updateWordIndexValue(wordState, guessedLetterIndex, guessedLetter)
      );
      if (guessedLetter !== "") {
        console.log({ activeLetterIndex });
        setActiveLetterIndex((activeLetterIndex) => activeLetterIndex + 1);
      }
    };

  const handleWordComplete = useCallback(() => {
    setActiveLetterIndex(null);
    onWordComplete(wordState);
  }, [onWordComplete, wordState]);

  useEffect(() => {
    if (wordState.find((letter) => letter === "")) {
      setActiveLetterIndex(wordState.indexOf((letter) => letter === ""));
    }
  }, [wordState]);

  useEffect(() => {
    if (isCurrentWord && activeLetterIndex === null) {
      const emptyValueIndex = findEmptyValue(wordState);
      setActiveLetterIndex(emptyValueIndex);
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
            onLetterGuess={handleLetterGuess(letterIndex, wordIndex)}
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
