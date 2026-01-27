const fs = require('fs');
const readline = require('readline');

// --- 1. DATA SETUP ---

// Full Rosters
const allRegularWeapons = [
  "Air Strike", "Banana Bomb", "Baseball Bat", "Bungee", "Cluster Bomb",
  "Dynamite", "Dragon Ball", "Fire Punch", "Handgun",
  "Holy Hand Grenade", "Homing Missile",
  "Homing Pigeon", "Mad Cow", "Mail Strike",
  "Napalm Strike", "Ninja Rope",
  "Old Woman", "Parachute", "Petrol Bomb", "Priceless Ming Vase",
  "Sheep", "Shotgun", "Super Sheep", "Teleport", "Uzi"
];

const allSpecialWeapons = [
  "Concrete Donkey", "Cloned Sheep", "Confused Sheep Strike",
  "Pasty's Magic Bullet", "Nuclear Bomb", "MB Bomb",
  "Mike's Carpets Bomb", "Salvation Army", "????????"
];

// Definitions of what counts as an "Air" weapon (to be excluded in Cave mode)
const airRegularExclusions = ["Air Strike", "Mail Strike", "Napalm Strike"];
const airSpecialExclusions = ["Concrete Donkey", "Confused Sheep Strike", "MB Bomb", "Mike's Carpets Bomb"];

// --- 2. INPUT HANDLING ---

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to allow async/await with readline
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log("\n--- WORMS CRATE GENERATOR ---\n");

  // QUESTION 0: Number of Crates
  let numCratesInput = await askQuestion("How many crates do you want to generate? ");
  let numCrates = parseInt(numCratesInput);

  if (isNaN(numCrates) || numCrates <= 0) {
    console.log("Invalid number. Exiting.");
    process.exit(1);
  }

  // QUESTION 1: Map Type
  console.log("\nChoose Map Type:");
  console.log("1 - Open (All weapons allowed)");
  console.log("2 - Cave (No air strikes)");
  let mapType = await askQuestion("Enter 1 or 2: ");

  // QUESTION 2: Super Weapons
  let superWeaponsAns = await askQuestion("\nEnable Super Weapons? (Y/n): ");
  let enableSuper = superWeaponsAns.toLowerCase() !== 'n'; // Default to Yes if not strict 'n'

  // QUESTION 3: Sheep Heaven
  let sheepHeavenAns = await askQuestion("Sheep Heaven Mode? (Y/n): ");
  let sheepHeaven = sheepHeavenAns.toLowerCase() === 'y';

  rl.close(); // Stop listening for input

  // --- 3. FILTERING LOGIC ---

  // Start with full copies of the arrays
  let activeRegular = [...allRegularWeapons];
  let activeSpecial = [...allSpecialWeapons];

  // FILTER A: Cave Mode (Remove Air Weapons)
  if (mapType === '2') {
    activeRegular = activeRegular.filter(w => !airRegularExclusions.includes(w));
    activeSpecial = activeSpecial.filter(w => !airSpecialExclusions.includes(w));
    console.log("-> Mode: Cave (Air weapons removed)");
  } else {
    console.log("-> Mode: Open");
  }

  // FILTER B: Super Weapons (Enable/Disable)
  if (!enableSuper) {
    activeSpecial = []; // Empty the list
    console.log("-> Super Weapons: Disabled");
  } else {
    console.log("-> Super Weapons: Enabled");
  }

  // FILTER C: Sheep Heaven (Keep ONLY sheep items from the remaining list)
  if (sheepHeaven) {
    activeRegular = activeRegular.filter(w => w.toLowerCase().includes("sheep"));
    activeSpecial = activeSpecial.filter(w => w.toLowerCase().includes("sheep"));
    console.log("-> Sheep Heaven: ACTIVATED 🐑");
  }

  // Safety Check: Ensure we didn't filter out EVERYTHING
  if (activeRegular.length === 0) {
    console.error("Error: Your filter choices resulted in 0 available regular weapons!");
    process.exit(1);
  }

  // --- 4. GENERATION LOOP ---

  let lastSpecialIndex = -10;
  let csvContent = "Crate Number,Weapon,Status\n";

  for (let i = 1; i <= numCrates; i++) {
    let weapon = "";
    // Rule 1: 1 in 5 chance for Booby Trap (Probability unchanged)
    let status = Math.random() < 0.2 ? "BOOBY TRAP" : "Safe"; 

    // Rule 3: Special Weapon Eligibility logic
    // We added "activeSpecial.length > 0" to ensure we don't try to pick a special if the array is empty
    const canGetSpecial = i > 5 && (i - lastSpecialIndex) > 2 && activeSpecial.length > 0;

    // Rule 2 & 3: Weapon Selection (1 in 8 chance for special if eligible)
    if (canGetSpecial && Math.random() < 0.125) {
      const randomIndex = Math.floor(Math.random() * activeSpecial.length);
      weapon = activeSpecial[randomIndex];
      lastSpecialIndex = i;
    } else {
      const randomIndex = Math.floor(Math.random() * activeRegular.length);
      weapon = activeRegular[randomIndex];
    }

    csvContent += `${i},"${weapon}","${status}"\n`;
  }

  // --- 5. WRITE FILE ---

  fs.writeFile('crate_drops.csv', csvContent, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("\n--- SUCCESS ---");
      console.log(`Generated ${numCrates} crates in 'crate_drops.csv'`);
    }
  });
}

// Execute
main();