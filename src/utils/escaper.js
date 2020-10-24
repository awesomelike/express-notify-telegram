/* eslint-disable no-useless-escape */
module.exports = (string) => (
  typeof string === 'string'
    ? string
      .replace(/[\*]/g, '\\*')
      .replace(/[_]/g, '\\_')
      .replace(/[\[]/g, '\\[')
      .replace(/[`]/g, '\\`')
    : string);
