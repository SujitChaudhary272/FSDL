const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a string: ", (inputString) => {
  const reversedString = inputString.split("").reverse().join("");
  const uppercaseString = inputString.toUpperCase();
  const lowercaseString = inputString.toLowerCase();
  const stringLength = inputString.length;

  console.log("\nResults:");
  console.log("Reversed string:", reversedString);
  console.log("Uppercase string:", uppercaseString);
  console.log("Lowercase string:", lowercaseString);
  console.log("Length of string:", stringLength);

  rl.close();
});
