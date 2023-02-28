// 객체에서 필드를 제외시켜줌
export const exclude = <T, Key extends keyof T>(
  obj: T,
  keys: Key[]
): Omit<T, Key> => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};
