[TOC]

#### Sweeb

- An anime gif/pic sharing website!
- we upload images to the database YOU pull from it!
- fast simple easy!

#### API Doc

> note you need to invite the bot/join the discord server to create an API token

> current Categories /pat/ /hug/

```js
const w = require('wumpfetch');
async function callWump() {
    const r = await w({
        url: `https://sweeb.cyci.org/api/v1/:category`,
        method: 'GET',
        headers: {
            'User-Agent': `Your (user agent)`,
            'Authorization': "your_very_secret_api_token"
        }
    }).send();
    console.log(r.json());   
}
callWump()
```
`its as simple as that!`

#### Contact
> to become an image uploader please contact our team here
staff@cyci.org | or join here (https://discord.gg/4ht2dWjaHP) and message Phil#0004

