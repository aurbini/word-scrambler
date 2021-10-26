import React, { useState, useEffect } from 'react';

import LetterContainer from './LetterContainer'
import './WordContainer.css'
import { updateWordIndexValue } from '../utils'

const WordContainer = ( props ) => {

  const { 
    word, 
    originalWord, 
    onWordComplete, 
    isCurrentWord
    } = props

    console.log(isCurrentWord)
  const [ wordState, setWordState ] = useState([]) 
  const [ activeLetterIndex, setActiveLetterIndex ] = useState(null)

  const lettersArray = word.split('')
  
  const handleLetterGuess = guessedIndex => guessedLetter => {
    if(guessedLetter === originalWord[guessedIndex]){
      //resetting the word state with the current guessed value
      setWordState(updateWordIndexValue(wordState, guessedIndex, guessedLetter))
      setActiveLetterIndex(activeLetterIndex + 1)
      //if the user deletes a letter
    } else if(guessedLetter === '') {
      //reset the word state
      setWordState(updateWordIndexValue(wordState, guessedIndex, guessedLetter))
    }
  }

  const handleWordComplete = () => {
    setActiveLetterIndex(null)
    onWordComplete()
  }
  
  useEffect(() => {
    //  console.log('word state updated', {
    //   wordState,
    //   originalWord,
    //   isCurrentWord,
    //   activeLetterIndex
    // })
    if (isCurrentWord && wordState.length === 0 ) {
      setActiveLetterIndex(0)
    }else if(wordState.join('') === originalWord && isCurrentWord){
      handleWordComplete()
    }
  }, [ wordState, isCurrentWord ])

  return (
    <div className="word-container">
      {lettersArray.map((letter, letterIndex) => {
        return (
          <LetterContainer
            onLetterGuess={handleLetterGuess(letterIndex)}
            index={letterIndex}
            focusLetter={isCurrentWord && activeLetterIndex }
            value={wordState[letterIndex]}
          />
        )
      })}
        <div className="space-field-box"></div>
    </div>
  )
}

export default WordContainer

