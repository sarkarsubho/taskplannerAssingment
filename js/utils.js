 export function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}
