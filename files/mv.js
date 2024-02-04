import { createWriteStream, createReadStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { FailError } from "../errors.js";

export async function moveFile(initPath, pathToFile, pathToDirectory) {
  const sourcePath = path.resolve(
    pathToFile.startsWith("/") || initPath,
    pathToFile
  );
  const fileName = path.basename(sourcePath);
  const destinationPath = path.resolve(
    pathToDirectory.startsWith("/") || initPath,
    pathToDirectory,
    fileName
  );

  return new Promise((resolve, reject) => {
    const rs = createReadStream(sourcePath);
    const ws = createWriteStream(destinationPath);

    rs.on("error", () => reject(new FailError()));
    ws.on("error", () => reject(new FailError()));
    ws.on("finish", () => {
      fs.rm(sourcePath);
      return resolve();
    });

    rs.pipe(ws);
  });
}
