const https = require('https');

const sendMessage = (botToken, query) => {
  const API = `https://api.telegram.org/bot${botToken}/sendMessage?${query}`;
  https.get(API);
};

module.exports = sendMessage;
