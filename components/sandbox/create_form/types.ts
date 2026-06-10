export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type UpdateFn<T> = <K extends keyof T>(
  key: K,
  value: T[K]
) => void;
