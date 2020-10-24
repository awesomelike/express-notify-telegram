/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const querify = require('querystring').stringify;
const onFinished = require('on-finished');
const template = require('./src/templates/default');
const sendMessage = require('./src/sendMessage');
const { printWarning } = require('./src/utils/print');

/**
 * @param options Middleware's options
 * @param options.botToken Bot's token, sent by BotFather
 * @param options.chatId ChatID of a Telegram chat to send notifications to
 */
const telegramMiddleware = (options) => (req, res, next) => {
  if (!options) options = {};
  const { botToken } = options;
  const { chatId } = options;

  if (!botToken) printWarning('botToken not provided, errors get ignored');
  if (!chatId) printWarning('chatId not provided, errors get ignored');

  if (botToken && chatId) {
    onFinished(res, (err, _) => {
      if (err || res.statusCode >= 400) {
        const text = template(req, res, options);

        let query = {
          text,
          chat_id: chatId,
          parse_mode: 'Markdown',
        };

        // If statusCode is less than 500, then this error is not critical, we disable notification
        if (res.statusCode < 500) query.disable_notification = true;

        query = querify(query);

        try {
          sendMessage(botToken, query);
        } catch (e) {
          console.log(e);
          next(e);
        }
      }
    });
  }
  next();
};

module.exports = telegramMiddleware;
