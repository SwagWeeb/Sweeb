exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!args[1]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!args[2]) return client.global.message.error(message, "no_arg", `You did not provide any arguments! \`sw!upload <Link> <Category> <true:false>\``, "(NO_ARG)");
    if (!client.global.categories.includes(args[0].toProperCase())) return client.global.message.error(message, "not_category", `Not a valid category!\n do \`sw!categories\` to see a list!`, "(NOT_A_CATEGORY)");
    if (!client.global.isUrl(args[1])) return client.global.message.error(message, "not_url", "Not a valid url!", "(NOT_A_URL)");
    
    var val = args[2].toLowerCase() === false;
    if (typeof val !== "boolean") return client.global.message.error(message, "not_bool", "Not a boolean! for NSFW tag use \`true/false\`!", "(NOT_A_BOOLEAN)");
    client.global.log.log(val)
    var datetime = new Date().toLocaleString();
    client.global.db.query(`INSERT INTO 
    sweebData 
    (id, category, nsfw, date, fileLink) 
    VALUES (${client.global.escapeDB(client.global.createId(30))}, ${client.global.escapeDB(args[0].toProperCase())}, ${client.global.escapeDB(args[2].toLowerCase())}, ${datetime}, ${client.global.escapeDB(args[1])})`)

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