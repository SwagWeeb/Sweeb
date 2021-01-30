exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const test = "";
client.global.db.query(`SELECT * FROM sweebData`, function (error, memberData) {
  console.log(error);
  console.log(memberData);
})
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