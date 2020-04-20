const Regex = /((?:https?:\/\/)?(?:www\.)?(?:discord|paypal|selly)(?:\.me|app\.com|\.gg|\.io|\/invite)(?:\/\w*)?)/gmi;
const Discord = require("discord.js");
//const dateFormat = require('dateformat');


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
  
const { prefix,embedColor } = require('../config');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, member) => {
  var db = await client.appdata.get(member.guild.id);
  console.log("11  " + member.id||member.user.id);
    if(db.a == true) {
  if(db[member.id||member.user.id].ID == member.id||member.user.id) {
    console.log("12");
    var rolea = member.guild.roles.cache.get(db.RoleID);
   await member.roles.add(rolea);
  }
}
  if(db.sud == true) {
    if(member.guild.channels.cache.get(db.modchannelID)) {
     let chhann = member.guild.channels.cache.get(db.modchannelID);
     var welcomeemb = new MessageEmbed()
     
     //    .setAuthor(`${client.username||client.user.username}`, client.user.displayAvatarURL(), 'https://google.com')
     .setAuthor(`${member.username||member.user.username}`,member.user.displayAvatarURL())
     .setTitle(`Join | ${member.tag || member.user.tag}`)
     .setDescription(`${member.username || member.user.username} is waitting for your approval`)
      .addField(`infractions?`, "none",true)
     .addField(`ID`, member.id||member.user.id,true)
     .setFooter("Powerd by Vorox","https://images-ext-1.discordapp.net/external/w8_15JUdS0163hN0loQvRx-l_2oY8hFUVKJ3240vLQI/https/cdn.discordapp.com/avatars/597184477403414559/d3e41f321af29194fe9f7efb88e80bea.webp");
     chhann.send(welcomeemb);

    }
  }
    const cmdHelp = client.commands.get('help', 'help.name');
    
    client.user.setStatus('online');
    client.user.setActivity(`${prefix + cmdHelp}`, { type: 'PLAYING' })
        .catch(err => client.logger.error(err));

};