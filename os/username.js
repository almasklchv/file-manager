import { userInfo } from "os";

export function getSystemUsername() {
  console.log(userInfo().username);
}
