const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 var icon = message.guild.iconURL()
    var memberEmbed = new discord.MessageEmbed()
       .setTitle("Membercount")
       .setDescription("Hier is de membercount van de FairKingdom Discord!")
       .setColor("#e86950")
       .addField("Totaal Aantal :", message.guild.memberCount)
       .addField("Aantal Mensen :", message.guild.members.cache.filter(member => !member.user.bot).size)
       .addField("Aantal Bots :", message.guild.members.cache.filter(member => member.user.bot).size)
       .setThumbnail(icon)
       .setFooter("FairKingdom Bot", icon)
       .setTimestamp();

    return message.channel.send(memberEmbed);
}

module.exports.help = {
    name: "members"
}