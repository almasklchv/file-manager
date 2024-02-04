import path from "path";
import { access, stat } from "fs/promises";
import { FailError, InputError } from "./errors.js";

export async function changeDirectory(init, dest) {
  const destDir = path.resolve(init, dest);

  await access(destDir).catch(() => {
    throw new InputError();
  });

  const destStat = await stat(destDir);

  if (!destStat.isDirectory()) throw new FailError();
  return destDir;
}
