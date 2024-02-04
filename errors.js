export class InputError extends Error {
  constructor() {
    super("Invalid input");
    this.name = "InputError";
  }
}

export class FailError extends Error {
  constructor() {
    super("Operation failed");
    this.name = "FailError";
  }
}
