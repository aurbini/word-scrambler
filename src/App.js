import React, { useEffect, useState } from 'react'

import './App.css';
import InputsContainer from './components/inputsContainer';
import Button from './UI/button'
import WinModal from './UI/winModal';
import { shuffleLetters } from './utils'


function App() {

  const [ shuffledSentence, setShuffledSentence ] = useState('')
  const [ counter, setCounter  ] = useState(1)
  const [ score, setScore ] = useState(0)
  const [ inputColorState, setInputColorState ] = useState({})
  const [ originalSentence, setOriginalSentence ] = useState([])
  const [ guessedValues, setGuessedValues ] = useState([{index: 0, value: ""}])
  const [ sentenceGuessed, setSentenceGuessed ] = useState(false)
  const [ correctSentenceGuessed, setCorrectSentenceGuessed ] = useState(false)
  const [ focusField, setFocusField ] = useState(1)

  let gameContent = ""

  useEffect(() => {
    fetch(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then(response => response.json())
      .then(({data}) => {
        const arrayOfWords = data.sentence.split(' ')
        const shuffledSentenceString = arrayOfWords.map(word => {
          if(word.length > 3){
            const innerLetters = word.slice(1, word.length - 1)
            return word[0] + shuffleLetters(innerLetters) + word[word.length - 1] 
          }else{
            return word
          }
        }).join(' ');
        const arrayOfLetters = data.sentence.split('').filter(letter => letter !== ' ')
        setOriginalSentence(arrayOfLetters)
        setInputColorState(arrayOfLetters
          .reduce((acc, currLetter, currIndex ) => {
            return { ...acc, currIndex: false}
          } , {}))
        setGuessedValues(arrayOfLetters
          .reduce((newArr, currLetter, currIndex) => {
            newArr.push({
              index: currIndex,
              value: ""
            })
            return newArr
          }, []))
        setShuffledSentence(shuffledSentenceString)

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
    console.log('indexes are not ""')
    setSentenceGuessed(true) 
  }, [ guessedValues])

  useEffect(()=>{
    if( originalSentence.length !== 0){
      const guessedValuesLettersString = guessedValues.reduce((newArr, currObj) => {
        newArr.push(currObj.value)
        return newArr
      }, []).join('')
      if(guessedValuesLettersString === originalSentence.join('')){
        setCorrectSentenceGuessed(true)
      }else{setSentenceGuessed(false)}
    }
  }, [ sentenceGuessed ])

  const checkLetterGuessHandler = (guessedLetter, inputFieldIndex, valueLength) => {
    if(guessedLetter === originalSentence[inputFieldIndex - 1]){
      setInputColorState(colorState => { 
        return { ...colorState,  [ inputFieldIndex ]: true }
      })
    }
    const updatedGuessedData = guessedValues.map( obj => (obj.index === inputFieldIndex - 1 ? { ...obj, value: guessedLetter} : obj))
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

  const handleNextButtonClick = () => {
    setScore(score => score + 1)
    setGuessedValues([{index: 0, value: ''}])
    setCounter(counter => counter + 1)
    setFocusField(0)
    setShuffledSentence('')
  }


  if(shuffledSentence.length > 0){  
    gameContent = <InputsContainer 
                    sentence={shuffledSentence}
                    inputColor={inputColorState} 
                    onLetterGuess={checkLetterGuessHandler}
                    guessedValues={guessedValues}
                    focusFieldIndex={focusField}
                  />   
  }    
  return (
    <div className="App">
      {score === 3 ? <WinModal /> : ""}
      <div className="heading-container"id={"scrambled-word"}>
        <h1 className="scrambled-sentence">{shuffledSentence} </h1>
        <p>Guess the sentence! start typing</p>
        <p>The yellow blocks are meant for spaces</p>
        <h1>Score: {score}</h1>
      </div>
        {gameContent}
      <div className="next-button">
        {correctSentenceGuessed && <Button onNextButtonClick={handleNextButtonClick} /> }
      </div>
    </div>
  );
}

export default App;


