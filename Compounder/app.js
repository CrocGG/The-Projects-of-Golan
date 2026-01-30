const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log("--- Compound Interest CSV Generator (Fixed Initial, Variable Rates) ---");

  try {
    const yearsInput = await askQuestion("Enter number of years: ");
    const initialNumInput = await askQuestion("Enter the initial number (Global): ");
    const paramsInput = await askQuestion("Enter number of parameters (how many interest rates): ");

    const years = parseInt(yearsInput);
    const initialNumber = parseFloat(initialNumInput);
    const numParams = parseInt(paramsInput);

    if (isNaN(years) || isNaN(initialNumber) || isNaN(numParams)) {
      throw new Error("Invalid input. Please enter valid numbers.");
    }

    const interestRates = [];
    console.log(`\nPlease enter the Compound Interest (%) for the ${numParams} parameters:`);

    for (let i = 0; i < numParams; i++) {
      const rateInput = await askQuestion(`- Compound Interest for parameter #${i + 1}: `);
      const rate = parseFloat(rateInput);
      
      if (isNaN(rate)) {
        console.log("Invalid number, skipping this entry.");
        i--; 
        continue;
      }
      interestRates.push(rate);
    }

    
    const rows = [];

    for (let y = 0; y <= years; y++) {
      const yearRow = {
        year: y,
        values: []
      };


      interestRates.forEach(rate => {
        const factor = (rate / 100) + 1;
        const gathered = initialNumber * Math.pow(factor, y);
        yearRow.values.push(gathered.toFixed(2));
      });

      rows.push(yearRow);
    }

    let csvContent = "number of years";
    interestRates.forEach((rate) => {
      csvContent += `,money gathered (Interest ${rate}%)`;
    });
    csvContent += "\n";

    rows.forEach(row => {
      csvContent += `${row.year},${row.values.join(',')}\n`;
    });

    const fileName = 'compound_interest_variable_rates.csv';
    fs.writeFileSync(fileName, csvContent, 'utf8');

    console.log(`\nSuccess! Data exported to: ${fileName}`);
    console.log("-----------------------------------------");
    
  } catch (error) {
    console.error("\nAn error occurred:", error.message);
  } finally {
    rl.close();
  }
}

main();