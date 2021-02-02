module.exports = (client) => {
    const Embed = require("./MessageHandler")
    client.global.createId = require('./createID');
    client.global.log = require('./log'),
    require('../bot/commands/commandHandler')(client)
    client.global.truncate = require('./truncate'),
    client.global.message = new Embed(client),
    client.global.db = require('../database/mysql'),
    client.global.escapeDB = require('../database/escaping')
    client.global.categories = ["Pat", "Hug", "Kiss", "Highfive", "Heart", "Cry", "Slap", "Bonk", "Kill", "Snuggle", "Poke", "Blush", "Confused", "Wave", "Nosebleed", "ThumbsUp", "Stare", "Smile", "Laugh", "Angry", "Smug", "Panic", "Wow", "Shocked", "HoldHand", "Grab", "Worried", "Sweat", "Cringe", "Wtf", "Bliss", "Highfive", "Shoot", "Cheer", "Lick", "Nom", "Run", "Pout", "Nod", "No", "Bully", "Tease", "Hide", "Peck", "Drool", "QuestioningExistance", "Cool", "Done", "Popcorn", "Lurk", "WakeUp", "Sleep", "Jump", "Fangirling", "Sip", "Dance"],
    client.global.isUrl = require('./isUrl'),
    client.global.enc = require('./encryptor'),
    client.global.checkUrl = require('./checkUrlUpload'),
    client.global.createToken = (length) => {
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];
        for (var i = 0; i < length; i++) {
            var j = (Math.random() * (a.length - 1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    },
    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise") text = await text;
        if (typeof evaled !== "string") text = require("util").inspect(text, {
            depth: 1
         });
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203) + String.fromCharCode(8203)).replace(client.token, "I have a structured settlement and I need cash now.\nCall J. G. Wentworth!\n877 cash now\nI have an annuity but I need cash now.\nCall J. G. Wentworth!\n877 cash now\n877 cash now\nThey've helped thousands, they'll help you, too.\nOne lump sum of cash they will pay to you.\nIf you get long term payments but you need cash now\nCall J. G. Wentworth\n877 cash now\nCall Now");
      },

    client.permlevel = (message) => {
        let permlvl = 0;
        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    },
    String.prototype.toProperCase = function() {
        return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
};