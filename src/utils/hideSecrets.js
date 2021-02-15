/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
const traverse = require('traverse');

const defaultSecretWords = [
  'password',
  'pass',
  'token',
  'auth',
  'secret',
  'passphrase',
  'card',
];

const replaceString = (str, mask) => {
  if (str) return mask;
};

module.exports = (obj, opts) => {
  opts = opts || {};
  opts.secretWords = opts.secretWords || defaultSecretWords;
  opts.mask = opts.mask || '******';
  return traverse(obj).map(function (element) {
    for (let i = 0, key; (key = this.path[i]) !== undefined; i++) {
      if (~opts.secretWords.indexOf(key)) {
        return replaceString(element, opts.mask);
      }
    }
  });
};
