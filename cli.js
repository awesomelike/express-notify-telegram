/* eslint-disable no-console */
const inquirer = require('inquirer');
const https = require('https');
const ora = require('ora');
const { printError } = require('./src/utils/print');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Enter your botToken:',
      name: 'botToken',
    },
    {
      type: 'input',
      message: 'Enter channel\'s username (without @):',
      name: 'channelUsername',
    },
  ])
  .then((answers) => {
    const { botToken, channelUsername } = answers;
    const url = `https://api.telegram.org/bot${botToken}/getChat?chat_id=@${channelUsername}`;
    const spinner = ora('Fetching ChatId...').start();
    https.get(url, (res) => {
      res.on('data', (data) => {
        spinner.stop();

        const response = JSON.parse(data.toString());
        if (!response.ok) return printError('Invalid botToken or channel username provided!');
        return console.log('ChatId of the channel:', response.result.id);
      });
      res.on('error', (error) => printError(`Telegram server error: ${error}`));
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
