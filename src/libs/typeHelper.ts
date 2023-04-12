export type ArrayElement<T extends readonly unknown[]> =
  T extends readonly (infer R)[] ? R : never;
