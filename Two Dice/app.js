const dieOne = [-3, -2, -1, 1, 2, 3]

const dieTwo = [-2, -1, 0, 0, 1, 2]

const randomDieOne = () => {

    const randomizedNumber = Math.floor(Math.random() * 6)

    return dieOne[randomizedNumber]
}

const randomDieTwo = () => {

    const randomizedNumber = Math.floor(Math.random() * 6)

    return dieTwo[randomizedNumber]
}

const generatedInjection = (num1, num2) => {
    const newInjection = `
    <p>Roll #1: <span id = "roll-result">${num1}</span></p>
    <p>Roll #2: <span id = "roll-result">${num2}</span></p>
    `;

    return newInjection
};

const inject = (injection) => {
    document.getElementById("dice-results").innerHTML = injection;
};

const tossDice = () => {
    const num1 = randomDieOne();
    const num2 = randomDieTwo();
    const newInjection = generatedInjection(num1, num2);
    inject(newInjection);
};










