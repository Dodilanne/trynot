export function hasProperty<P extends string>(
  obj: unknown,
  property: P,
): obj is { [K in P]: unknown } {
  return typeof obj === "object" && obj !== null && property in obj;
}
