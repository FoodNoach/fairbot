const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 var icon = message.guild.iconURL()
    var kingdomEmbed = new discord.MessageEmbed()
       .setTitle("Serverinformatie")
       .setDescription("Dit zijn de functies van ranks in kingdoms!")
       .setColor("#e86950")
       .addField("**Koning of Koningin**", "Mag alles, beslist over alles en regeert het land!")
       .addField("**Prins of Prinses**", "Zoon of dochter van de koning, mag bijna net zoveel alleen geen mensen promoveren.")
       .addField("**Raadgever**", "Geeft raad over bijvoorbeeld alliances, oorlogen en handel!")
       .addField("**Hertog of Hertogin**", "Besluit over kleine dingen in overleg met de koning. Heeft vaak een eigen stuk grond waar hij of zij de baas is!")
       .addField("**Generaal**", "Beslist over het leger en voert deze aan in de strijd tegen andere Kingdoms!")
       .addField("**Soldaat**", "Voert de strijd in het leger en vecht voor zijn rijk!")
       .addField("**Burger**", "Leeft rustig zijn of haar eigen leven en doet alles om zijn of haar koning(in) te dienen!")
       .setFooter("FairKingdom Bot", icon)
       .setTimestamp();

    return message.channel.send(kingdomEmbed);
}

module.exports.help = {
    name: "kingdomranks"
}