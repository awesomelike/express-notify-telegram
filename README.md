# Use case
Once your Express application is deployed, it is important to get notified of any errors in real-time. While there are many advanced solutions for this task already, this utility middleware focuses on being minimalistic, easy setup and of course the cosy Telegram :). 

# Setup
1. Write to [BotFather](https://t.me/botfather), give it a command `/newbot`, answer the questions, and it will give you a secret token (we call this `botToken`).
2. Create a channel, give it a username, and add the bot you have just created to this channel.
3. Inside of your project directory, run `npm install --save express-notify-telegram`.
4. Run `npx express-notify-telegram`. This CLI will ask you the `botToken` and channel's username you created in the previous steps and give you the channel's `chatId`.
5. Finally, in your application, add the following:
```js
  const express = require('express');
  const telegramMiddleware = require('express-notify-telegram');
  
  const app = express();
  
  app.use(telegramMiddleware({
     botToken: '<your botToken from above>', 
     chatId: '<the chatId you got from the CLI>'
  }));
  
  // One of your endpoints
  app.get('/resource', (req, res) => {
    try {
      // Some code that throws error
    } catch(e) {
      // This will fire a notification, as it has an erroneous 500 statusCode.
      res.status(500).json(/* whatever */); 
      
      // If you want a custom error message in the notification, add the following:
      req.errorMessage = 'My custom error message';
    }
  });

```
Voila, from now you get an instant notification to your Telegram, and immediately fix that bug :).

# API
```js
  app.use(expressNotifyTelegram(config, opts));
```
### Configuration (`config`) [required]

##### `botToken` (required)
The secret token (string) you got from [BotFather](https://t.me/botfather).

##### `chatId` (required)
The number you got from the CLI (use the instructions above).

### Options (`opts`) [optional]
#### `exclude` (optional)
An array of `statusCode`s to ignore. 
Example: `{ exclude: [404, 502] }` skips all notifications for 404 and 502 `statusCode`s.

Defaults to `[]`.

**Note:** This field has the highest priority. Even if you set `enable4xx` or `enable5xx` to `true`, and some values intersect with this array, those `statusCode`s get ignored.
#### `enable4xx` (optional)
Boolean value. If true, you will get notifications for 4xx error codes.

Defaults to `true`. 
#### `sound4xx` (optional)
Boolean value. If true, you will get 4xx notifications with sound.

Defaults to `false`.
**Note:** This is ignored if `enable4xx` is `false`.
#### `enable5xx` (optional)
Boolean value. If true, you will get notifications for 5xx error codes.

Defaults to `true`. 
#### `sound5xx` (optional)
Boolean value. If true, you will get 5xx notifications with sound. 

Defaults to `true`.
**Note:** This is ignored if `enable5xx` is `false`.