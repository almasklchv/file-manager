import path from "path";
import { access, stat } from "fs/promises";
import { InputError } from "./errors.js";

export async function changeDirectory(init, dest) {
  const destDir = path.resolve(init, dest);

  await access(destDir).catch(() => {
    throw new InputError();
  });

  if ((!(await stat(destDir))).isDirectory()) throw new InputError();
  return destDir;
}
