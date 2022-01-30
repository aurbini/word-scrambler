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
    originalWord.split("").map((letter) => {
      return "";
    })
  );
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);
  const lettersArray = word.split("");

  const handleLetterGuess =
    (guessedLetterIndex, wordIndex) => (guessedLetter) => {
      //resetting the word state with the current guessed value
      // console.log({
      //   wordState,
      //   activeLetterIndex,
      //   isCurrentWord,
      //   currentWordIndex, 
      //   wordIndex, 
      //   guessedLetter, 
      //   guessedLetterIndex
      // });
      if (guessedLetter === "" && currentWordIndex !== wordIndex) {
        console.log(wordIndex);
        changeCurrentWord(wordIndex);
        return;
      }
      if (guessedLetter === "" && currentWordIndex === wordIndex) {
        console.log('correction ');
        setActiveLetterIndex()
        return;
      }
      setWordState(
        updateWordIndexValue(wordState, guessedLetterIndex, guessedLetter)
      );
      if (guessedLetter !== "" && guessedLetterIndex === activeLetterIndex) {
        setActiveLetterIndex((activeLetterIndex) => activeLetterIndex + 1);
      }else{
        setActiveLetterIndex(guessedLetterIndex);
      }
    };
    // useEffect(() => {
    //   console.log({
    //     wordState: wordState,
    //     activeLetter: activeLetterIndex,
    //     isCurrentWord: isCurrentWord,
    //     currentWordIndex, 
    //     wordIndex, 
    //   });
    // });
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
            isCorrect={wordState[letterIndex] === originalWord[letterIndex]}
          />
        );
      })}
      <div className='space-field-box'></div>
    </div>
  );
};

export default WordContainer;
