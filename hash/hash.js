import path from "path";
import { createReadStream } from "fs";
import crypto from "crypto";
import { FailError } from "../errors.js";

export async function calculateHash(initPath, pathToFile) {
  const sourcePath = path.resolve(
    pathToFile.startsWith("/") || initPath,
    pathToFile
  );

  const rs = createReadStream(sourcePath);
  let content = "";
  return new Promise((resolve, reject) => {
    rs.on("data", (chunk) => {
      content += chunk;
    });

    rs.on("error", () => reject(new FailError()));

    rs.on("end", () => {
      console.log(getHash(content));
      return resolve();
    });
  });
}

function getHash(content) {
  const hash = crypto.createHash("sha256");
  const data = hash.update(content, "utf-8");
  const genHash = data.digest("hex");
  return genHash;
}
