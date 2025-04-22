import { isOk } from "./is-ok";
import { isPromise } from "./lib/is-promise";
import type { Result } from "./result";

export function unwrapOr<T, U>(result: Promise<Result<T>>, or: U): Promise<U extends T ? T : T | U>;
export function unwrapOr<T, U>(result: Result<T>, or: U): U extends T ? T : T | U;
export function unwrapOr<T, U>(
  result: Result<T> | Promise<Result<T>>,
  or: U,
): T | U | Promise<T | U> {
  if (isPromise(result)) {
    return result
      .then((awaited) => {
        if (isOk(awaited)) {
          return awaited;
        }
        return or;
      })
      .catch(() => or);
  }
  if (isOk(result)) {
    return result;
  }
  return or;
}
