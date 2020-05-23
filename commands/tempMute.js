const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("U heeft geen permissies dit commando uit te voeren!");

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Ik heb geen permissies hiervoor!");

    if(!args[0]) return message.channel.send("Geef een gebruiker op!");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    if(!mutePerson) return message.channel.send("Gebruiker niet gevonden!");

    if(mutePerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze gebruiker niet muten");

    var muteRole = message.guild.roles.cache.get('713684320895893536');

    if(!muteRole) return message.channel.send("De rol muted is niet gevonden!");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("Geef een tijd op!");

    await(mutePerson.roles.add(muteRole.id));
    message.channel.send(`${mutePerson} is gemuted voor : ${muteTime}`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);

        message.channel.send(`${mutePerson} is geunmuted!`);

    }, ms(muteTime));

    
}

module.exports.help = {
    name: "tempmute"
}