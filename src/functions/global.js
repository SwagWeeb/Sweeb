module.exports = (client) => {
    const Embed = require("./MessageHandler")
    client.global.createId = require('./createID');
    client.global.log = require('./log'),
    require('../bot/commands/commandHandler')(client)
    client.global.truncate = require('./truncate'),
    client.global.message = new Embed(client),
    client.global.db = require('../database/mysql'),
    client.global.escapeDB = require('../database/escaping')
    client.global.categories = ["Pat", "Hug", "Kiss", "Highfive", "Heart", "Cry"],
    client.global.isUrl = require('./isUrl'),

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
    };

    String.prototype.toProperCase = function() {
        return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
};