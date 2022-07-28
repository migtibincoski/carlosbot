const Discord = require("discord.js");

module.exports = {
  name: "ping",
  category: undefined,
  description: "Veja a minha latência!",
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      "<a:bolinhas_gif:870705042443886633> Carregando latência... <a:bolinhas_gif:870705042443886633>"
    );

    msg.edit(
      `🏓 **Ping Pong!** Veja a minha velocidade!\nLatência da minha Host: **${msg.createdTimestamp -
        message.createdTimestamp}ms.**\nLatência da API do Discord: **${Math.round(
        client.ws.ping
      )}ms**`
    );
  }
};
