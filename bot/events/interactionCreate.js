const utils = require("../utils")
module.exports = {
  once: false,
  callback:  async (client, interaction) => {
  try {
    if (interaction.isButton()) {
      try {
        require(`./bot/interactions/buttons/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./bot/interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else if (interaction.isSelectMenu()) {
      try {
        require(`./bot/interactions/menus/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./bot/interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else if (interaction.isCommand()) {
      try {
        require(`./bot/interactions/slash/${interaction.commandName}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./bot/interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else {
      return require(`./bot/interactions/error.js`)(
        client,
        interaction,
        "Ocorreu um erro desconhecido."
      );
    }
  } catch (err) {
    require(`./bot/interactions/error.js`)(
      client,
      interaction,
      "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
      err +
      "```"
    );
  }
}
}