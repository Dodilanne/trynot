# trynot

Brings Rust-like results to TypeScript.

## Installation

```bash
npm install trynot
```

## Core Concept

Instead of throwing exceptions, functions return `Result<T, E>` - a union type that's either the value `T` or an `Error` instance.
Results are not wrapped in objects; they are the raw value on success or an Error on failure.

```typescript
type Result<T, E extends Error = Error> = T | E;
```

## Why trynot?

- **Type-safe error handling** - TypeScript knows exactly which errors your functions can return
- **No try/catch boilerplate** - Handle errors inline with simple conditionals
- **Zero overhead** - No wrapper objects or classes, just your value or an Error
- **Explicit failure** - Functions that can fail make it obvious in their return type
- **Better composition** - Chain operations without nested try/catch blocks

## Usage

### Wrap promises

```typescript
import { wrap, isOk } from 'trynot';

const result = await wrap(fetch('/api/users'));

if (isOk(result)) {
  console.log(result); // Response
} else {
  console.error(result.message); // Error message
}
```

### Wrap functions

```typescript
import { wrap, isErr } from 'trynot';

const safeJSON = wrap(JSON.parse);

const result = safeJSON('invalid json');

if (isErr(result)) {
  console.error('Parse failed:', result.message);
}
```

### Unwrap with defaults

```typescript
import { wrap, unwrapOr } from 'trynot';

const result = await wrap(fetch('/api/config'));
const config = unwrapOr(result, { theme: 'dark' });
```

### Unwrap or throw

```typescript
import { wrap, unwrap } from 'trynot';

const result = await wrap(fetch('/api/users'));
const response = unwrap(result); // Throws if result is an error
```

### Custom error types

Type your functions to specify exactly which errors they can return.

```typescript
import type { Result } from 'trynot';

class ValidationError extends Error {
  constructor(public field: string) {
    super(`Invalid field: ${field}`);
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function createUser(name: string): Result<User, ValidationError | DatabaseError> {
  if (!name) {
    return new ValidationError('name');
  }

  try {
    const user = db.insert({ name });
    return user;
  } catch (e) {
    return new DatabaseError('Failed to create user');
  }
}

const result = createUser('Alice');

if (result instanceof ValidationError) {
  console.error('Validation failed:', result.field);
} else if (result instanceof DatabaseError) {
  console.error('Database error:', result.message);
} else {
  // All error types have been handled. 
  // TypeScript now knows that result is a User!
  console.log('User created:', result.id);
}
```

## API

### Result

The core type representing either a successful value or an error.

```typescript
type Result<T, E extends Error = Error> = T | E;
```

A `Result<T, E>` is simply `T | E` - either the success value of type `T` or an error of type `E`. By default, `E` is `Error`, but you can specify custom error types to make your error handling more precise.

### wrap

Wraps a promise or function to return a Result instead of throwing.

```typescript
wrap<T>(promise: Promise<T>): Promise<Result<T>>
wrap<T>(fn: (...args) => T): (...args) => Result<T>
```

### unwrap

Extracts the value or throws the error.

```typescript
unwrap<T>(result: Result<T>): T
```

### unwrapOr

Extracts the value or returns a default.

```typescript
unwrapOr<T>(result: Result<T>, defaultValue: T): T
```

### unwrapOrElse

Extracts the value or returns the result of a function.

```typescript
unwrapOrElse<T>(result: Result<T>, fn: (error: Error) => T): T
```

### unwrapOrUndefined

Extracts the value or returns undefined.

```typescript
unwrapOrUndefined<T>(result: Result<T>): T | undefined
```

### isOk

Type guard to check if result is successful.

```typescript
isOk<T>(result: Result<T>): result is T
```

### isErr

Type guard to check if result is an error.

```typescript
isErr<T>(result: Result<T>): result is Error
```

### assert

Assertion function that throws if condition is falsy.

```typescript
assert(condition: unknown, message?: string | Error): asserts condition
```

### getFailureReason

Extracts error message from a Result.

```typescript
getFailureReason<T>(result: Result<T>): string | undefined
```

### parseError

Converts any thrown value into an Error instance.

```typescript
parseError(error: unknown): Error
```

## License

MIT
