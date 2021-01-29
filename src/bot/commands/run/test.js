exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    client.global.db.query(`SELECT * FROM sweebData`, function(error, guildData) {
       
       console.log(guildData)
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
    name: "ping",
    category: "System",
    description: "Get bots ping",
    usage: "ping"
  };