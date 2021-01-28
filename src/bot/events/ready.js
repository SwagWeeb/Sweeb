/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
module.exports = async (client) => {
	// Log that the bot is online.

	client.appInfo = await client.fetchApplication();
	setInterval(async () => {
		client.appInfo = await client.fetchApplication();
	}, 60000);

	var cMembers = client.users.cache.size;
	var gCount = client.guilds.cache.size;
    console.log(`[Sweeb] Logged into '${client.user.tag}' (${client.user.id}). Ready to serve ${cMembers} users in ${gCount} guilds. Bot Version: ${client.version}`);
};