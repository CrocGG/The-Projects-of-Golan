const generateRandomSequence = (sourceArray, count) => {
    const result = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * sourceArray.length);

        result.push(sourceArray[randomIndex]);
    }

    return result;
}

//const myArray = ["Apple", "Cherry", "Banana", "Strawberry", "Mango", "Pineapple", "Orange", "Kiwi"];
const myArray = ['R','L']

const userCount = parseInt(process.argv[2]);

if (!userCount || isNaN(userCount)) {
    console.log("Please provide a valid number. Usage: node script.js <number>");
} else {
    const randomArray = generateRandomSequence(myArray, userCount);
    console.log(randomArray);
}