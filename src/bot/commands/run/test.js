exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const test = "";
client.global.db.query(`SELECT * FROM sweebData`, function (error, memberData) {
  for (let i = 0; i < memberData.length; i++) {
    client.global.log.log(memberData[i].url)
  }
  client.global.log.log(memberData[0].id)
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