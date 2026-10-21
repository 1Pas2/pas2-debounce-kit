export interface Debounced<A extends unknown[]> {
  (...args: A): void;
  cancel(): void;
  flush(): void;
  pending(): boolean;
}
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  waitMs: number,
): Debounced<A> {
  if (!Number.isFinite(waitMs) || waitMs < 0 || waitMs > 2147483647)
    throw new RangeError("Invalid wait");
  let timer: ReturnType<typeof setTimeout> | undefined, args: A | undefined;
  function invoke(): void {
    timer = undefined;
    const latest = args;
    args = undefined;
    if (latest) fn(...latest);
  }
  const wrapped = ((...values: A) => {
    args = values;
    clearTimeout(timer);
    timer = setTimeout(invoke, waitMs);
  }) as Debounced<A>;
  wrapped.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
    args = undefined;
  };
  wrapped.flush = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      invoke();
    }
  };
  wrapped.pending = () => timer !== undefined;
  return wrapped;
}
