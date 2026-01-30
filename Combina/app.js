const readline = require('readline');
const { combinations } = require('mathjs');
const Fraction = require('fraction.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const validate = (n1, k1, n2, k2) => {
    if ([n1, k1, n2, k2].some(val => val < 0 || !Number.isInteger(val))) {
        throw new Error("All inputs must be non-negative integers.");
    }
    if (k1 > n1) throw new Error(`Impossible: You cannot pick ${k1} items from a group of ${n1}.`);
    if (k2 > n2) throw new Error(`Impossible: You cannot pick ${k2} items from a group of ${n2}.`);
};


const calculateProbability = (n1, k1, n2, k2) => {
    try {
        validate(n1, k1, n2, k2);

        const totalPop = n1 + n2;
        const totalSample = k1 + k2;

        const waysToPickFirst = combinations(n1, k1);
        const waysToPickSecond = combinations(n2, k2);
        const totalWays = combinations(totalPop, totalSample);

        const prob = (waysToPickFirst * waysToPickSecond) / totalWays;

        const percentage = (prob * 100).toFixed(4) + '%';
        const fraction = new Fraction(prob).toFraction();
        
        const oneInX = (1 / prob).toFixed(2);

        return {
            percentage,
            fraction,
            oneInX,
            summary: `Chance of picking ${k1} from Group A and ${k2} from Group B.`
        };

    } catch (error) {
        return { error: error.message };
    }
};

const ask = (query) => new Promise(resolve => rl.question(query, resolve));

const main = async () => {
    console.log(`
    ==========================================
       HYPERGEOMETRIC PROBABILITY CALCULATOR
    ==========================================
    Calculates the odds of obtaining specific items
    from two distinct groups without replacement.
    `);

    try {
        const n1 = parseInt(await ask("1. Total items in Group A (Target group): "));
        const k1 = parseInt(await ask("   -> How many do you want to pick from A?: "));
        
        const n2 = parseInt(await ask("\n2. Total items in Group B (Others): "));
        const k2 = parseInt(await ask("   -> How many do you want to pick from B?: "));

        console.log("\n---------------- CALCULATION ----------------");

        const result = calculateProbability(n1, k1, n2, k2);

        if (result.error) {
            console.error(`\u001b[31m[ERROR]\u001b[0m ${result.error}`);
        } else {
            console.log(`\u001b[32m[SUCCESS]\u001b[0m ${result.summary}`);
            console.log(`\nProbability:   ${result.percentage}`);
            console.log(`Fraction:      ${result.fraction}`);
            console.log(`Odds:          1 in ${result.oneInX}`);
        }

    } catch (e) {
        console.error("Invalid input.");
    } finally {
        console.log("---------------------------------------------");
        rl.close();
    }
};

main();