const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var staffHelp = "**Staffhelp** \n\n Hieronder zie je een lijst met alle commando's! \n\n **-staffhelp** Krijg een bericht met alle staffcommando's! \n **-warn** Waarschuw een gebruiker. Bij 3x een waarschuwing wordt de gebruikers automatisch gekickt! \n **-tempmute** Mute een gebruiker voor een bepaalde tijd. Opgeven in tijd. s = sec, m = min, h = uur\n **-kick** Kickt iemand van de discord server! \n **-clear** Clear een aantal berichten. Bijvoorbeeld -clear 10 \n **-ban** Ban iemand van de discord server! " 

    var icon = message.guild.iconURL()

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("U heeft geen permissies dit commando uit te voeren!");

    var staffPromt = new discord.MessageEmbed()
    .setColor("#e86950")
    .setTitle("Reageer binnen 30 seconden!")
    .setDescription(`Weet je zeker dat je de lijst met staff commando's wilt ontvangen?`)
    .setFooter("FairKingdom Bot", icon); 

    message.channel.send(staffPromt).then(async msg =>{

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if(emoji === "✅"){

            msg.delete();

            message.channel.send(staffHelp);



        }else if(emoji === "❌"){

            msg.delete();

            return message.reply("De lijst met commando's wordt niet verzonden!").then(m => m.delete(5000));

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
    name: "staffhelp"
}