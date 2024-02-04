import fs from "fs/promises";
import path from "path";
import { FailError } from "./errors.js";

export async function addFile(directory, fileName) {
  const pathToFile = path.resolve(directory, fileName);

  await fs.appendFile(pathToFile, "").catch(() => {
    throw new FailError();
  });
}
