import React, { useEffect, useState } from 'react'

import './App.css';
import InputsContainer from './components/inputsContainer';
import Button from './UI/button'
import WinModal from './UI/winModal';

function getRandomInt(n){
  return Math.floor(Math.random() * n)
}

function shuffleLetters(innerLetters){
  const lettersToArray = innerLetters.split('')
  let lengthOfLetters = lettersToArray.length

  for (let i = 0; i < lettersToArray.length - 1; i++) {
    let randomInt = getRandomInt(lengthOfLetters)
    const temp = lettersToArray[i]

    lettersToArray[i] = lettersToArray[randomInt]
    lettersToArray[randomInt] = temp
  }

  return lettersToArray.join('')
}

function App() {

  const [ shuffledSentence, setShuffledSentence ] = useState('')
  const [ counter, setCounter  ] = useState(1)
  const [ score, setScore ] = useState(0)
  const [ inputColorState, setInputColorState ] = useState({})
  const [ originalSentence, setOriginalSentence ] = useState([])
  const [ guessedValues, setGuessedValues ] = useState([])
  const [ sentenceGuessed, setSentenceGuessed ] = useState(false)
  const [ correctSentenceGuessed, setCorrectSentenceGuessed ] = useState(false)
  const [ focusField, setFocusField ] = useState(0)

  let gameContent = ""

  useEffect(() => {
    fetch(`https://api.hatchways.io/assessment/sentences/${counter}`)
      .then(response => response.json())
      .then(({data}) => {
        console.log(data.sentence)
        const sentenceArray = data.sentence.split(' ')
        //go through each word in array
        const shuffledSentence = sentenceArray.map(word => {
          if(word.length > 3){
            const innerLetters = word.slice(1, word.length - 1)
            return word[0] + shuffleLetters(innerLetters) + word[word.length - 1] 
          }else{
            return word
          }
        });
        setOriginalSentence(data.sentence.split('').filter(letter => letter !== ' '))
        setShuffledSentence(shuffledSentence.join(' '))
        setInputColorState(data.sentence.split('')
                            .filter(letter => letter !== ' ')
                            .reduce((acc, currLetter, currIndex ) => {
                              return { ...acc, currIndex: false}
                            } , {}))
      })
  }, [counter])

  useEffect(()=>{
    if(guessedValues.length && originalSentence.length !== 0){
      if(guessedValues.join('') === originalSentence.join('')){
        console.log('sentences are the same ')
        setCorrectSentenceGuessed(true)
      }
    }
  }, [ sentenceGuessed ])

  const checkLetterGuessHandler = (guessedLetter, index) => {
    if(guessedLetter === originalSentence[index - 1]){
      setInputColorState(colorState => { 
        return { ...colorState,  [index ]: true }
      })
    }
    setGuessedValues(guessedValues => {
      return [ ...guessedValues, guessedLetter]
    })
    setFocusField(index)
    if(index === originalSentence.length){  
      setSentenceGuessed(true) 
    }
  }

  const handleNextButtonClick = () => {
    console.log(guessedValues.length)
    setScore(score => score + 1)
    setGuessedValues([])
    setCounter(counter => counter + 1)
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
