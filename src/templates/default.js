const escape = require('../utils/escaper');
const statusCodeMapper = require('../utils/statusCodeMap');
const hideSecrets = require('../utils/hideSecrets');

module.exports = (req, res, options) => {
  const notificationTitle = res.statusCode < 500 ? '⚠️ SERVER WARNING 📡' : '⛔️ SERVER ERROR 📡';
  const endpoint = `\`${req.method}\` ${`${req.protocol}://${req.get('host')}${req.originalUrl}`}`;
  const appName = options.appName || process.env.APP_NAME || 'Unknown application';

  // Hide secret fields, such as password
  // eslint-disable-next-line prefer-object-spread
  let requestBody = req.body && Object.assign({}, req.body);
  requestBody = options.hideSecrets && requestBody ? hideSecrets(requestBody, {
    secretWords: options.secretWords,
    mask: options.mask,
  }) : requestBody;

  const message = `
  *${notificationTitle}*
    
*🔧 APPLICATION:* ${escape(appName)}
    
*🔧 ENDPOINT:* ${endpoint}
*🔧 STATUS_CODE:* ${statusCodeMapper(res.statusCode)}
    
*🔧 ERROR_MESSAGE:* ${escape(req.errorMessage || 'Unknown')}
    
*🔧 IP_ADDRESS:* ${escape(req.ip)}
    
*🔧 REQUEST_BODY:* 
\`\`\`
${JSON.stringify(requestBody || {}, null, 2)}
\`\`\`
  `;
  return message;
};
