import zlib from "zlib";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { FailError } from "../errors.js";

export async function compress(initPath, pathToFile, destinationPath) {
  pathToFile = path.resolve(pathToFile.startsWith("/") || initPath, pathToFile);
  const basename = path.basename(pathToFile);
  console.log(basename);
  destinationPath = path.resolve(
    destinationPath.startsWith("/") || initPath,
    destinationPath,
    basename + ".br"
  );
  console.log(destinationPath);
  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(destinationPath);

  const brotli = zlib.createBrotliCompress();

  const stream = rs.pipe(brotli).pipe(ws);

  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", () => reject(new FailError()));
    rs.on("error", () => reject(new FailError()));
    ws.on("error", () => reject(new FailError()));
  });
}
