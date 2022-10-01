module.exports = {
  name: "avatar",
  category: "information",
  usage: "<mencione um usuário (opcional)>",
  description: "Pegue a foto do perfil de um usuário!",
  run: async (client, message, args) => {
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) || client.users.cache.find(User => User.tag === args[0]) ||
      message.author;

    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    message.reply({
      content: "<@!" + message.author.id + ">", embeds: [{
        title: `Avatar de ${user.tag}`,
        description: `Dê uma olhada no perfil de ${user.tag}!`,
        image: {
          url: `${avatar}`
        },
        footer: {
          name: `Solicitado por ${message.author.tag}`,
          icon_url: `${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`
        }
      }]
    });
  }
};
