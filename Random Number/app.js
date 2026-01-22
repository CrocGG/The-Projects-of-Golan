// Enter on the bash node app.js *low limit* *high limit* 

const randomNumber = (lowLimit, highLimit) => {

    const randomizedNumber = Math.floor((Math.random() * (highLimit - lowLimit + 1)) + lowLimit)

    return randomizedNumber
}

console.log(randomNumber(+process.argv[2],+process.argv[3]))