exports.run = async (client, message, args) => {

   await client.appdata.set(message.guild.id,{a:false,sud:false});
   message.channel.send("done lol");
};

exports.help = {
    name: 'reset',
    aliases: [],
    description: 'reset',
    usage: 'reset'
};