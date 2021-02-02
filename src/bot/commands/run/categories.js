exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const cats = client.global.categories.join(', ')
    client.global.message.success(message, "channel", "Categories", `Current categories available!\n \`${cats}\``, "https://media.tenor.com/images/91bcfa97b4bc8b536ed0281c17ebc951/tenor.gif");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cats", "cat", "catg", "cattieg"],
    permLevel: "Uploaders",
    cooldown: 3
  };
  
  exports.help = {
    name: "categories",
    category: "System",
    description: "Get the gifs categories!",
    usage: "categories"
  };