'use strict';
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!args[1]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!args[2]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!client.global.categories.includes(args[0].toProperCase())) return client.global.message.error(message, "not_category", `Not a valid category!\n do \`sw!categories\` to see a list!`, "(NOT_A_CATEGORY)");
    if (!client.global.isUrl(args[1])) return client.global.message.error(message, "not_url", "Not a valid url!", "(NOT_A_URL)");
    
    var val = args[2].toLowerCase() === false;
    if (typeof val !== "boolean") return client.global.message.error(message, "not_bool", "Not a boolean! for NSFW tag use \`true/false\`!", "(NOT_A_BOOLEAN)");
    const moment = require('moment')
    const timestamp = moment().format("YYYY-MM-DD");
    
    client.global.db.query(`INSERT INTO sweebData (id, category, nsfw, dateAdded, fileLink) VALUES (${client.global.createId(20)}, "${args[0].toProperCase()}", ${args[2].toLowerCase()}, STR_TO_DATE('${timestamp}', '%d-%m-%Y'), "${args[1]}")`)


    client.global.message.success(message, "Upload", `Successfully uploaded the image to /\`${args[0]}\`/`);
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