import { arch } from "os";

export function getArch() {
  console.log(arch());
}
