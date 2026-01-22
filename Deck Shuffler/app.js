const deckShuffler = (numbah) => {
    const deckArray = []
    for (i = 1; i<=numbah; i++) {
        deckArray.push(i)
    }

    const shuffledDeck = []
    for (i = 1; i<=numbah; i++) {
        randomalIndex = Math.floor(Math.random() * deckArray.length);
        shuffledDeck.push(deckArray[randomalIndex]);
        deckArray.splice(randomalIndex,1)
    }

    return shuffledDeck
}

console.log(deckShuffler(process.argv[2]))