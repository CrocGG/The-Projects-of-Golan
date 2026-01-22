const quickPick = [...Array(45).keys()]
  .map(i => i + 1)
  .sort(() => Math.random() - 0.5)
  .slice(0, 6);

console.log(quickPick);