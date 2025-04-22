import { isOk } from "./is-ok";
import { isPromise } from "./lib/is-promise";
import type { Result } from "./result";

export function unwrapOrElse<T, U>(
  result: Promise<Result<T>>,
  or: (error: unknown) => U,
): Promise<U extends T ? T : T | U>;
export function unwrapOrElse<T, U>(
  result: Result<T>,
  or: (error: unknown) => U,
): U extends T ? T : T | U;
export function unwrapOrElse<T, U>(
  result: Result<T> | Promise<Result<T>>,
  or: (error: unknown) => T | U,
): T | U | Promise<T | U> {
  if (isPromise(result)) {
    return result
      .then((awaited) => {
        if (isOk(awaited)) {
          return awaited;
        }
        return or(awaited);
      })
      .catch((error) => or(error));
  }
  if (isOk(result)) {
    return result;
  }
  return or(result);
}
