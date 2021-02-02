exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    client.global.db.query(`SELECT * FROM sweebAPI WHERE id = "${message.author.id}"`, function(err, data) {
        if (data[0] == undefined || null) {
            const token = client.global.enc(1, client.global.createToken(20) + message.author.id)
            try {
            client.global.db.query(`INSERT INTO sweebAPI (id, apiToken) VALUES (${message.author.id}, "${token}")`).on('error', function(e){ client.global.log.log("Bad MYSQL request! contact the mods at ONCE!")})
            } finally {
                client.global.message.success(message, "channel","Success", `Your api token has been created! check dms!`)
                client.global.message.success(message, "dm", "API token", `this is your API token keep it safe!\n\`${token}\``)
            }
        } else {
            client.global.message.success(message, "channel","DMS", `check dms! for your requested API token!`)
            client.global.message.success(message, "dm", "API token", `this is your API token keep it safe!\n\`${data[0].apiToken}\``)
        }
    })
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["getaccess", "access", "gettoken"],
    permLevel: "User",
    cooldown: 10
  };
  
  exports.help = {
    name: "token",
    category: "System",
    description: "Allows user to be able to access the IMG database!",
    usage: "token"
  };