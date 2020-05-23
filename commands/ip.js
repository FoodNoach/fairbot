const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

 return message.channel.send("Ons server IP : mc01.royalehosting.nl:20467");
}

module.exports.help = {
    name: "ip"
}