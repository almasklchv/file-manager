import path from "path";
import fs from "fs/promises";
import { FailError } from "../errors.js";

export async function removeFile(init, fileName) {
  const sourcePath = path.resolve(fileName.startsWith('/') || init, fileName);

  await fs.rm(sourcePath).catch(() => {
    throw new FailError();
  });
}
