import { expect, test, vi } from "vitest";
import { wrap } from "./wrap";

test("rejecting promise", async () => {
  const errorMsg = "ERROR";
  const promise = Promise.reject<boolean>(errorMsg);
  const res = await wrap(promise);
  expect(res).toStrictEqual(new Error(errorMsg));
});

test("resolving promise", async () => {
  const obj = { a: true };
  const promise = Promise.resolve(obj);
  const res = await wrap(promise);
  expect(res).toBe(obj);
});

test("erroring sync function", async () => {
  const args = ["a", true] as const;
  const errorMsg = "ERROR";
  const fn = vi.fn((_a: string, _b: boolean) => {
    throw errorMsg;
  });
  const safeFn = wrap(fn);
  const res = safeFn(...args);
  expect(res).toStrictEqual(new Error(errorMsg));
  expect(fn).toHaveBeenCalledExactlyOnceWith(...args);
  expect(fn).not.toHaveReturned();
});

test("returning sync function", async () => {
  const args = ["a", true] as const;
  const obj = { a: true };
  const fn = vi.fn((_a: string, _b: boolean) => {
    return obj;
  });
  const safeFn = wrap(fn);
  const res = safeFn(...args);
  expect(res).toBe(obj);
  expect(fn).toHaveBeenCalledExactlyOnceWith(...args);
  expect(fn).toHaveReturned();
});

test("erroring async function", async () => {
  const args = ["a", true] as const;
  const errorMsg = "ERROR";
  const fn = vi.fn(async (_a: string, _b: boolean) => {
    throw errorMsg;
  });
  const safeFn = wrap(fn);
  const res = await safeFn(...args);
  expect(res).toStrictEqual(new Error(errorMsg));
  expect(fn).toHaveBeenCalledExactlyOnceWith(...args);
  expect(fn).not.toHaveResolved();
});

test("returning async function", async () => {
  const args = ["a", true] as const;
  const obj = { a: true };
  const fn = vi.fn(async (_a: string, _b: boolean) => {
    return obj;
  });
  const safeFn = wrap(fn);
  const res = await safeFn(...args);
  expect(res).toBe(obj);
  expect(fn).toHaveBeenCalledExactlyOnceWith(...args);
  expect(fn).toHaveResolvedWith(obj);
});
