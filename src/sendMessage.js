const https = require('https');
const parseChunk = require('./utils/parseChunk');
const { printError } = require('./utils/print');

const sendMessage = (botToken, query) => {
  const API = `https://api.telegram.org/bot${botToken}/sendMessage?${query}`;
  https.get(API, (res) => {
    res.on('data', (data) => {
      const response = parseChunk(data);
      if (!response.ok) {
        printError(`The notification got ignored. Reason: ${response.description}`);
      }
    });
  });
};

module.exports = sendMessage;
