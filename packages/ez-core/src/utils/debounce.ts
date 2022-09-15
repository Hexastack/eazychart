export function debounce(func: Function, timeout = 300) {
  // @ts-ignore
  const self = this;
  let timer: number;
  return (...args: any) => {
    if (typeof window !== 'undefined') {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(self, args);
      }, timeout);
    } else {
      func.apply(self, args);
    }
  };
}
