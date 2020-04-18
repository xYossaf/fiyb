const Regex = /((?:https?:\/\/)?(?:www\.)?(?:discord|paypal|selly)(?:\.me|app\.com|\.gg|\.io|\/invite)(?:\/\w*)?)/gmi;
const Discord = require("discord.js");
//const dateFormat = require('dateformat');
const fs = require('fs');
var ids;
fs.readFile("./list.json", (err, data) => {
  if (err) throw err;
   ids = JSON.parse(data);
});

/*

     var modlog = this.vorox.settings.get(member.guild.id).modlog.channel;
      var channel = this.vorox.channels.find((c) => c.id === modlog);
      if(!channel) return;


    if (Regex.test(member.user.username)) {
      if (member.user.bot) return;

      if (member.bannable) member.ban({
        reason: 'Automatic ban: suspicious link in username',
        days: 7
      }).then(() => {
        this.vorox.database.users[member.user.id].lastesGuildJoinned.joinStats = false;
      }).catch(console.error)
  
    }

    var millisCreated = new Date().getTime() - member.user.createdAt.getTime();
    var daysCreated = millisCreated / 1000 / 60 / 60 / 24;

    var joinEmbed = new Discord.MessageEmbed()

    .setColor(this.vorox.colors.green)
    .setThumbnail(member.user.displayAvatarURL())
    .setTitle(`Member Joined | ${member.user.tag}`)
    .addField('Member ID ', member.user.id, true)
    .addField('Created On ',  `${dateFormat(member.createdAt)} [**${daysCreated.toFixed(0)} Days**]`, true)
    .setFooter(`Total members: ${member.guild.members.size} | © 2019 ${this.vorox.user.username}`)

    return channel.send(joinEmbed);
*/
  
const { prefix } = require('../config');

module.exports = async (client, member) => {
  for (let i in ids.table.length) {
    if (ids.table[i].ID !== member.user.id) {
      member.user.send("ok");
      member.kick().then(() => {}).catch(console.error);
     
    }
  }

    const cmdHelp = client.commands.get('help', 'help.name');
    
    client.user.setStatus('online');
    client.user.setActivity(`${prefix + cmdHelp}`, { type: 'PLAYING' })
        .catch(err => client.logger.error(err));

};