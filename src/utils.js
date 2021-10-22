const getRandomInt = (n) => {
  return Math.floor(Math.random() * n)
}

const shuffleLetters = (innerLetters) => {
  const shuffledlettersArray = innerLetters.split('')
  let lengthOfLetters = shuffledlettersArray.length

  for (let i = 0; i < shuffledlettersArray.length - 1; i++) {
    let randomInt = getRandomInt(lengthOfLetters)
    const temp = shuffledlettersArray[i]

    shuffledlettersArray[i] = shuffledlettersArray[randomInt]
    shuffledlettersArray[randomInt] = temp
  }

  return shuffledlettersArray.join('')
}

export const compareTwoArrays = (arrA, arrB) => {
  for (let i = 0; i < arrA.length; i++) {
    if(arrA[i] !== arrB[i]) return false
  }
  return true
}

export const stringToArrayOfLetters = (string) => {
  return string.split('').filter(letter => letter !== ' ')
}

export const stringToArrayOfWords = ( string ) => {
  return string.split(' ')
}

export const shuffleSentence = ( arrayOfWords ) => { 
  return arrayOfWords.map(word => {
    if(word.length > 3){
      const innerLetters = word.slice(1, word.length - 1)
      return word[0] + shuffleLetters(innerLetters) + word[word.length - 1] 
    }else{
      return word
    }
  });
}

export const updateArrayOfObjects = ( array, updatedletter, indexOfUpdatedLetter, updatedColor ) => {
  return array.map( obj => (obj.index === indexOfUpdatedLetter - 1 
                          ? { ...obj, value: updatedletter, inputColor: updatedColor } : obj))
} 

export const searchThroughArrayOfObjects = (array, index, property) => {
  return array.find(letterObject => letterObject.index === index - 1)[property]
}