const Discord = require("discord.js");
module.exports = {
  name: "avatar",
	category: "information",
  usage: "<@mencione um usuário (opcional)>",
  description: "Pegue a foto do perfil de um usuário!",
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new Discord.MessageEmbed()
    .setTitle("Avatar de " + user.username)
    .setURL(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor("#008000")
      .setAuthor(
        `${user.tag}`,
        user.displayAvatarURL({ dynamic: true, size: 512 })
      )
      .setDescription(`Caso queira baixar a foto, aperte [aqui](${avatar})`)
      .setImage(avatar)

    message.reply({ content: "<@!" + message.author.id + ">", embeds: [embed] });
  }
};
