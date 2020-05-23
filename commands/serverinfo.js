const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 var icon = message.guild.iconURL()
    var serverEmbed = new discord.MessageEmbed()
       .setTitle("Serverinformatie")
       .setDescription("Dit is de informatie over FairKingdom!")
       .setColor("#e86950")
       .addFields (
           {name: "Servernaam :", value:"FairKingdom"},
           {name: "IP :", value:"mc01.royalehosting.nl:20467"},
           {name: "Gemaakt op :", value:"17 Mei 2020"},
           {name: "Owner", value:"BakkerJesse"},
       )
       .setThumbnail(icon)
       .setFooter("FairKingdom Bot", icon)
       .setTimestamp();

    return message.channel.send(serverEmbed);
}

module.exports.help = {
    name: "serverinfo"
}