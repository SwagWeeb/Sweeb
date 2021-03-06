'use strict';
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return client.global.message.error(message, `You did not provide any arguments! \`sw!upload <Link> <Category>\``, "(NO_ARG)");
    if (!args[1]) return client.global.message.error(message, `You did not provide any arguments! \`sw!upload <Link> <Category>\``, "(NO_ARG)");
    if (!client.global.categories.includes(args[0].toProperCase())) return client.global.message.error(message, `Not a valid category!\n do \`sw!categories\` to see a list!`, "(NOT_A_CATEGORY)");
    if (!client.global.isUrl(args[1])) return client.global.message.error(message, "Not a valid url!", "(NOT_A_URL)");
    const checkForGfy = new RegExp(/gfycat\.com/ig), checkforBadTenor = new RegExp(/tenor\.com\/([^ \/]+)\.gif/ig);
    if (checkForGfy.exec(args[1])) return client.global.message.error(message, "GfyCat not supported!", "(URL_NOT_SUPPORTED)");
    if (checkforBadTenor.exec(args[1])) return client.global.message.error(message, "Please use the direct tenor link!", "(BAD_URL)");
    const gifCheck = await client.global.checkUrl(args[1]);
    client.global.db.query(`SELECT * FROM sweebData where fileLink = ${client.global.escapeDB(gifCheck)}`, function(err, data) {
        if (!data) return; // silently return nothing as database may not be initialized
        if (data[0] !== undefined) return client.global.message.error(message, `Link already present in Database under \`${data[0].category}\``, "(LINK_IN_DB)")
        else {
          var dayjs = require('dayjs')
          const timestamp = dayjs(new Date()).format("YYYY,MM,DD");
          client.global.db.query(`INSERT INTO sweebData (id, category, nsfw, dateAdded, fileLink) VALUES (${client.global.createId(14)}, "${args[0].toProperCase()}", false, '${timestamp}', "${gifCheck}")`);
          client.global.message.success(message, "channel", "Upload", `Successfully uploaded the image to /\`${args[0]}\`/`, gifCheck);
          client.global.log.log(`[Sweeb] /${args[0]}/${gifCheck}/ uploaded by ${message.author.tag}`)
        }
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