const figlet = require("figlet");

module.exports = {
  name: "ascii",
  description: "Transforme um texto em ASCII e mostre aos seus amigos a sua habilidade de digitação!",
  args: true,
	category: "fun",
  usage: '<texto a ser convertido para ASCII>',
  run: async (client, message, args) => {

    const msg = await args.join(" ");

    figlet.text(msg, function(err, data) {
      if (err) return message.reply(":x: Desculpe, mas ocorreu um erro ao executar este comando: ```" + err + "```")
      if (data.length > 1000) return message.reply("Por favor, envie um texto menor, porque este é muito grande para mim!");
      message.reply("<@!" + message.author.id + "> | Mostre suas habilidades com o teclado para todos! || E faça o favor de deixar os créditos né ;) ||```" + data + "```");
    });
  }
};
