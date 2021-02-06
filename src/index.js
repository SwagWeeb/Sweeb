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

// File logging from AJ/TheOnlyKirb
var dayjs = require("dayjs");
const fs = require("fs");
var util = require('util');
const timestamps = `${dayjs(new Date()).format("MM-DD-YYYY")}`
var logFile = fs.createWriteStream(`./src/logs/log-${timestamps}.txt`, { flags: 'a' });
var logStdout = process.stdout;
console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
// basic rateLimiting
const apiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 100,
    message: "Too many requests exceeded, please try again in 10 minutes"
});

async function routing() {
    console.log("[Sweeb] Add routes");
    app.use('/api/v1', api, apiLimiter);
    app.get('/', function(req, res) { 
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress, who = req.headers['user-agent'] || "Undefined (1.0.0)";
        client.global.log.log(`[Sweeb] index requested by ${ip} - ${who}`)
        res.json({result: "frontpage W.I.P bare with us!"});
    });
}
async function bot(client) {
    const cmds = await readdir("./src/bot/commands/run/");
    client.global.log.log(`[Sweeb] Loading a total of ${cmds.length} commands.`);
    cmds.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) console.log(response);
    });
    const event = await readdir("./src/bot/events/");
    client.global.log.log(`[Sweeb] Loading a total of ${event.length} events.`);
    event.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./bot/events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
      const thisLevel = client.config.permLevels[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }

    try {
        client.login(process.env.BOT_TOKEN);
    } catch (err) {
        client.global.log.error("[Sweeb] Oops we hit a snag " + err)
        procces.exit(1);
    }
}

app.use(function(req, res, next) {
    res.locals.bot = client;
    next();
})

routing();
app.listen(process.env.SERVER_PORT, () => client.global.log.log("[Sweeb] Started server on port", process.env.SERVER_PORT))

bot(client);

process.on('uncaughtException', (error) => {
    client.global.log.error('something terrible happened: ' + error);
})
process.on('unhandledRejection', (error, promise) => {
    client.global.log.error(' promise rejection here: ' + promise);
    client.global.log.error(' The error was: ' + error);
});