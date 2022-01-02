const Discord = require("discord.js");
module.exports = {
  name: "clear",
  permissions: ['MANAGE_MESSAGES'],
  description: "Apague várias mensagens de um canal de uma vez só!",
  args: true,
	category: "moderation",
  usage: "<quantidade de mensagens a serem excluídas>",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.reply(
        "eu não tenho autoridade! Peça para um moderador me dar a permissão de `Gerenciar Mensagens`..."
      );
    if (!args[0]) return message.reply("Informe a quantidade de mensagens!!");
    if (isNaN(args[0]) || args[0] <= 0)
      return message.reply(
        "Me informe a quantidade de mensagens corretamente!!"
      );
    if (args[0] >= 100) {
      message.delete();
      message.channel.bulkDelete(99, true).then(data => {
        message.channel.send(
          ":tada: <@!" +
            message.author.id +
            "> apagou " +
            data.size +
            " mensagens deste canal de texto!"
        );
      });
    } else {
      message.channel.bulkDelete(parseInt(args[0]) + 1, true).then(data => {
        message.channel.send(
          ":tada: <@!" +
            message.author.id +
            "> apagou " +
            parseInt(args[0]) +
            " mensagens deste canal de texto!"
        );
      });
    }
  }
};
