module.exports = async (client, interaction) => {
  try {
    if (interaction.isButton()) {
      try {
        require(`../interactions/buttons/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`../interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
            err +
            "```"
        );
      }
    } else if (interaction.isSelectMenu()) {
      try {
        require(`../interactions/menus/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`../interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
            err +
            "```"
        );
      }
    } else if (interaction.isCommand()) {
      try {
        require(`../interactions/slash/${interaction.commandName}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`../interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
            err +
            "```"
        );
      }
    } else {
      return require(`../interactions/error.js`)(
        client,
        interaction,
        "Ocorreu um erro desconhecido."
      );
    }
  } catch (err) {
    require(`../interactions/error.js`)(
      client,
      interaction,
      "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
        err +
        "```"
    );
  }
};
