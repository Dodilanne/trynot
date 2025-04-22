import { hasProperty } from "./has-property";

export function isPromise(obj: unknown): obj is Promise<unknown> {
  return hasProperty(obj, "then");
}
