import fs from "fs/promises";
import path from "path";
import { FailError } from "./errors.js";

export async function renameFile(initPath, oldFileName, fileName) {
  const pathToFile = path.resolve(initPath, oldFileName);
  const pathToNewFileName = path.resolve(initPath, fileName);
  await fs.rename(pathToFile, pathToNewFileName).catch(() => {
    throw new FailError();
  });
}
