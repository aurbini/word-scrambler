import React, { useEffect, useState } from 'react'

import './App.css';
import InputsContainer from './components/inputsContainer';
import WinModal from './UI/winModal';
import { stringToArrayOfLetters, stringToArrayOfWords, shuffleSentence, updateArrayOfObjects } from './utils'


function App() {

  const [ shuffledLettersArray, setShuffledLettersArray ] = useState([])
  const [ counter, setCounter  ] = useState(1)
  const [ score, setScore ] = useState(0)
  const [ originalSentence, setOriginalSentence ] = useState([])
  const [ guessedValues, setGuessedValues ] = useState([{index: 0, value: "", inputColor: "grey" }])
  const [ sentenceGuessed, setSentenceGuessed ] = useState(false)
  const [ showNextButton, setShowNextButton ] = useState(false)
  const [ focusField, setFocusField ] = useState(1)

  let gameContent = ""

  useEffect(() => {
    fetch(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then(response => response.json())
      .then(({data}) => {
        const arrayOfWords = stringToArrayOfWords(data.sentence)
        const shuffledSentence = shuffleSentence(arrayOfWords)
        const arrayOfLetters = stringToArrayOfLetters(data.sentence)

        setOriginalSentence(arrayOfLetters)
        setGuessedValues(arrayOfLetters
          .reduce((newArr, currLetter, currIndex) => {
            newArr.push({
              index: currIndex,
              value: '', 
              inputColor: 'grey'
            })
            return newArr
          }, []))
        setShuffledLettersArray(shuffledSentence)
      })
  }, [counter])

  useEffect(() => {
    let checkIfAllLettersGuessed = ''
    for (let i = 0; i < guessedValues.length; i++) {
      const element = guessedValues[i];
      if(element.value === '') {
        checkIfAllLettersGuessed = false
      }
    }
    if(checkIfAllLettersGuessed === false) return
    else checkIfAllLettersGuessed = true
    setSentenceGuessed(true) 
  }, [ guessedValues])

  useEffect(()=>{
    if( originalSentence.length !== 0){
      const guessedValuesLettersString = guessedValues.reduce((newArr, currObj) => {
        newArr.push(currObj.value)
        return newArr
      }, []).join('')
      if(guessedValuesLettersString === originalSentence.join('')){
        setShowNextButton(true)
      }else{setSentenceGuessed(false)}
    }
  }, [ sentenceGuessed ])

  const checkLetterGuessHandler = (guessedLetter, inputFieldIndex, valueLength) => {
    let inputColor = 'grey';
    if(guessedLetter === originalSentence[inputFieldIndex - 1]){
    inputColor = 'green'
    }
    const updatedGuessedData = updateArrayOfObjects(guessedValues, guessedLetter, inputFieldIndex, inputColor)
    setGuessedValues(updatedGuessedData)
    if(guessedLetter.length !== 0){
      if(inputFieldIndex < originalSentence.length ){
        const nextField = document.querySelector(`input[name=field-${inputFieldIndex + 1}]`)
        if(nextField !== null){
          nextField.focus()
        }
      }else{
        const currentField = document.querySelector(`input[name=field-${inputFieldIndex}]`)
        currentField.blur()
      }
    }
  }

  const handleNextButtonClick = event => {
    event.preventDefault()

    setScore(score => score + 1)
    setGuessedValues([{index: 0, value: ''}])
    setCounter(counter => counter + 1)
    setFocusField(0)
    setShuffledLettersArray([])
    setShowNextButton(false)
  }


  if(shuffledLettersArray.length > 0){  
    gameContent = <InputsContainer 
                    shuffledSentence={shuffledLettersArray}
                    onLetterGuess={checkLetterGuessHandler}
                    guessedValues={guessedValues}
                    focusFieldIndex={focusField}
                    showNextButton={showNextButton}
                    onNextButtonClick={handleNextButtonClick}
                  />   
  }    
  const shuffledSentenceString = shuffledLettersArray.join()
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
        <div className="next-button">
        </div>
      </div>
    </div>
  );
}

export default App;


