'use strict';
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return client.global.message.error(message, `You did not provide any arguments! \`sw!upload <Link> <Category>\``, "(NO_ARG)");
    if (!args[1]) return client.global.message.error(message, `You did not provide any arguments! \`sw!upload <Link> <Category>\``, "(NO_ARG)");
    if (!client.global.categories.includes(args[0].toProperCase())) return client.global.message.error(message, `Not a valid category!\n do \`sw!categories\` to see a list!`, "(NOT_A_CATEGORY)");
    if (!client.global.isUrl(args[1])) return client.global.message.error(message, "Not a valid url!", "(NOT_A_URL)");
    var isAdded = false;
    client.global.db.query(`SELECT * FROM sweebData where category = '${args[0].toProperCase()}'`, function(err, data) {
        if (!data) return; // silently return nothing as database may not be initialized
        for (var i = 0; i < data.length; i++) {
            const pic = data[i];
            if (pic.fileLink == args[1]) return isAdded = true;
        }
        if (!isAdded) {
            var dayjs = require('dayjs')
            const timestamp = dayjs(new Date()).format("YYYY,MM,DD");
            client.global.db.query(`INSERT INTO sweebData (id, category, nsfw, dateAdded, fileLink) VALUES (${client.global.createId(14)}, "${args[0].toProperCase()}", false, '${timestamp}', "${args[1]}")`);
            client.global.message.success(message, "channel", "Upload", `Successfully uploaded the image to /\`${args[0]}\`/`);
        } else return client.global.message.error(message, `Link already present in Database under \`${pic.category}\``, "(LINK_IN_DB)")
    })
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Uploader",
    cooldown: 5
  };
  
  exports.help = {
    name: "upload",
    category: "System",
    description: "Uploads image!",
    usage: "upload <Link> <Category> <true:false>"
  };