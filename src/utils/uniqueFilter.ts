export function uniqueFilter<T>(select: (el: T) => unknown = (el) => el): (el: T) => boolean {
  const set = new Set();
  return (el) => {
    const key = select(el);
    if (!set.has(key)) {
      set.add(key);
      return true;
    }
    return false;
  };
}
