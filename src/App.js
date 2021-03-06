import React, { useEffect, useState } from "react";

import "./App.css";
import SentenceContainer from "./components/SentenceContainer";
import WinModal from "./UI/winModal";
import { stringToArrayOfWords, shuffleSentence } from "./utils";

function App() {
  const [shuffledWordsArray, setShuffledWordsArray] = useState([]);
  const [score, setScore] = useState(0);
  const [originalSentence, setOriginalSentence] = useState([]);

  let gameContent = "";
  useEffect(() => {
    if (score !== 11) {
      fetch(`https://api.hatchways.io/assessment/sentences/${score + 1}`)
        .then((response) => response.json())
        .then(({ data }) => {
          const arrayOfWords = stringToArrayOfWords(data.sentence);
          const shuffledSentence = shuffleSentence(arrayOfWords);
          setOriginalSentence(arrayOfWords);
          setShuffledWordsArray(shuffledSentence);
        });
    }
  }, [score]);

  const handleNextButtonClick = (event) => {
    event.preventDefault();

    setScore((score) => score + 1);
    setShuffledWordsArray([]);
  };

  if (shuffledWordsArray.length > 0) {
    gameContent = (
      <SentenceContainer
        shuffledWords={shuffledWordsArray}
        originalWords={originalSentence}
        onNextButtonClick={handleNextButtonClick}
      />
    );
  }
  const shuffledSentenceString = shuffledWordsArray.join(" ");
  return (
    <div className="App">
      {score === 10 && <WinModal /> }
      <div className="game-wrapper">
        <div className="heading-container" id={"scrambled-word"}>
          <h1 className="scrambled-sentence">{shuffledSentenceString} </h1>
          <p>Guess the sentence! start typing</p>
          <p>The yellow blocks are meant for spaces</p>
          <h1>Score: {score}</h1>
        </div>
        <div className="game-content-container">{gameContent}</div>
      </div>
    </div>
  );
}

export default App;
