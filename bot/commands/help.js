const Discord = require("discord.js");
const { filterByCategory } = require("../../utils/autoload.js")
module.exports = {
  name: "help",
  description:
    "Veja todos os meus comandos ou as informaçõe de um comando específico!",
  aliases: ["commands"],
  usage: "<nome do comando (opcional)>",
  run: async (client, message, args) => {
    /*const data = [];
    const { commands } = client;

    if (!args.length) {
      data.push("Esta é a lista de todos os meus comandos:\n");
      data.push(commands.map(command => command.name).join(", "));
      data.push(
        `\nVocê pode enviar \`${client.prefix}help [nome do comando]\` para obter informações de um comando específico!`
      );
      
      const embed = new Discord.MessageEmbed()
      .setTitle("Você pediu ajuda?")
      .setDescription(data)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png" }))
      .setThumbnail(client.user.displayAvatarURL())
      
      return message.channel.send(embed)
    }
    
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('este não é um comando válido!');
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png" }))
    .setTitle("Você pediu ajuda?")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Nome do comando", `${command.name}`)
    .setFooter("Você também pode ver todos os meus comandos com " + client.prefix + "help !")

    if (command.aliases) embed.addField(`Aliases (sinônimos do comando)`, `${command.aliases.join(', ')}`);
    if (command.category) embed.addField(`Categoria`, `${command.category}`)
    if (command.description) embed.addField(`Descrição`, `${command.description}`);
    if (command.usage) {
      embed.addField(`Exemplo de uso`, `\`${client.prefix}${command.name} ${command.usage}\``)
    } else {
      embed.addField(`Exemplo de uso`, `\`${client.prefix}${command.name}\``)
    }

    embed.addField(`Cooldown`, `${command.cooldown || 3} segundo(s)`);

    message.channel.send(embed);*/

    const help = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
    .setTitle("Você pediu ajuda?")
    .setThumbnail(client.user.displayAvatarURL())
    .addField("Comandos de Diversão", `${filterByCategory(client, "fun").map(cmd => cmd.name).join(", ") || "Nenhum comando disponível para esta categoria!"}`)
    .addField("Comandos de Economia", `${filterByCategory(client, "economy").map(cmd => cmd.name).join(", ") || "Nenhum comando disponível para esta categoria!"}`)
    .addField("Comandos de Moderação", `${filterByCategory(client, "moderation").map(cmd => cmd.name).join(", ") || "Nenhum comando disponível para esta categoria!"}`)
    .addField("Comandos de Informação", `${filterByCategory(client, "information").map(cmd => cmd.name).join(", ") || "Nenhum comando disponível para esta categoria!"}`)
    .addField("Comandos de Configuração", `${filterByCategory(client, "configuration").map(cmd => cmd.name).join(", ") || "Nenhum comando disponível para esta categoria!"}`)
    .addField("Comandos gerais", `${filterByCategory(client, undefined).map(cmd => cmd.name).join(", ") || 'Nenhum comando disponível para esta categoria!'}`)
    .setDescription("Selecione uma categoria para ver os comandos.")

    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('help')
					.setPlaceholder('💻 Selecione uma Categoria')
					.addOptions([
						{
							label: 'Diversão',
							description: 'Veja alguns comandos pra rir e jogar mini-games!',
							value: 'help_fun',
              emoji: "🎉"
						},
						{
							label: 'Economia',
							description: 'This is also a description',
							value: 'help_economia',
              emoji: '💲'
						},
						{
							label: 'Moderação',
							description: 'This is also a description',
							value: 'help_moderacao',
              emoji: '🔨'
						},
						{
							label: 'Informação',
							description: 'This is also a description',
							value: 'help_info',
              emoji: 'ℹ️'
						},
						{
							label: 'Configuração',
							description: 'This is also a description',
							value: 'help_config',
              emoji: '⚙️'
						},
						{
							label: 'Miscelânea (outros)',
							description: 'This is also a description',
							value: 'help_other',
              emoji: '🔁'
						}
					]),
			);
    
    message.channel.send({ content: " ", embeds: [help], components: [row] })
  }
};
