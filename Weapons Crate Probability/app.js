const fs = require('fs');

const regularWeapons = [
  "Air Strike", "Banana Bomb", "Baseball Bat", "Bungee", "Cluster Bomb",
  "Dynamite", "Dragon Ball", "Fire Punch", "Handgun",
  "Holy Hand Grenade", "Homing Missile",
  "Homing Pigeon", "Mad Cow", "Mail Strike",
  "Napalm Strike", "Ninja Rope",
  "Old Woman", "Parachute", "Petrol Bomb", "Priceless Ming Vase",
  "Sheep", "Shotgun", "Super Sheep", "Teleport", "Uzi"
];

const specialWeapons = [
  "Concrete Donkey", "Cloned Sheep", "Confused Sheep Strike",
  "Pasty's Magic Bullet", "Nuclear Bomb", "MB Bomb",
  "Mike's Carpets Bomb", "Salvation Army", "????????"
];

const numCrates = parseInt(process.argv[2]);

if (isNaN(numCrates) || numCrates <= 0) {
  console.log("Usage: node app.js <number_of_crates>");
  process.exit(1);
}

let lastSpecialIndex = -10;
// Updated CSV headers for the new column
let csvContent = "Crate Number,Weapon,Status\n";

for (let i = 1; i <= numCrates; i++) {
  let weapon = "";
  let status = Math.random() < 0.2 ? "BOOBY TRAP" : "Safe"; // Rule 1: 1 in 5 chance

  // Rule 3: Special Weapon Eligibility
  const canGetSpecial = i > 5 && (i - lastSpecialIndex) > 2;

  // Rule 2 & 3: Weapon Selection (1 in 8 chance for special if eligible)
  if (canGetSpecial && Math.random() < 0.125) {
    const randomIndex = Math.floor(Math.random() * specialWeapons.length);
    weapon = specialWeapons[randomIndex];
    lastSpecialIndex = i;
  } else {
    const randomIndex = Math.floor(Math.random() * regularWeapons.length);
    weapon = regularWeapons[randomIndex];
  }

  // Append to CSV: Crate #, "Weapon Name", Status
  csvContent += `${i},"${weapon}","${status}"\n`;
}

fs.writeFile('crate_drops.csv', csvContent, (err) => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("--- SUCCESS ---");
    console.log(`Generated ${numCrates} crates with contents and status in 'crate_drops.csv'`);
  }
});

