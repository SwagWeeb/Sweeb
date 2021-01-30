exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const test = await client.global.db.query(`SELECT * FROM sweebData`);
  console.log(test);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    cooldown: 3
  };
  
  exports.help = {
    name: "test",
    category: "System",
    description: "Get bots ping",
    usage: "ping"
  };