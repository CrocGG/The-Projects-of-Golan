const percentageCalculator = (numbah) => {

    const myArray = []
    for (let i = 1; i <= numbah; i++) {
        myArray.push(i)
    }

    const myArrayRatios = myArray.map(partNumber => {
        const percentage = +(partNumber / numbah * 100).toFixed(3)
        const ratioObject = {
            partNumber,
            percentage
        }
        return ratioObject
    })

    return myArrayRatios    
}

console.log(percentageCalculator(process.argv[2]))

