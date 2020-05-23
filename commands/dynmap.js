const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 return message.channel.send("De link voor onze dynmap : http://185.8.177.26:20271/");
}

module.exports.help = {
    name: "dynmap"
}