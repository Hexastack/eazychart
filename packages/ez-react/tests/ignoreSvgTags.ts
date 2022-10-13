const ERROR = 'is unrecognized in this browser.';
const originalError = console.error.bind(console.error);
console.error = (...args) =>
  !args.toString().includes(ERROR) && originalError(...args);
