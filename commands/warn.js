const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf-8"));

module.exports.run = async(bot, message, args) => {

    var icon = message.guild.iconURL()

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("U heeft geen permissies dit commando uit te voeren!");

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Ik heb geen permissies hiervoor!");

    if(!args[0]) return message.channel.send("Geef een gebruiker op!");

    if(!args[1]) return message.channel.send("Geef een reden op!");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var reason = args.slice(1).join(" ");

    if(!warnUser) return message.channel.send("Gebruiker niet gevonden!");

    if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze gebruiker geen waarschuwing geven!");

    if(!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err);
    });

    var embed  = new discord.MessageEmbed()
        .setColor("#e86950")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gewarnt: ** ${warnUser} (${warnUser.id})
        **Gewarnt door: ** ${message.author}
        **Reden: ** ${reason}
        **Totaal aantal warns :** ${warns[warnUser.id].warns}`)
        .setFooter("FairKingdom Bot", icon);

        message.channel.send(embed);

        if(warns[warnUser.id].warns == 2){

            var warnEmbed = new discord.MessageEmbed()
            .setColor("#e86950")
            .setDescription("Kijk uit!")
            .addField("Bericht", "U heeft nog maar 1 waarschuwing voordat u gekickt wordt!");

            message.channel.send(warnEmbed);


        } else if (warns[warnUser.id].warns == 3){
            message.guild.member(warnUser).kick(reason);
            message.channel.send(`${warnUser} is gekickt van de FairKingdom Discord vanwege een te hoog aantal waarschuwingen!`);

        }
   
    


}

module.exports.help = {
    name: "warn"
}