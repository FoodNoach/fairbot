const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var icon = message.guild.iconURL();

    var text = "**Help** \n\n Hieronder zie je een lijst met alle commando's! \n\n **-help** Laat een bericht zien met alle commando's! \n **-serverinfo** Laat een lijst zien met alle informatie over de server! \n **-members** Laat een lijst zien met alle informatie over de server! \n **-kingdomranks** Laat een lijst zien met alle functies binnen een kingdom en wat ze doen! \n **-ip** Laat het IP adress van de server zien! \n **-functies** Laat alle functies van de staff zien en wat ze doen! \n **-dynmap** Geeft een link voor onze dynmap! \n **-staffhelp** Laat een lijst zien met alle staffcommando's!  " 


    message.channel.send(text);
}

module.exports.help = {
    name: "help"
}