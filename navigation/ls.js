import fs from "fs/promises";
import path from "path";
import { FailError } from "../errors.js";

export async function listFiles(pathTo) {
  try {
    const files = [];
    const fileNames = await fs.readdir(path.resolve(pathTo));

    await Promise.all(
      fileNames.map(async (fileName) => {
        const fileStat = await fs.stat(path.resolve(pathTo, fileName));
        files.push({
          Name: fileName,
          Type: fileStat.isDirectory() ? "directory" : "file",
        });
      })
    );

    console.table(files);
  } catch {
    throw new FailError();
  }
}
