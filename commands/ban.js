const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Bane um usuário chato do seu servidor para que não volte mais!",
  args: true,
	category: "moderation",
  usage: '<mencione o usuário a ser banido>',
  permissions: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(user => user.id == args[0]);
    const motiv = args.join(" ")
    const motivo = motiv.replace(`${args[0]}`, "")
    if (!target) return message.reply("você precisa mencionar alguém para banir!");
    if (!target.bannable) return message.reply(":x: Eu não posso banir este usuário! Ele pode ter um cargo maior que o meu, ou eu não tenha permissão pra banir!");
    if (!target) return message.reply("Membro não encontrado!");
    target.ban({ reason: motivo }).then(() => {
      message.reply(`você baniu com sucesso o usuário ** ${target.user.tag}**!`);
      console.log(target)
    })
    .catch(err => {
      message.reply("Mil desculpas, <@! " + message.author.id + "> mas eu não consegui banir este usuário devido ao seguinte erro: ```" + err + "```");
    });
  }
};
