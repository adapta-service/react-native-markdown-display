const logger = {
  log: (...args) => {
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log(...args);
    }
  },
  warn: (...args) => {
    if (typeof console !== 'undefined' && typeof console.warn === 'function') {
      console.warn(...args);
    }
  },
  error: (...args) => {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(...args);
    }
  },
};

export default logger;
