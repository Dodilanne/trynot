import { isPromise } from "./lib/is-promise";
import { parseError } from "./parse-error";
import type { Result } from "./result";

export function wrap<T>(promise: Promise<T>): Promise<Result<T>>;
export function wrap<T, A extends readonly unknown[]>(
  fn: (...args: A) => T | Promise<T>,
): (...args: A) => Result<T> | Promise<Result<T>>;
export function wrap<T, A extends readonly unknown[]>(
  input: Promise<T> | ((...args: A) => T | Promise<T>),
): Promise<Result<T>> | ((...args: A) => Result<T> | Promise<Result<T>>) {
  if (isPromise(input)) {
    return input.catch(parseError);
  }
  return (...args: A) => {
    try {
      const res = input(...args);
      if (isPromise(res)) {
        return res.catch(parseError);
      }
      return res;
    } catch (error) {
      return parseError(error);
    }
  };
}
