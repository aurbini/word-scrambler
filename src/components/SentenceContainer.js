import React, { useEffect, useState } from 'react';

import './SentenceContainer.css'
import WordContainer from './WordContainer'
import Button from '../UI/button'



const SentenceContainer = props => {
  const { 
    shuffledWords, 
    originalSentence, 
    onNextButtonClick
   } = props
  
  
  const [ currentWordIndex, setCurrentWordIndex ] = useState(0)
  const [ showNextButton, setShowNextButton ] = useState(false)

  useEffect(() => {
  
    if(currentWordIndex === shuffledWords.length){
      console.log('sentence complete')
      setShowNextButton(true)
    }
 
  },[ showNextButton, currentWordIndex, shuffledWords  ]) 

  const handleWordComplete = index => () => {
    setCurrentWordIndex(index + 1)
  }

  return (  
    <form 
      className="sentence-container"
      onSubmit={onNextButtonClick}>
      { shuffledWords.map((shuffledWord, wordIndex) => {  
          const isCurrentWord  = currentWordIndex === wordIndex  

          return <WordContainer 
                    key={wordIndex}
                    word={shuffledWord}
                    originalWord={originalSentence[wordIndex]}
                    onWordComplete={handleWordComplete(wordIndex)}
                    isCurrentWord={isCurrentWord}
                  />
        }
      )}
      {showNextButton && <div className="button-container">
        <Button type='submit'
        />
        </div>}
    </form>
  );
}
 
export default SentenceContainer;












// const nextWordLength = shuffledWords[wordIndex + 1].length
    // const newCurrentWordIndexes = [ currentWordIndex[0] + wordLength, currentWordIndex[1] + nextWordLength]
    // setCurrentWordIndexes(newCurrentWordIndexes)
  // const handleWordLetterGuess = e => {
  //   const { value, name } = e.target
  //   const [ , fieldIndex ] = name.split("-")
  //   let fieldIntIndex = parseInt(fieldIndex, 10);

  // }

      //  { props.showNextButton && <Button type="submit" /> } }

          // const isLastWordInSentence = shuffledWords.length === wordIndex + 1


  // const lastLetterInWord = word[word.length - 1]
        // const firstLetterInWord = word[0]
        // const isFirstLetter = firstLetterInWord !== ''
        // const previousDefined = word[index - 1]
        // const isDefined = guessedLettersArray[index] !== ''
        // const nextLetterDefinded = guessedLettersArray[index + 1]

        // const isCurrentLetter = ( isFirstLetter && isDefined)
        //   || (previousDefined )
        // const guesedValue = ''