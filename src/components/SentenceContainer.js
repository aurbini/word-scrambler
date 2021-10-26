import React, { useEffect, useState } from 'react';

import './SentenceContainer.css'
import WordContainer from './WordContainer'
import Button from '../UI/button'



const SentenceContainer = props => {
  const { 
    shuffledWords, 
    originalSentence, 
    showNextButton
   } = props
  
  
  const [ currentWordIndex, setCurrentWordIndex ] = useState(0)

  useEffect(() => {
    const listener = e => {
      document.getElementsByClassName('button')[0].click()
    }
    if(props.showNextButton){
      document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter'){
          listener()
        }
      })
    }
    return () => {
      document.removeEventListener("keypress", listener)
    }
  },[showNextButton]) 

  const handleWordComplete = index => () => {
    setCurrentWordIndex(index + 1)
  }

  return (  
    <form 
      className="sentence-container"
      onSubmit={props.onNextButtonClick}>
      { shuffledWords.map((shuffledWord, wordIndex) => {  
          console.log(currentWordIndex)     
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