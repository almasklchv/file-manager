import { homedir } from "os";
import { greetUser } from "./greeting.js";
import { changeDirectory } from "./cd.js";
import { InputError } from "./errors.js";
import { listFiles } from "./ls.js";
import { printFileContent } from "./cat.js";
import { addFile } from "./add.js";
import { renameFile } from "./rn.js";

const username = process.argv[2].slice(11);
greetUser(username);

let currentDirectory = homedir();
console.log(`You are currently in ${currentDirectory}`);

process.stdin.setEncoding("utf8");

process.stdin.on("data", async (input) => {
  const trimmedInput = input.trim();
  const inputArgs = trimmedInput.split(" ");

  if (trimmedInput === ".exit") {
    process.stdin.emit("end");
  }

  try {
    if (inputArgs[0] === "up") {
      currentDirectory = await changeDirectory(currentDirectory, "..");
    } else if (inputArgs[0] === "cd") {
      if (inputArgs.length <= 1) {
        throw new InputError();
      }

      currentDirectory = await changeDirectory(currentDirectory, inputArgs[1]);
    } else if (inputArgs[0] === "ls") {
      await listFiles(currentDirectory);
    } else if (inputArgs[0] === "cat") {
      if (inputArgs.length <= 1) {
        throw new InputError();
      }

      await printFileContent(currentDirectory, inputArgs[1]);
    } else if (inputArgs[0] === "add") {
      if (inputArgs.length <= 1) {
        throw new InputError();
      }

      await addFile(currentDirectory, inputArgs[1]);
    } else if (inputArgs[0] === "rn") {
      if (inputArgs.length <= 2) {
        throw new InputError();
      }

      await renameFile(currentDirectory, inputArgs[1], inputArgs[2]);
    } else {
      throw new InputError();
    }
  } catch (e) {
    if (e.name === "InputError") console.log(e.message);
    else if (e.name === "FailError") console.log(e.message);
  }

  process.stdin.resume();
  console.log(`You are currently in ${currentDirectory}`);
});

process.stdin.on("end", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});

process.on("SIGINT", () => {
  process.stdin.emit("end");
});
