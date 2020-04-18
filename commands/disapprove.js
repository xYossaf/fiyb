const fs = require('fs');
async function getData(client) {

   await fs.readFile("./list.json", (err, data) => {
      if (err) throw err;
      console.log("1 <o/");
      console.log(JSON.parse(data));
       return JSON.parse(data);
    });
  
  }

exports.run = async (client, message, args) => {
    var ids = await getData(); 
 console.log(ids);
    var author = message.guild.member(message.author);
    if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send("but you don't have enough permission(s) to run this command | Missing permission(s): `ADMINISTRATOR`");
    if (!args[0]) return message.channel.send("but you didn't mention or type ID of User who will become approved");
     var user = await GetUser(client,message, args);
    var status = false;
    var stat = true;
    var IDuser = user == undefined ? args[0].replace(/[<@!>]/g, ''):user.id;
    console.log("7");
    for (let i in ids.table) {
        if (ids.table[i].ID !== IDuser) {
         status = true;
         console.log(i + " lol");
        } else {
            stat = false;
        }
        console.log("13 " + stat);
         if(i == "random") {
            console.log("12 " + status);
            console.log("14 " + stat);
             if (stat !== false) {
                 console.log("1");
                message.channel.send(`sorry, but **${IDuser}** doesn't seem to be in my database`);
             } else {
                console.log("2");
                 RemoveUser(client,message,IDuser,user);
             }
         }
      }
   
};

exports.help = {
    name: 'disapprove',
    aliases: [],
    description: 'removes a person from the list',
    usage: 'disapprove <ID>'
};


async function GetUser(client,message, args) {
    console.log("3");
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


async function RemoveUser(client,message,IDuser,user) {
    var ids = getData(); 
    console.log("4");
    for (let i in ids.table) {
        if (ids.table[i].ID == IDuser) {
            ids.table.splice(i, 1);
         message.channel.send(`**${IDuser}** has been removed from my list`);

         var jsoa = JSON.stringify(ids);

         fs.writeFile("./list.json", jsoa, 'utf8', function(err) {
            if (err) throw err;
            message.channel.send("it removed?!?!");
            });
           
        } 
        if(ids.table.length == i) {
            console.log("5");
        }
      }

}

