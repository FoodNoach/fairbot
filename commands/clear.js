const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("U heeft geen permissies dit commando uit te voeren!");
 
    if (!args[0]) return message.channel.send("Geef een aantal op!");
 
    if (Number.isInteger(parseInt(args[0]))) {
 
        var amount = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(amount).then(() => {
 
            if (args[0] == 0) {
 
                message.channel.send(`Geef een minimun aantal berichten van 1!`).then(msg => msg.delete({timeout: 3000}));
           
            } else if (args[0] == 1) {
           
                message.channel.send(`Ik heb 1 bericht verwijderd.`).then(msg => msg.delete({timeout: 3000}));
           
            } else {
           
                message.channel.send(`Ik heb ${args[0]} berichten verwijderd.`).then(msg => msg.delete({timeout: 3000}));
           
            }
 
        });
 
    } else {
        return message.channel.send("Geef een getal op.");
    }
}

module.exports.help = {
    name: "clear"
}