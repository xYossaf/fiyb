const { prefix } = require('../config');
const { version } = require('../package.json');

const versions = {
    production: 'Production',
    development: 'Development'
};

module.exports = async client => {

    await client.logger.log(`Logged in as ${client.user.tag} (${client.user.id}) in ${client.guilds.size} server(s).`);
    await client.logger.log(`Version ${version} of the bot loaded.`);
    await client.logger.log(`${versions[process.env.NODE_ENV]} version of the bot loaded.`);
    
    const cmdHelp = client.commands.get('help', 'help.name');
    checkServers(client,client.appdata,"List data");
    client.user.setStatus('online');
    client.user.setActivity(`${prefix + cmdHelp}`, { type: 'PLAYING' })
        .catch(err => client.logger.error(err));
};

function checkServers(client,db,dbName) {
	client.guilds.cache.forEach(guild => {
        console.log(db.get(guild.id));
		if(!db.has(guild.id) || db.get(guild.id) == null) {
	
		db.set(guild.id,{a:false});
	
        }
		});
		console.info(`Database » ${dbName} Loaded.`);

}