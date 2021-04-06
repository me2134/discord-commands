```js
# Easy Economy
Easy Economy is a NPM package that lets you create a Discord Economy Quickly and Easily!

[![NPM](https://nodei.co/npm/easy-economy.png)](https://nodei.co/npm/easy-economy/)

# Tutorial Video
<iframe width="560" height="315" src="https://www.youtube.com/embed/xJOc7Nu9sjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Features
- 🤖 Beginner Friendly
- ⏰ Fast To catch on
- 👍 Quick Updates
- 😎 Only Cool People Use Easy-Economy. Join the Cool Club By installing Easy-Economy

# Methods
## Start
```js
let easyEco = require('easy-economy');
easyEco.start(client, message);
```

## Work
```js
let easyEco = require('easy-economy');
easyEco.work(client, message);
```

## Leaderboard
```js
let easyEco = require('easy-economy');
easyEco.leaderboard(client, message);
```

## Daily
```js
let easyEco = require('easy-economy');
easyEco.daily(client, message);
```

## Balance
```js
let easyEco = require('easy-economy');
easyEco.balance(client, message);
```

# Examples (Discord.js)
As of now, this package is still in devlopment so there will be more commands added in the future!

## Start Command For the Economy (!!REQUIRED COMMAND!!)
```js
const Discord = require('discord.js');
const easyEco = require('easy-economy');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Online!");
});

client.on("message", message => {
    if (message.content.startsWith("!start")) {
        easyEco.start(client, message); // Starting the economy
    }
});

client.login("BOT_TOKEN")
```

![image](https://imgur.com/vUhIIRi.png "Start Command Preview")
* * *
## New Command! Leaderboard
```js
const Discord = require('discord.js');
const easyEco = require('easy-economy');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Online!");
});

client.on("message", message => {
    if (message.content.startsWith("!lb") || message.content.startsWith("!leaderboard")) {
        easyEco.leaderboard(client, message); // Server Leaderboard
    }
});

client.login("BOT_TOKEN")
```

![image](https://imgur.com/5eBuwh5.png "Leaderboard Preview")
* * *

## Balance
```js
const Discord = require('discord.js');
const easyEco = require('easy-economy');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Online!");
});

client.on("message", message => {
    if (message.content.startsWith("!balance")) {
        easyEco.balance(client, message); // Checking the users balance
    }
});

client.login("BOT_TOKEN")
```

![image](https://imgur.com/n1tTV6h.png "Balance Preview")
* * *
## Work
```js
const Discord = require('discord.js');
const easyEco = require('easy-economy');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Online!");
});

client.on("message", message => {
    if (message.content.startsWith("!work")) {
        easyEco.work(client, message); // Work to earn money
    }
});

client.login("BOT_TOKEN")
```

![image](https://imgur.com/p3jpCPY.png "Work Preview")
* * *

## Daily Bonus
```js
const Discord = require('discord.js');
const easyEco = require('easy-economy');
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Online!");
});

client.on("message", message => {
    if (message.content.startsWith("!daily")) {
        easyEco.daily(client, message); // Get your daily bonus +$100
    }
});

client.login("BOT_TOKEN")
```

![image](https://imgur.com/xhH0ITr.png "Daily Preview")
* * *
# Support
If you need support with this NPM package, you can [join the Discord Server](https://discord.com/invite/AzJkFcQ)

# Credits
WillTDA - For making [a package](https://npmjs.com/package/quick-discord) that was basically the skeleton for this project

Mr Discord1 - For making [the project](https://npmjs.com/package/easy-economy)

*Update No. 2 Publish Date 3/25/21*
