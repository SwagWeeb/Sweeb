module.exports = (client) => {
    client.global.createId = require('./createID');
};