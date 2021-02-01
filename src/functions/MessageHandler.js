const {MessageEmbed} = require('discord.js');
const embed = new MessageEmbed().setTimestamp(Date.now());
class Embed {
    constructor(client) {
        this._client = client
        if (!this._client) return console.log("Client constructor empty")
        embed.setThumbnail("https://cdn.discordapp.com/attachments/560253001051406336/804465303261544459/e17da370e6775bcc6ad4d9d6e52ab833.png")
    }

   async error(message, title, body) {
        if (!message) return;
        if (typeof title !== "string") return this._client.logger.error("Title must be a type of (String)")
        // if (typeof body !== "string") return this._client.logger.error("Body must be a type of (String)")
        embed.setColor("#ca5252")
        .setTitle(`Error: ${body}`)
        .setDescription(title);

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