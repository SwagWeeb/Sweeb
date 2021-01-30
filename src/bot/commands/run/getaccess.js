exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    client.global.db.query(`SELECT * FROM sweebAPI WHERE id = "${message.author.id}"`, function(err, data) {
        if (data[0] == undefined || null) {
            const token = client.global.enc(1, client.global.createToken(30))
            try {
            client.global.db.query(`INSERT INTO sweebData (id, apiToken) VALUES (${message.author.id}, "${token}")`).on('error', function(e){})
            } finally {
                client.global.message.success(message, "channel","Success", `Your api token has been created! check dms!`)
                client.global.message.success(message, "dm", "API token", `this is your API token keep it safe!\n\`${token}\``)
            }
        }
    })
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["getaccess", "access", "gettoken"],
    permLevel: "User",
    cooldown: 500
  };
  
  exports.help = {
    name: "token",
    category: "System",
    description: "Allows user to be able to access the IMG database!",
    usage: "token"
  };