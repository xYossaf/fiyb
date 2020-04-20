const { prefix,embedColor, owner } = require('../config');
const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    var author = message.guild.member(message.author);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("but you don't have enough permission(s) to run this command | Missing permission(s): `ADMINISTRATOR`");
    if (!args[0] || !args[1] ) return message.channel.send(`but you have to use the correct usage of this command. **${prefix}setup <channel name|ID or mention that approve confirmation will be at> <role @mention|ID that user will get>**`);
    var db = await client.appdata.get(message.guild.id);
    if(db.sud == false) {
        //first time
         let loading = new MessageEmbed()
        
        .setDescription(`<a:loading:701564177705205811> **Loading**`)
        .setColor(embedColor);
      message.channel.send(loading).then(async (msg) => {

        var channelstatus = false;
        var rolestatus = false;
       channelstatus = await CheckChannel(client,message,args[0],msg);
       rolestatus = await CheckRole(client,message,args[1],msg);
    if(channelstatus == true && rolestatus == true) {




        let caniem = new MessageEmbed()
        .setDescription(`do you want me to modify the role you provided`)
        .setColor(embedColor);
      msg.edit(caniem).then(async (m) => {

        await m.react("✅");
        await m.react("❌");
        let stopper = false;
        var continueAF = (reaction, usera) =>
        reaction.emoji.name == '✅' &&
        usera.id === message.author.id;
       
       var continueA = m.createReactionCollector(continueAF, {
          time: 30000,
        });
       
        var cancelAF = (reaction, userb) =>
        reaction.emoji.name == '❌' &&
        userb.id === message.author.id;
       
       var cancelA = m.createReactionCollector(cancelAF, {
          time: 30000,
        });

        continueA.on('collect', async () => {
            if(stopper == true) return;
          // change the role
          message.channel.send(" change it");
          stopper = true;
          const msdel = await message.channel.messages.fetch(m.id);

          msdel.reactions.resolve('❌').users.remove(msg.author);
          OverWriteD(client,message,m,true);
          msdel.reactions.resolve('✅').users.remove(msg.author);
          msdel.reactions.resolve('✅').users.remove(message.author);
        
      });

      cancelA.on('collect', () => {
      if(stopper == true) return;
     // dno't change it
   message.channel.send("don't change it");
   stopper = true;
    });


      });





    } else {
        let unknowerror = new MessageEmbed()
        
        .setDescription(`:x: unknown error has happend. contact <@${owner}> if this keeps happening. \n **${prefix}setup <channel name|ID or mention that approve confirmation will be at> <role @mention|ID that user will get>**`)
        .setColor(embedColor);
     return msg.edit(unknowerror).then((m) => { setTimeout(() => { message.delete();}, 10000);});
    }

    });
    } else {
       if(!args[2]) return message.channel.send(`missing argument -r after role`);
       if(args[2] == '-r') {
        let loading = new MessageEmbed()
        
        .setDescription(`<a:loading:701564177705205811> **resetng**`)
        .setColor(embedColor);
      message.channel.send(loading).then(async (msg) => {
       var channelstatus = await CheckChannel(client,message,args[0],msg);
      var  rolestatus = await CheckRole(client,message,args[1],msg);

     if(channelstatus == true && rolestatus == true) { OverWriteD(client,message,msg,true);
     } else return;


      });
       } else {
        return message.channel.send(`wrong argument. -r -> reset`);
       }
    }

    
};

exports.help = {
    name: 'setup',
    aliases: [],
    description: 'setup all the required channels and roles',
    usage: 'setup #<channel>1 #<channel>2 <@role>'
};

async function CheckChannel(client,message,args,msg) {
//check channel
var channelq = await message.mentions.channels.first();
if(!channelq) channelq = await message.guild.channels.cache.find(channel => channel.name === args);
if(!channelq) channelq = await message.guild.channels.cache.find(channel => channel.id === args);


let exit1 = new MessageEmbed()
        
        .setDescription(`:x: incorrect channel parameter. **${prefix}setup <channel name|ID or mention that approve confirmation will be at> <role @mention|ID that user will get>**`)
        .setColor(embedColor);
 if(!channelq) return msg.edit(exit1).then((m) => { setTimeout(() => {m.delete(); message.delete();}, 10000);});
 await client.appdata.set(message.guild.id,channelq.id,`modchannelID`);
 return true;
}


async function CheckRole(client,message,args,msg) {
    //check channel
    var rolesq = await message.mentions.roles.first();
    if(!rolesq) rolesq = await message.guild.roles.cache.find(channel => channel.name === args);
    if(!rolesq) rolesq = await message.guild.roles.cache.find(channel => channel.id === args);
    
    
    let exit1 = new MessageEmbed()
            
            .setDescription(`:x: incorrect role parameter. **${prefix}setup <channel name|ID or mention that approve confirmation will be at> <role @mention|ID that user will get>**`)
            .setColor(embedColor);
     if(!rolesq) return msg.edit(exit1).then((m) => { setTimeout(() => {m.delete(); message.delete();}, 10000);});
     await client.appdata.set(message.guild.id,rolesq.id,`RoleID`);
     return true;
    }
    
async function OverWriteD(client,message,msg,modiRole) {
    var db = await client.appdata.get(message.guild.id);
    var rolea = message.guild.roles.cache.find(channel => channel.id === db.RoleID);
    if(modiRole == true) {

        rolea.edit({
            name: "Verified",
            color: "#09ffd0",
            permissions: ['SEND_MESSAGES', 'VIEW_CHANNEL','CONNECT','SPEAK','READ_MESSAGE_HISTORY']
        });
    }

    await message.guild.members.cache.forEach(async (mUser) =>  {
     
      
       if(mUser.roles.cache.has(rolea.id)) return;
       if(mUser.bot||mUser.user.bot) return;
       mUser.roles.add(rolea,`Auto add | setup`);
    });
    message.guild.roles.everyone.setPermissions([]);

    message.guild.channels.create('Welcome', { reason: 'welcome' })
    .then((chann) => {
     client.appdata.set(message.guild.id,true,`sud`);
      let welcomechann = new MessageEmbed()
      .setDescription(`Thank you for joining **${message.guild.name}**.\n\n please wait until the verification process is complete`)
          .setColor(embedColor);
          chann.send(welcomechann);
          chann.updateOverwrite(chann.guild.roles.everyone, { VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true,SEND_MESSAGES: false});
          chann.updateOverwrite(rolea, { VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false,SEND_MESSAGES: false});
  })
    .catch(console.error);





}



