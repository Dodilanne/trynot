export class TestClass {}

export class TestError extends Error {
  constructor(message: string) {
    super(`EXTENDED: ${message}`);
  }
}

export const results = ["error", -1, { a: "b" }, new Proxy({}, {}), false, undefined, null];
export const errors = [new Error(), new Error("withMsg"), new TestError("msg")];
