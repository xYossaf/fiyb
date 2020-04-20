const { MessageEmbed } = require('discord.js');
const {embedColor} = require('../config');
var forceexit = false;
exports.run = async (client, message, args) => {
    var author = message.guild.member(message.author);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("but you don't have enough permission(s) to run this command | Missing permission(s): `ADMINISTRATOR`");
    if (!args[0]) return message.channel.send("but you didn't mention or type ID of User who will become approved");
     var user = await GetUser(client,message, args);
     if(user) {
      if(user.bot||user.user.bot) return message.channel.send("sorry but you can't approve a bot");
    }
     if (args[0].length == 18 && !isNaN(args[0]) && user == undefined) {
      
        let areYouSure = new MessageEmbed()
        .setTitle(`**${client.emojis.get("541327863668801545")}**  are you sure you want to add this ID`)
        .setDescription(`**${args[0]}** doesn't belong to anyone in this server`)
        .setColor(embedColor);
      message.channel.send(areYouSure).then(async (msg) => {

        await msg.react("✅");
        await msg.react("❌");

        var continueAF = (reaction, usera) =>
        reaction.emoji.name == '✅' &&
        usera.id === message.author.id;
       
       var continueA = msg.createReactionCollector(continueAF, {
          time: 30000,
        });
       
        var cancelAF = (reaction, userb) =>
        reaction.emoji.name == '❌' &&
        userb.id === message.author.id;
       
       var cancelA = msg.createReactionCollector(cancelAF, {
          time: 30000,
        });

        continueA.on('collect', () => {
            if (args[0] == message.author.id) return message.channel.send("sorry but you can't approve yourself :(");
            return AddUser(client,message,args[0].replace(/[<@!>]/g, ''),user);

      });

      cancelA.on('collect', () => {

        let channeledunvaildID = new MessageEmbed()
            .setTitle(`**${client.emojis.get("541327863668801545")}**  Process canceled`)
            .setDescription(`**${args[0]}** won't be added to the list`)
            .setColor(embedColor);
          
     return msg.edit(channeledunvaildID);

    });

      });
    } else if (user !== undefined) {

      if (user.id == message.author.id) return message.channel.send("sorry but you can't approve yourself :(");
      AddUser(client,message,user.id||user.user.id,user);

    }



  
};

exports.help = {
    name: 'approve',
    aliases: [],
    description: 'View the latency of the bot and API.',
    usage: 'approve <ID | MENTION>'
};


async function GetUser(client,message, args) {
    let User = await message.guild.member(message.mentions.users.first());
    if (User) return User;

    if (!User) {
      let IDCeckking = args[0].replace(/[<@!>]/g, '');
      User = await message.guild.member(IDCeckking);
  setTimeout(() => {},150);
      if (User == null) {
        return undefined;
      }
      return User;
    
  }
}


async function AddUser (client,message,IDU,user) {
    var db;
    let stb = false;
     db = await client.appdata.get(message.guild.id);
    // console.log(db);
    if(db.a == false) { stb = true;}
     let temps = stb == false ?  db[`${IDU}`] !== undefined ? db[`${IDU}`].ID == IDU:false : false;
     if (temps) { message.channel.send(`sorry but **${IDU}** is already in my list`);
     } else { 

   let date_ob = new Date();
   let date = ("0" + date_ob.getDate()).slice(-2);
   let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
   let year = date_ob.getFullYear();
   await client.appdata.set(message.guild.id,true,`a`);
   await client.appdata.set(message.guild.id,{ID: IDU, addedBy: message.author.id, approvedOn: year + "-" + month + "-" + date},IDU);
   if(message.guild.member(IDU)) {
     var rolea = message.guild.roles.cache.get(db.RoleID);
    await message.guild.member(IDU).roles.add(rolea);
   }
   let channeledunvaildID = new MessageEmbed()
   .setDescription(`${user !== undefined ? `successfully added ${user.user.username}(**${IDU}**) to the list`:`successfully added **${IDU}** to the list`}`)
   .setColor(embedColor);
 
     return message.channel.send(channeledunvaildID).then((msg) => {

        setTimeout(function(){
            message.delete();
            msg.delete();
                  }, 4750);
     
   

     });
     }

}