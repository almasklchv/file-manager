import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import { FailError, InputError } from "../errors.js";

export async function printFileContent(init, fileName) {
  let pathTo = ''
  if (fileName.startsWith('/')) {
    pathTo = path.resolve(fileName);
  } else {
    pathTo = path.resolve(init, fileName);
  }
  
  const stat = await fs.stat(pathTo).catch(() => {
    throw new InputError();
  });

  if (!stat.isFile()) throw new FailError();

  const stream = createReadStream(pathTo);
  stream.pipe(process.stdout);

  stream.on("end", () =>
    console.log(`\nYou are currently in ${init}`)
  );
}
