const express = require('express');
const app = express();
const api = require('./routes/Api')
const rateLimit = require("express-rate-limit");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const cfg = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client({fetchAllMembers: false,disabledEvents: ['TYPING_START', 'TYPING_STOP', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE', 'USER_NOTE_UPDATE', 'VOICE_SERVER_UPDATE', 'GUILD_MEMBER_SPEAKING', 'USER_NOTE_UPDATE', 'VOICE_STATE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE'],http: { api: 'https://discordapp.com/api', version: 7 },disableEveryone: true,messageCacheMaxSize: 1,messageCacheLifetime: 1,messageSweepInterval: 1})
client.global = {},client.global.wbk = new Discord.WebhookClient(process.env.BOT_WEBHOOK_ID, process.env.BOT_WEBHOOK_TOKEN);
client.commands = new Discord.Collection(),client.aliases = new Discord.Collection(),client.cooldown = new Discord.Collection(),client.config = cfg;
require('./functions/global')(client);
app.set('trust proxy', 1);

// basic rateLimiting
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: "Too many requests exceeded, please try again in 10 minutes"
  });

async function routing() {
    console.log("[Sweeb] Add routes");
    app.use('/api/v1', api)
    app.use("/api/", apiLimiter);
}
async function bot(client) {
    const cmds = await readdir("./src/bot/commands/");
    console.log(`[Sweeb] Loading a total of ${cmds.length} commands.`);
    cmds.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });
    const event = await readdir("./src/bot/events/");
    console.log(`[Sweeb] Loading a total of ${event.length} events.`);
    event.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./bot/events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    try {
        client.login(process.env.BOT_KEY);
    } catch (err) {
        console.log("[Sweeb] Oops we hit a snag", err)
        procces.exit(1);
    }
}

app.use(function (req, res, next) {res.locals.client = client;next();})
(async() => {
    app.listen(process.env.SERVER_PORT, () => console.log("[Sweeb] Started server on port", process.env.SERVER_PORT))

    routing();
    bot(client);
})

process.on('uncaughtException', (error) => {
    console.log('something terrible happened: ', error);
})
process.on('unhandledRejection', (error, promise) => {
    console.log(' promise rejection here: ', promise);
    console.log(' The error was: ', error);
});