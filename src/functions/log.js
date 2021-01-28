const moment = require("moment");
const {MessageEmbed, WebhookClient} = require("discord.js")
const embed = new MessageEmbed();
const wk = new WebhookClient(process.env.BOT_WEBHOOK_ID, process.env.BOT_WEBHOOK_TOKEN);
const truncate = require('./truncate')

exports.log = (content, type = "log") => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  switch (type) {
    case "log": 
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#74d557").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    break;
    case "warn": 
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#c4e372").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    case "error":
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#ca5252").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    break;
    case "debug":
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#52a0ca").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    break;
    case "ready":
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#96da66").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    break;
    case "mysql":
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#ae66da").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
    break;
    default:
    console.log(`${timestamp} ${type.toUpperCase()} ${content} `);
    embed.setTitle(type.toUpperCase()).setColor("#74d557").setDescription(truncate(content, 100)).setTimestamp(timestamp);
    wk.send({embeds: [embed]})
  }
}; 

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");

exports.ready = (...args) => this.log(...args, "ready");

exports.mysql = (...args) => this.log(...args, "mysql");