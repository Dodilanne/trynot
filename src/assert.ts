export function assert(obj: unknown, messageOrError?: unknown): asserts obj {
  if (obj) {
    return;
  }
  if (messageOrError instanceof Error) {
    throw messageOrError;
  }
  if (typeof messageOrError === "string") {
    throw new Error(messageOrError);
  }
  throw new Error();
}
