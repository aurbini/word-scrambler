import React, { useEffect, useState, useRef } from "react";

import "./SentenceContainer.css";
import WordContainer from "./WordContainer";
import Button from "../UI/button";
import { compareTwoArrays } from "../utils";

const SentenceContainer = (props) => {
  const { shuffledWords, originalWords, onNextButtonClick } = props;
  const [showNextButton, setShowNextButton] = useState(false);
  const guessedSentence = useRef([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (compareTwoArrays(guessedSentence.current, originalWords)) {
      setShowNextButton(true);
    }
  }, [currentWordIndex, originalWords, shuffledWords.length]);

  const handleWordComplete = (wordIndex) => (guessedWord) => {
    setCurrentWordIndex(wordIndex + 1);
    guessedSentence.current.push(guessedWord);
  };

  return (
    <form className='sentence-container' onSubmit={onNextButtonClick}>
      {shuffledWords.map((shuffledWord, wordIndex) => {
        return (
          <WordContainer
            key={wordIndex}
            word={shuffledWord}
            originalWord={originalWords[wordIndex]}
            onWordComplete={handleWordComplete(wordIndex)}
            isCurrentWord={currentWordIndex === wordIndex}
          />
        );
      })}
      {showNextButton && (
        <div className='button-container'>
          <Button type='submit' />
        </div>
      )}
    </form>
  );
};

export default SentenceContainer;
