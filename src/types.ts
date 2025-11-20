export type Ok<R> = Exclude<R, Error>;
export type Err<R> = Extract<R, Error>;
