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
        } else if (type == "not_url") {
            embed.setColor("#ca5252")
            .setTitle("Error: (NOT_A_URL)")
            .setDescription(title)
        } else if (type == "not_category") {
            embed.setColor("#ca5252")
            .setTitle("Error: (NOT_A_CATEGORY)")
            .setDescription(title)
        } else if (type == "not_bool") {
            embed.setColor("#ca5252")
            .setTitle("Error: (NOT_A_BOOLEAN)")
            .setDescription(title)
        } else if (type == "cant_message") {
            embed.setColor("#ca5252")
            .setTitle("Error: (CANNOT_MESSAGE_USER)")
            .setDescription(title)
        }
        return message.channel.send({embed: embed});
    }

   async success(message, type, title, body) {
        if (!message) return;
        if (typeof title !== "string") return this._client.logger.error("Title must be a type of (String)")
        if (typeof body !== "string") return this._client.logger.error("Body must be a type of (String)")
        if (type.toLowerCase() == "dm") {
            embed.setColor("#74d557")
        .setTitle(title)
        .setDescription(body)
        message.author.send({embed: embed}).catch(e => this.error(message, "cant_message", `Sorry ${message.author.tag}, it seems i cannot message you!\n re-run this command with DM's enabled!`, "CANNOT_MESSAGE_USER"))
        } else if (type.toLowerCase() == "channel") {
        embed.setColor("#74d557")
        .setTitle(title)
        .setDescription(body)
        message.channel.send({embed: embed})
        }
    }

    
}

module.exports = Embed;