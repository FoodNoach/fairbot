const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();


fs.readdir("./commands/", (err, files) => {
    

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f,i) => {
        
        var fileGet = require(`./commands/${f}`);
        console.log(`De file : ${f} is geladen!`);

        client.commands.set(fileGet.help.name, fileGet);

    });

});

client.login(process.env.token);

client.on("ready", async () => {

   console.log(`${client.user.username} is online!`);
   client.user.setActivity("op FairKingdom!", {type: "PLAYING"});

}); 

client.on("guildMemberAdd", member =>{

    var role = member.guild.roles.cache.get(`699979098444922940`);

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get(`699978399627870220`);

    if(!channel) return;

    channel.send(`Welkom op de officiële FairKingdom discord ${member}! We wensen je een mooie tijd toe!`);

})



client.on("message", async message => {

   if(message.author.bot) return;

   if(message.channel.type == "dm") return;

   var prefix = botConfig.prefix;

   if(!message.content.startsWith(prefix)) return;

   var messageArray = message.content.split(" ");

   var command = messageArray[0];

   var args = messageArray.slice(1);

   var commands = client.commands.get(command.slice(prefix.length));

   if(commands) commands.run(client,message, args);




});

async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}





