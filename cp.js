import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { FailError } from "./errors.js";

export async function copyFile(initPath, pathToFile, pathToDirectory) {
  const sourcePath = path.resolve(initPath, pathToFile);
  const fileName = path.basename(sourcePath);
  const destinationPath = path.resolve(initPath, pathToDirectory, fileName);

  return new Promise((resolve, reject) => {
    const rs = createReadStream(sourcePath);
    const ws = createWriteStream(destinationPath);

    rs.on("error", () => reject(new FailError()));
    ws.on("error", () => reject(new FailError()));
    ws.on("finish", resolve);

    rs.pipe(ws);
  });
}
