import fs from "fs/promises";
import path from "path";
import { FailError } from "./errors.js";

export async function renameFile(initPath, oldFileName, fileName) {
  const pathToFile = path.resolve(oldFileName.startsWith('/') || initPath, oldFileName);
  const pathToNewFileName = path.resolve(fileName.startsWith('/') || initPath, fileName);
  await fs.rename(pathToFile, pathToNewFileName).catch(() => {
    throw new FailError();
  });
}
