exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const cats = client.global.categories.join('\`\n\`')
    message.reply(cats)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Uplaoders",
    cooldown: 3
  };
  
  exports.help = {
    name: "categories",
    category: "System",
    description: "Get the gifs categories!",
    usage: "categories"
  };