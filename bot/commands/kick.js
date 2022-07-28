const Discord = require("discord.js");
module.exports = {
  name: "kick",
  category: "Moderação",
  description: "Expulse um usuário mal-intencionado do seu servidor!",
  permissions: ["KICK_MEMBERS"],
  run: async (client, message, args ) => {
    let user = message.mentions.users ? message.mentions.users.first() : undefined;
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
        member
          .kick(args[1])
          .then(() => {
            const success = new Discord.MessageEmbed()
              .setTitle("Expulsão!")
              .setColor("#ff0000")
              .setDescription(
                `O usuário <@!${user.id}> foi expulso do servidor por <@!${message.author.id}>`
              );
            message.channel.send({ content: " ", embeds: [success] });
          })
          .catch(err => {
            const error1 = new Discord.MessageEmbed()
              .setTitle("Erro ao expulsar!")
              .setColor("#ff0000")
              .setDescription(
                "Eu não consegui expulsar o usuário devido ao seguinte erro: ```" +
                  err +
                  "```Tente colocar meu cargo no topo da lista e me dê a permissão de expulsar membros, obrigado!"
              );
            message.channel.send({ content: " ", embeds: [error1] });
          });
      } else {
        const error2 = new Discord.MessageEmbed()
          .setTitle("Erro ao expulsar!")
          .setColor("#ff0000")
          .setDescription(`O usuário <@!${user.id}> não está no servidor!`);
        message.channel.send({ content: " ", embeds: [error2] });
      }
    } else {
      const error3 = new Discord.MessageEmbed()
        .setTitle("Erro ao expulsar!")
        .setColor("#ff0000")
        .setDescription(`É necessário mencionar alguém para expulsar!`);
      message.channel.send({ content: " ", embeds: [error3] });
    }
  }
};
