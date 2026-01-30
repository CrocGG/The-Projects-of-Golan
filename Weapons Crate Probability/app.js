const fs = require('fs');
const readline = require('readline');

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


  let lastSpecialIndex = -10;
  
  const generatedCrates = []; 
  const weaponTally = {}; 

  for (let i = 1; i <= numCrates; i++) {
    let weapon = "";
    let weaponType = ""; 

    let status = Math.random() < 0.2 ? "BOOBY TRAP" : "Safe"; 

    const canGetSpecial = i > 5 && (i - lastSpecialIndex) > 2 && activeSpecial.length > 0;

    if (canGetSpecial && Math.random() < 0.125) {
      const randomIndex = Math.floor(Math.random() * activeSpecial.length);
      weapon = activeSpecial[randomIndex];
      weaponType = "Special"; 
      lastSpecialIndex = i;
    } else {
      const randomIndex = Math.floor(Math.random() * activeRegular.length);
      weapon = activeRegular[randomIndex];
      weaponType = "Regular"; 
    }

    if (weaponTally[weapon]) {
      weaponTally[weapon]++;
    } else {
      weaponTally[weapon] = 1;
    }

    generatedCrates.push({
      id: i,
      weapon: weapon,
      type: weaponType,
      status: status
    });
  }


  let csvContent = "Crate Number,Weapon,Weapon Type,Status,Total Occurrences\n";

  generatedCrates.forEach(crate => {
    const finalCount = weaponTally[crate.weapon];
    
    csvContent += `${crate.id},"${crate.weapon}","${crate.type}","${crate.status}",${finalCount}\n`;
  });


  fs.writeFile('crate_drops.csv', csvContent, (err) => {
    if (err) {
      console.error("Error writing CSV file:", err);
    } else {
      console.log("\n--- SUCCESS ---");
      console.log(`Generated ${numCrates} crates in 'crate_drops.csv'`);
      
      console.log("\n--- DROP SUMMARY ---");
      const summaryArray = Object.entries(weaponTally)
        .map(([name, count]) => ({ Weapon: name, Count: count }))
        .sort((a, b) => b.Count - a.Count); 
        
      console.table(summaryArray);
    }
  });
}

main();