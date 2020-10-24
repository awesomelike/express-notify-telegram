/* eslint-disable no-console */

const printWarning = (text) => console.warn(
  '\x1b[33m', 'express-notify-telegram ==>',
  '\x1b[0m', text,
);

const printError = (text) => console.error(
  '\x1b[31m', 'Invalid botToken or channel username provided!',
);

module.exports = { printWarning, printError };
