// In the bash type this command : node app.js *number to be years to be calculated* *initial fund* *overall amount to be paid*

const percentageCalculator = (yearNumber, initialFund, dueAmount) => {

    const quotient = dueAmount / initialFund;
    const moneyPaidPerYear = dueAmount / yearNumber;
    const interestNormalized = Math.pow(quotient, 1 / yearNumber);
    const yearlyGiftToBank = (dueAmount - initialFund) / yearNumber;

    console.log(`Compound interst is ${((interestNormalized - 1) * 100).toFixed(4)} percents`);
    console.log(`Money paid per year is ${moneyPaidPerYear} NIS`);
    console.log(`Money paid per month is ${moneyPaidPerYear / 12} NIS`);
    console.log(`Yearly gift to bank is ${yearlyGiftToBank.toFixed(4)} NIS`);
    console.log(`Monthly gift to bank is ${(yearlyGiftToBank / 12).toFixed(4)} NIS`);

    const paymentLeftArray = [dueAmount]
    for (let i = 1; i <= yearNumber; i++) {
        const difference = paymentLeftArray[i - 1] - moneyPaidPerYear
        paymentLeftArray.push(difference)
    }

    const myArrayPayment = []

    paymentLeftArray.forEach((element, index) => {
        myArrayPayment.push({
            year: index,
            paymentLeftAtYearEnd: element
        }
        )
    })

    return myArrayPayment
}

console.log(percentageCalculator(+process.argv[2], +process.argv[3], +process.argv[4]))

