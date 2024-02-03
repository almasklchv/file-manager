import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const username = process.argv[2].slice(11);

const rl = readline.createInterface({ input, output });

console.log(`Welcome to the File Manager, ${username}!`);

rl.on("close", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);

while (true) {
  const answer = await rl.question("");
  if (answer === ".exit") {
    rl.close();
    break;
  }
}
