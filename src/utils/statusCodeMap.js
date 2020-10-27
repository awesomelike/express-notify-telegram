/* eslint-disable no-plusplus */
const map = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
  0: '0️⃣',
};

const mapper = (statusCode) => {
  if (!parseInt(statusCode, 10)) return statusCode;

  const codeClone = `${statusCode}`;

  let result = '';
  for (let i = 0; i < codeClone.length; i++) {
    result += map[codeClone[i]];
  }
  return result;
};

module.exports = mapper;
