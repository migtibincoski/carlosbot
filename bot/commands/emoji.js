const Discord = require("discord.js");

module.exports = {
  name: "emoji",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `**${message.author.username}, a sintaxe correta é:** ` +
          "`" +
          client.prefix +
          "emoji <nomedoemoji>`"
      );
    let emoji =
      message.guild.emojis.cache.find(emoji => emoji.name === args.join("_").replace("<:", "").replace("<a:", "").replace(">", "").split(":")[0]) ||
      message.guild.emojis.cache.find(emoji => emoji.id === args[0]);

    if (!emoji) {
      message.channel.send(
        "`" + args[0] + "` **não é um emoji deste servidor.**"
      );
    } else if (emoji.animated === true) {
      message.channel.send(
        `<a:${args[0]}:${emoji.id}> - URL: https://cdn.discordapp.com/emojis/${
          emoji.id
        }.gif`
      );
    } else {
      message.channel.send(
        `<:${args[0]}:${emoji.id}> - URL: https://cdn.discordapp.com/emojis/${
          emoji.id
        }.png`
      );
    }
  }
};
