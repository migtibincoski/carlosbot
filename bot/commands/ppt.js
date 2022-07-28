const Discord = require("discord.js");

module.exports = {
  name: "pedra-papel-tesoura",
  args: true,
  usage: "<mencione um adversário>",
  category: "fun",
  aliases: ["ppt", "RockPaperScissors"],
  description: "Jogue Pedra Papel Tesoura com alguém deste servidor!",
  run: async (client, message, args) => {
    
    message.channel.send('Ótimo! Escolha "cara" ou "coroa" (envie no chat)!')

    const filter = msg => msg.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 })

    collector.on('collect', m => {
      message.channel.send("Você escolheu " + m)
    })

    collector.on("end", collected => {
      message.channel.send(`${collected}`)
    })
  }
};
