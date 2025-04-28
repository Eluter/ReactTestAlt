// Make Path type
export type Path<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${Path<T[K]>}` | `${K & string}`
        : `${K & string}`;
    }[keyof T]
  : never;

// Resolve type at a given path
export type PathValue<
  T,
  P extends string,
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? PathValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export function getValue<T, P extends Path<T>>(
  obj: T,
  path: P,
): PathValue<T, P> {
  const [key, ...rest] = path.split(".") as [keyof T, ...string[]];

  const value = obj[key];

  if (rest.length === 0) {
    return value as PathValue<T, P>;
  }

  // Recursive call
  return getValue(value as string, rest.join(".") as never);
}
