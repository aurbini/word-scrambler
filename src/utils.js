const getRandomInt = (n) => {
  return Math.floor(Math.random() * n)
}

export const shuffleLetters = (innerLetters) => {
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