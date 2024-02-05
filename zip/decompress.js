import zlib from "zlib";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { FailError } from "../errors.js";

export async function decompress(initPath, pathToZip, destinationPath) {
  pathToZip = path.resolve(
    pathToZip.startsWith("/") ? pathToZip : path.join(initPath, pathToZip)
  );
  const basename = path.basename(pathToZip, ".br");
  destinationPath = path.resolve(
    destinationPath.startsWith("/")
      ? destinationPath
      : path.join(initPath, destinationPath, basename)
  );

  const rs = createReadStream(pathToZip);
  const ws = createWriteStream(destinationPath);
  const brotli = zlib.createBrotliDecompress();

  const stream = rs.pipe(brotli).pipe(ws);

  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", () => reject(new FailError()));
    rs.on("error", () => reject(new FailError()));
    ws.on("error", () => reject(new FailError()));
  });
}
