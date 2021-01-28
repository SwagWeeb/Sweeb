const {MessageEmbed} = require('discord.js');
const embed = new MessageEmbed().setTimestamp(Date.now());
class Embed {
    constructor(client) {
        this._client = client
        if (!this._client) return console.log("Client constructor empty")
        embed.setThumbnail("https://cdn.discordapp.com/attachments/560253001051406336/804465303261544459/e17da370e6775bcc6ad4d9d6e52ab833.png")
    }

   async error(message, type, title, body) {
        if (!message) return;
        if (typeof type !== "string") return this._client.logger.error("Type must be a type of (String)")
        if (typeof title !== "string") return this._client.logger.error("Title must be a type of (String)")
        // if (typeof body !== "string") return this._client.logger.error("Body must be a type of (String)")
        if (type == "no_arg") {
            embed.setColor("#ca5252")
            .setTitle("Error: (NO_ARG)")
            .setDescription(title)
        } else if (type == "command_cooldown") {
            embed.setColor("#ca5252")
            .setTitle("Error: (COMMAND_ON_COOLDOWN)")
            .setDescription(title)
        } else if (type == "level_not_met") {
            embed.setColor("#ca5252")
            .setTitle("Error: (LEVEL_NOT_MET)")
            .setDescription(title)
        }
        //if (fields != (typeof Object)) return client.logger.error("Field must be a type of (Object)")
        return message.channel.send({embed: embed});
    }

   async success(message, title, body) {
        if (!message) return;
        if (typeof title !== "string") return this._client.logger.error("Title must be a type of (String)")
        if (typeof body !== "string") return this._client.logger.error("Body must be a type of (String)")
        //if (fields != typeof Object) return this._client.logger.error("Field must be a type of (Object)")
        embed.setColor("#ca5252")
        .setTitle(title)
        .setDescription(body)
        message.channel.send({embed: embed})
    }

    
}

module.exports = Embed;