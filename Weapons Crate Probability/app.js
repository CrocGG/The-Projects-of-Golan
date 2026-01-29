const fs = require('fs');
const readline = require('readline');

// --- 1. DATA SETUP ---

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

const airRegularExclusions = ["Air Strike", "Mail Strike", "Napalm Strike"];
const airSpecialExclusions = ["Concrete Donkey", "Confused Sheep Strike", "MB Bomb", "Mike's Carpets Bomb"];

// --- 2. INPUT HANDLING ---

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log("\n--- WORMS CRATE GENERATOR (Enhanced) ---\n");

  let numCratesInput = await askQuestion("How many crates do you want to generate? ");
  let numCrates = parseInt(numCratesInput);

  if (isNaN(numCrates) || numCrates <= 0) {
    console.log("Invalid number. Exiting.");
    process.exit(1);
  }

  console.log("\nChoose Configuration:");
  console.log("0 - Default (Open Map, Super Weapons ON, Normal Mode)"); 
  console.log("1 - Custom Open (All weapons allowed)");
  console.log("2 - Custom Cave (No air strikes)");
  
  let userChoice = await askQuestion("Enter 0, 1 or 2: ");

  let mapType, enableSuper, sheepHeaven;

  if (userChoice === '0') {
    mapType = '1';       
    enableSuper = true;  
    sheepHeaven = false; 
  } else {
    mapType = userChoice;
    let superWeaponsAns = await askQuestion("\nEnable Super Weapons? (Y/n): ");
    enableSuper = superWeaponsAns.toLowerCase() !== 'n'; 
    let sheepHeavenAns = await askQuestion("Sheep Heaven Mode? (Y/n): ");
    sheepHeaven = sheepHeavenAns.toLowerCase() === 'y';
  }

  rl.close();

  // --- 3. FILTERING LOGIC ---

  let activeRegular = [...allRegularWeapons];
  let activeSpecial = [...allSpecialWeapons];

  if (mapType === '2') {
    activeRegular = activeRegular.filter(w => !airRegularExclusions.includes(w));
    activeSpecial = activeSpecial.filter(w => !airSpecialExclusions.includes(w));
    console.log("-> Mode: Cave (Air weapons removed)");
  } else {
    console.log("-> Mode: Open");
  }

  if (!enableSuper) {
    activeSpecial = [];
    console.log("-> Super Weapons: Disabled");
  } else {
    console.log("-> Super Weapons: Enabled");
  }

  if (sheepHeaven) {
    activeRegular = activeRegular.filter(w => w.toLowerCase().includes("sheep"));
    activeSpecial = activeSpecial.filter(w => w.toLowerCase().includes("sheep"));
    console.log("-> Sheep Heaven: ACTIVATED 🐑");
  }

  if (activeRegular.length === 0) {
    console.error("Error: Your filter choices resulted in 0 available regular weapons!");
    process.exit(1);
  }

  // --- 4. GENERATION LOOP (PASS 1: Generate & Tally) ---

  let lastSpecialIndex = -10;
  
  // Storage for our generated items
  const generatedCrates = []; 
  // Object to keep track of how many times each weapon appears
  const weaponTally = {}; 

  for (let i = 1; i <= numCrates; i++) {
    let weapon = "";
    let weaponType = ""; // New variable to track Type

    let status = Math.random() < 0.2 ? "BOOBY TRAP" : "Safe"; 

    const canGetSpecial = i > 5 && (i - lastSpecialIndex) > 2 && activeSpecial.length > 0;

    // Selection Logic
    if (canGetSpecial && Math.random() < 0.125) {
      // SPECIAL WEAPON CHOSEN
      const randomIndex = Math.floor(Math.random() * activeSpecial.length);
      weapon = activeSpecial[randomIndex];
      weaponType = "Special"; // Mark as Special
      lastSpecialIndex = i;
    } else {
      // REGULAR WEAPON CHOSEN
      const randomIndex = Math.floor(Math.random() * activeRegular.length);
      weapon = activeRegular[randomIndex];
      weaponType = "Regular"; // Mark as Regular
    }

    // Update Tally
    if (weaponTally[weapon]) {
      weaponTally[weapon]++;
    } else {
      weaponTally[weapon] = 1;
    }

    // Store data for the next step
    generatedCrates.push({
      id: i,
      weapon: weapon,
      type: weaponType,
      status: status
    });
  }

  // --- 5. CSV CONSTRUCTION (PASS 2: Format & Write) ---

  // Header now includes the two new columns
  let csvContent = "Crate Number,Weapon,Weapon Type,Status,Total Occurrences\n";

  generatedCrates.forEach(crate => {
    // Look up the final count from our tally
    const finalCount = weaponTally[crate.weapon];
    
    csvContent += `${crate.id},"${crate.weapon}","${crate.type}","${crate.status}",${finalCount}\n`;
  });

  // --- 6. WRITE FILE & SUMMARY ---

  fs.writeFile('crate_drops.csv', csvContent, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("\n--- SUCCESS ---");
      console.log(`Generated ${numCrates} crates in 'crate_drops.csv'`);
      
      // Bonus: Display a summary in the console
      console.log("\n--- DROP SUMMARY ---");
      // Convert tally object to array for sorting
      const summaryArray = Object.entries(weaponTally)
        .map(([name, count]) => ({ Weapon: name, Count: count }))
        .sort((a, b) => b.Count - a.Count); // Sort by most frequent
        
      console.table(summaryArray);
    }
  });
}

main();