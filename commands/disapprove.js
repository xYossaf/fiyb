const { MessageEmbed } = require('discord.js');
const {embedColor} = require('../config');
var ids;
exports.run = async (client, message, args) => {
    var author = message.guild.member(message.author);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("but you don't have enough permission(s) to run this command | Missing permission(s): `ADMINISTRATOR`");
    if (!args[0]) return message.channel.send("but you didn't mention or type ID of User who will become approved");
    var user = await GetUser(client,message, args);
    console.log(user);
    console.log(user.bot||user.user.bot);
    if(user) {
      if(user.bot||user.user.bot) return message.channel.send("sorry but you can't approve a bot");
    }

    var checkUserD = await checkUser(client,message,user !== undefined ? user.id||user.user.id:args[0].replace(/[<@!>]/g, ''),user);    
    return RemoveUser(client,message,user,user !== undefined ? user.id||user.user.id:args[0].replace(/[<@!>]/g, ''),checkUserD);
};

exports.help = {
    name: 'disapprove',
    aliases: [],
    description: 'removes a person from the list',
    usage: 'disapprove <ID>'
};


async function GetUser(client,message, args) {
    let User = await message.guild.member(message.mentions.users.first());
    if (User) return User;

    if (!User) {
      let IDCeckking = args[0].replace(/[<@!>]/g, '');
      User = await message.guild.member(IDCeckking);
      if (User == null) {
        return undefined;
      }
      return User;
    
  }
}


async function RemoveUser(client,message,user,IDU,status) {
      console.log(`list ${status.inList}`);
      console.log(`server ${status.inServer}`);
      if(status.inList == true) {

       await client.appdata.remove(message.guild.id,IDU);
        let channeledunvaildID = new MessageEmbed()
        .setDescription(`${user !== undefined ? `successfully removed ${user.user.username}(**${IDU}**) to the list`:`successfully added **${IDU}** to the list`}`)
        .setColor(embedColor);
      
          return message.channel.send(channeledunvaildID).then((msg) => {
     
             setTimeout(function(){
                 message.delete();
                 msg.delete();
                       }, 4750);
          
        
     
          });
      

      } else {
        return message.channel.send(`sorry but **${IDU}** isn't in my list`);
    }
}

async function checkUser(client,message,IDU,user) {
    var inServer;
    var db;
    let stb = false;
     db = await client.appdata.get(message.guild.id);
    if(db.a == false) return message.channel.send(`you can't remove someone when the list is empty. try added some poeple`);
     let temps = db[`${IDU}`] == undefined ? false:db[`${IDU}`].ID == IDU ? true:false;
     if (temps == true) {
       inServer = message.guild.member(IDU) !== null ?  true:false;
       return {
        inList: temps,
        inServer: inServer
     };     
   
     } else { 
      return message.channel.send(`sorry but **${IDU}** isn't in my list`);

     }
}
