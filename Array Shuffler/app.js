// Function: Generates a random array of 'count' length from 'sourceArray'
const generateRandomSequence = (sourceArray, count) => {
    const result = [];

    // Loop exactly 'count' times
    for (let i = 0; i < count; i++) {
        // Pick a random index based on the source array length
        const randomIndex = Math.floor(Math.random() * sourceArray.length);
        
        // Add the item found at that index to our result
        result.push(sourceArray[randomIndex]);
    }

    return result;
}

// --- Setup ---

// 1. Your generic source array
const myArray = ["Blue","Red"];

// 2. Get the number from the terminal input (process.argv[2])
// We use parseInt() because command line arguments are strings by default
const userCount = parseInt(process.argv[2]);

// --- Execution & Safety Checks ---

if (!userCount || isNaN(userCount)) {
    console.log("Please provide a valid number. Usage: node script.js <number>");
} else {
    const randomArray = generateRandomSequence(myArray, userCount);
    console.log(randomArray);
}