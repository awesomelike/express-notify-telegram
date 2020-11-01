/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const querify = require('querystring').stringify;
const onFinished = require('on-finished');
const template = require('./src/templates/default');
const sendMessage = require('./src/sendMessage');
const { printWarning } = require('./src/utils/print');
const validateOptions = require('./src/utils/options');
const { isError, is4xx, is5xx } = require('./src/utils/statusCode');

/**
 * @param {object} config Middleware's configuration
 * @param {String} config.botToken Bot's token, sent by BotFather
 * @param {Number} config.chatId ChatID of a Telegram chat to send notifications to
 * @param {object} opts Middleware's options
 * @param {boolean} opts.enable4xx If true enables 4xx status notifications
 * @param {boolean} opts.sound4xx If true enables 4xx status notifications sounds
 * @param {boolean} opts.enable5xx If true enables 5xx status notifications
 * @param {boolean} opts.sound5xx If true enables 5xx status notifications sounds
 * @param {Array} opts.exclude An array of statusCodes to exclude (this has the highest priority) 
 */
const telegramMiddleware = (config, opts) => (req, res, next) => {
  if (!config) config = {};
  const { botToken, chatId } = config;

  if (!botToken) printWarning('botToken not provided, errors get ignored');
  if (!chatId) printWarning('chatId not provided, errors get ignored');

  let options = validateOptions(opts);  

  if (botToken && chatId) {
    onFinished(res, (err, _) => {
      if ((is4xx(res) && options.enable4xx) || (is5xx(res) && options.enable5xx)) {
        if (!options.exclude.includes(res.statusCode)) {
          if (err || isError(res)) {
            const text = template(req, res, config);
    
            let query = {
              text,
              chat_id: chatId,
              parse_mode: 'Markdown',
            };
    
            // Set sound notification according to the options
            if ((is4xx(res) && !options.sound4xx) || (is5xx(res) && !options.sound5xx)) {
              query.disable_notification = true;
            }
    
            query = querify(query);
    
            try {
              sendMessage(botToken, query);
            } catch (e) {
              console.log(e);
              next(e);
            }
          }
        }
      }
    });
  }
  next();
};

module.exports = telegramMiddleware;
