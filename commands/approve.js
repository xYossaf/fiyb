const { RichEmbed } = require('discord.js');
const {embedColor} = require('../config');
const fs = require('fs');
var ids = getData();

exports.run = async (client, message, args) => {

  

    var status = false;
    var author = message.guild.member(message.author);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("but you don't have enough permission(s) to run this command | Missing permission(s): `ADMINISTRATOR`");
    if (!args[0]) return message.channel.send("but you didn't mention or type ID of User who will become approved");
     var user = await GetUser(client,message, args);
 //   if(user.bot) return message.channel.send("sorry but i can't approve bots");

     if (args[0].length == 18 && !isNaN(args[0]) && user == undefined) {
        let areYouSure = new RichEmbed()
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

        let channeledunvaildID = new RichEmbed()
            .setTitle(`**${client.emojis.get("541327863668801545")}**  Process canceled`)
            .setDescription(`**${args[0]}** won't be added to the list`)
            .setColor(embedColor);
          
     return msg.edit(channeledunvaildID);

    });

      });
    } else if (user !== undefined) {

      if (user.id == message.author.id) return message.channel.send("sorry but you can't approve yourself :(");
  
      AddUser(client,message,user.id,user);

    }


     

};

exports.help = {
    name: 'approve',
    aliases: [],
    description: 'add a person to the list',
    usage: 'approve <ID>'
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

async function AddUser(client,message,IDU,user) {
  var stat = false;
  var supstat = false;
  var aaa;
  let obj = {
    table: []
 };
 console.log(JSON.stringify(ids));
  if(!ids.table || ids.table.length == 0){ ids = obj; supstat = true;}
  console.log("super " +supstat);
  for (let i in ids.table) {
    if (ids.table[i].ID == IDU) {
    user == undefined ?  message.channel.send(`sorry, but ${user.username} (**${IDU}**) is already listed`):message.channel.send(`sorry, but **${IDU}** is already listed`);
    aaa = true;
    } else  stat = true;
  
  console.log("sss   " +stat !== true && i == "random");
   if(((stat == true && i == "random") || (supstat == true)) && aaa !== true) {
    supstat = false;
   message.channel.send("works");

   let date_ob = new Date();
   let date = ("0" + date_ob.getDate()).slice(-2);
   let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
   let year = date_ob.getFullYear();

   ids.table.push({ID: IDU, addedBy: message.author.id, approvedOn: year + "-" + month + "-" + date});
   var jsoa = JSON.stringify(ids);

   fs.writeFile("./list.json", jsoa, 'utf8', function(err) {
      if (err) throw err;
      message.channel.send("it worked?!?!");
      console.log(ids);
      });

   }

  }
  
}






/*
async function AddUser(client,message,IDU,user) {
  var stat = false;
  var ll = 1;
  if (ids.table[0]){
    for (let i in ids.table) {
        if (ids.table[i].ID == IDU) {
        user ?  message.channel.send(`sorry, but ${user.username} (**${IDU}**) is already listed`):message.channel.send(`sorry, but **${IDU}** is already listed`);
         
        } else { stat = true; ll++;}
      
    if(stat == true && i == "random" && ll == 1) {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();

      let obj = {
        table: []
     };
    if(ids.table[0]) {
       let temp = ids;
       ids.table.push({ID: IDU, addedBy: message.author.id, approvedOn: year + "-" + month + "-" + date});
        console.log(ids);
        var jsoa = JSON.stringify(ids);

        fs.writeFile("./list.json", jsoa, 'utf8', function(err) {
           if (err) throw err;
           message.channel.send("it worked?!?!");
           });
         /////////////////////////////////// not used
           fs.readFile('./list.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); //now it an object
            obj.table.push({id: 2, square:3}); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
        }});
        ////////////////////
    
    } else {
     obj.table.push({ID: IDU, addedBy: message.author.id, approvedOn: year + "-" + month + "-" + date});
     var json = JSON.stringify(obj);
     
     fs.writeFile("./list.json", json, 'utf8', function(err) {
        if (err) throw err;
        message.channel.send("it worked?!?!");
        });
    }
  }
  }
} else {
  let obj = {
    table: []
 };

 let date_ob = new Date();
 let date = ("0" + date_ob.getDate()).slice(-2);
 let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
 let year = date_ob.getFullYear();


  obj.table.push({ID: IDU, addedBy: message.author.id, approvedOn: year + "-" + month + "-" + date});
  var jsona = JSON.stringify(obj);
  
  fs.writeFile("./list.json", jsona, 'utf8', function(err) {
     if (err) throw err;
     message.channel.send("it worked?!?!");
     });
}
}
*/


async function getData(client) {

 await fs.readFile("./list.json", (err, data) => {
    if (err) throw err;
     return JSON.parse(data);
  });

}