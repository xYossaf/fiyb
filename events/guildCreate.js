const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');
const {embedColor,prefix} = require('../config');

module.exports = async (client,guild) => {
  var defultchannel = await guild.channels.cache.find(channel => channel.name === "general");
   if(defultchannel) {
    let welcomeem = new MessageEmbed()
    .setAuthor(`${client.username||client.user.username}`, client.user.displayAvatarURL(), 'https://google.com')
    .setDescription(`\n My name is **${client.username||client.user.username}** and I am verification bot\n my prefix is **${prefix}** \n\nYou can start by typing ${prefix}setup\n check all the commands with ${prefix}help`)
    .setColor("#36393F");
    defultchannel.send(welcomeem);
   }
   client.appdata.set(guild.id,{a:false,sud:false});

};

