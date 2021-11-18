const shuffleLetters = (innerLetters) => {
  const shuffledlettersArray = innerLetters.split("");
  let lengthOfLetters = shuffledlettersArray.length;
  if (lengthOfLetters !== 2) {
    for (let i = 0; i < shuffledlettersArray.length - 1; i++) {
      let randomInt = Math.floor(Math.random() * (i + 1));
      const temp = shuffledlettersArray[i];

      shuffledlettersArray[i] = shuffledlettersArray[randomInt];
      shuffledlettersArray[randomInt] = temp;
    }
  } else {
    const shuffledShortArrayTemp = [...shuffledlettersArray];
    shuffledlettersArray[0] = shuffledShortArrayTemp[1];
    shuffledlettersArray[1] = shuffledShortArrayTemp[0];
  }

  return shuffledlettersArray.join("");
};
export const shuffleSentence = (arrayOfWords) => {
  return arrayOfWords.map((word) => {
    if (word.length > 3) {
      const innerLetters = word.slice(1, word.length - 1);
      return word[0] + shuffleLetters(innerLetters) + word[word.length - 1];
    } else {
      return word;
    }
  });
};

export const compareTwoArrays = (arrA, arrB) => {
  if (arrA.length !== arrB.length) {
    return false;
  }
  for (let i = 0; i < arrA.length; i++) {
    const word = arrA[i];
    if (arrA[i].length !== arrB[i].length) {
      return false;
    }
    for (let j = 0; j < word.length; j++) {
      const letterA = arrA[i][j];
      const letterB = arrB[i][j];
      if (letterA !== letterB) {
        return false;
      }
    }
  }
  return true;
};

export const stringToArrayOfLetters = (string) => {
  return string.split("").filter((letter) => letter !== " ");
};

export const stringToArrayOfWords = (string) => {
  return string.split(" ");
};

export const updateArrayOfObjects = (
  array,
  updatedletter,
  indexOfUpdatedLetter,
  updatedColor
) => {
  return array.map((obj) =>
    obj.index === indexOfUpdatedLetter - 1
      ? { ...obj, value: updatedletter, inputColor: updatedColor }
      : obj
  );
};

export const searchThroughArrayOfObjects = (array, index, property) => {
  return array.find((letterObject) => letterObject.index === index - 1)[
    property
  ];
};
export const updateWordIndexValue = (wordArray, index, value) => {
  const newWordArray = [...wordArray];
  newWordArray[index] = value;
  return newWordArray;
};
