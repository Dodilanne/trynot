import type { Result } from "./result";

export function isErr<T, E extends Error>(result: Result<T, E>): result is E {
  return result instanceof Error;
}
