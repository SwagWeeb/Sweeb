module.exports = (client) => {
    client.global.createId = require('./createID');
    client.global.log = require('./log'),
    client.global.truncate = require('./truncate'),
    client.global.db = require('../database/mysql')
};