exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const test = await client.global.db.query(`SELECT * FROM sweebData`);
  console.log(test);

  const w = require('wumpfetch');
    const r = await w({
        url: `https://sweeb.cyci.org/api/v1/slap`,
        method: 'GET',
        headers: {
            'User-Agent': `your custom (user-agent)`,
            'Authorization': "api token from sweeb"
        }
    }).send(); 


  const {MessageEmbed} = require('discord.js');
    let member = message.mentions.members.first();
    const embed = new MessageEmbed().setColor("#ca5252").setTimestamp(new Date());
    if (!member) {
      embed.setTitle("you slapped yourself!").setImage(r.json().url);
      message.channel.send({embed: embed}).catch(e=>{console.log(e);})
    } else {
      embed.setTitle(`you slapped  ${member.user.tag}!`).setImage(r.json().url);
      message.channel.send({embed: embed}).catch(e=>{console.log(e);})
    }
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