import React, { useEffect, useState } from 'react'

import './App.css';
import SentenceContainer from './components/SentenceContainer';
import WinModal from './UI/winModal';
import { stringToArrayOfLetters, stringToArrayOfWords, shuffleSentence} from './utils'


function App() {

  const [ shuffledWordsArray, setShuffledWordsArray ] = useState([])
  const [ counter, setCounter  ] = useState(1)
  const [ score, setScore ] = useState(0)
  const [ originalSentence, setOriginalSentence ] = useState([])
  const [ wordsGuessed, setWordsGuessed ] = useState([])

  let gameContent = ""
  useEffect(() => {
    fetch(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then(response => response.json())
      .then(({data}) => {
        const arrayOfWords = stringToArrayOfWords(data.sentence)
        const shuffledSentence = shuffleSentence(arrayOfWords)
        const arrayOfLetters = stringToArrayOfLetters(data.sentence)
        setOriginalSentence(arrayOfWords)
        setWordsGuessed(shuffledSentence.map(word => false))
        setShuffledWordsArray(shuffledSentence)
      })
  }, [counter])
  
  
  const handleNextButtonClick = event => {
    event.preventDefault()

    setScore(score => score + 1)
    setWordsGuessed([])
    setCounter(counter => counter + 1)
    setShuffledWordsArray([])
  }

  if(shuffledWordsArray.length > 0){  
    gameContent = <SentenceContainer 
                    shuffledWords={shuffledWordsArray}
                    originalSentence={originalSentence}
                    onNextButton={handleNextButtonClick}
                    // showNextButton={showNextButton}
                  />   
  }    
  const shuffledSentenceString = shuffledWordsArray.join(' ')
  return (
    <div className="App">
      {score === 3 ? <WinModal /> : ""}
      <div className="game-wrapper">
        <div className="heading-container"id={"scrambled-word"}>
          <h1 className="scrambled-sentence">{shuffledSentenceString} </h1>
          <p>Guess the sentence! start typing</p>
          <p>The yellow blocks are meant for spaces</p>
          <h1>Score: {score}</h1>
        </div>
        <div className="game-content-container">
          {gameContent}
        </div>
      </div>
    </div>
  );
}

export default App;



// const showNextButton = () => {
//   let isWordsCorrect 
//   if(wordsGuessed.find(false)){
//     isWordsCorrect = false
//   }else{
//     isWordsCorrect = true
//   }
//   setWordsGuessed(isWordsCorrect)
// }
// useEffect(() => {
  //   let checkIfAllLettersGuessed = ''
  //   for (let i = 0; i < guessedValues.length; i++) {
  //     const element = guessedValues[i];
  //     if(element.value === '') {
  //       checkIfAllLettersGuessed = false
  //     }
  //   }
  //   if(checkIfAllLettersGuessed === false) return
  //   setSentenceGuessed(true) 
  // }, [ guessedValues])

  // useEffect(()=>{
  //   if( originalSentence.length !== 0){
  //     if(guessedValues === originalSentence.join('')){
  //       setShowNextButton(true)
  //     }else{
  //       setSentenceGuessed(false)
  //     }
  //   }
  // }, [ sentenceGuessed ])

 
  // const letterGuessHandler = ( letterIndex, guessedLetter ) => {
  //   const newGuessedValues = [ ...guessedValues ]
  //   newGuessedValues[letterIndex] = guessedLetter 
  //   setGuessedValues(newGuessedValues)
  // }
 // const letterGuessHandler = (guessedLetter, inputFieldIndex, valueLength) => {
  //   let inputColor = 'grey';
  //   if(guessedLetter === originalSentence[inputFieldIndex - 1]){
  //   inputColor = 'green'
  //   }
  //   const updatedGuessedData = updateArrayOfObjects(guessedValues, guessedLetter, inputFieldIndex, inputColor)
  //   setGuessedValues(updatedGuessedData)
  //   if(guessedLetter.length !== 0){
  //     if(inputFieldIndex < originalSentence.length ){
  //       const nextField = document.querySelector(`input[name=field-${inputFieldIndex + 1}]`)
  //       if(nextField !== null){
  //         nextField.focus()
  //       }
  //     }else{
  //       const currentField = document.querySelector(`input[name=field-${inputFieldIndex}]`)
  //       currentField.blur()
  //     }
  //   }
  // }