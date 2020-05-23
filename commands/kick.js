const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {



    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("U heeft geen permissies dit commando uit te voeren!");

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Ik heb geen permissies hiervoor!");

    if(!args[0]) return message.channel.send("Geef een gebruiker op!");

    if(!args[1]) return message.channel.send("Geef een reden op!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var reason = args.slice(1).join(" "); 

    var icon = message.guild.iconURL()

    if(!kickUser) return message.channel.send("Gebruiker niet gevonden!");

    if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry u kunt deze gebruiker niet kicken!");

    var embedPromt = new discord.MessageEmbed()
        .setColor("#e86950")
        .setTitle("Reageer binnen 30 seconden!")
        .setDescription(`Wil je ${kickUser} kicken?`)
        .setFooter("FairKingdom Bot", icon);

    var embed  = new discord.MessageEmbed()
        .setColor("#e86950")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gekickt: ** ${kickUser}
        **Gekickt door: ** ${message.author}
        **Reden: ** ${reason}`)
        .setFooter("FairKingdom Bot", icon);


    message.channel.send(embedPromt).then(async msg =>{

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅"){

            msg.delete();

            kickUser.kick(reason).catch(err => { 
                if (err) return message.channel.send("Er is een fout opgetreden!");
            });

            message.channel.send(embed);



        }else if(emoji === "❌"){

            msg.delete();

            return message.channel.send("De kick is geanuleerd!").then(m => m.delete(5000));

        }

    });
}

async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}







module.exports.help = {
    name: "kick"
}