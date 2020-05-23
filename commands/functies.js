const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 var icon = message.guild.iconURL()
    var functiesEmbed = new discord.MessageEmbed()
       .setTitle("Serverinformatie")
       .setDescription("Dit zijn de functies van staff!")
       .setColor("#e86950")
       .addField("**Owner**", "Beheert de server en mag beslissen over alles!")
       .addField("**Developer**", "Beheert de plugins en veranderdt dingen in de console")
       .addField("**Admin**", "Is er voor grote dingen. Bijvoorbeeld om mensen te bannen.")
       .addField("**Moderator**", "Maakt kleine onevenheden goed. Bijvoorbeeld als er gegrieft is!")
       .addField("**Helper**", "Voor de kleinste dingen! Zoals mensen te kicken en de chat netjes te houden!")
       .setFooter("FairKingdom Bot", icon)
       .setTimestamp();

    return message.channel.send(functiesEmbed);
}

module.exports.help = {
    name: "functies"
}