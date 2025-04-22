import type { Result } from "./result";
import { unwrapOr } from "./unwrap-or";

export function unwrapOrUndefined<T>(result: Promise<Result<T>>): Promise<T | undefined>;
export function unwrapOrUndefined<T>(result: Result<T>): T | undefined;
export function unwrapOrUndefined<T>(
  result: Result<T> | Promise<Result<T>>,
): T | undefined | Promise<T | undefined> {
  // biome-ignore lint/suspicious/noExplicitAny:
  return unwrapOr(result, undefined) as any;
}
