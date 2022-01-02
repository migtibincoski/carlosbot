const Discord = require("discord.js");

const date = new Date();

module.exports = {
	name: "serverinfo",
	aliases: ['guildinfo', 'server'],
	description: "Veja as informações deste servidor!",
	run: async (client, message, args) => {
		const millis = new Date().getTime() - message.guild.createdAt.getTime();
		const days = millis / 1000 / 60 / 60 / 24;
		const guildOwner = client.users.cache.get(message.guild.ownerId)

		if (message.guild.verificationLevel == "NONE") {
			const verificationlevel = "Nenhum";
		} else if (message.guild.verificationLevel == 'LOW') {
			const verificationlevel = "Baixo";
		} else if (message.guild.verificationLevel == "MEDIUM") {
			const verificationlevel = "Médio";
		} else if (message.guild.verificationLevel == "HIGH") {
			const verificationlevel = "Alto";
		} else if (message.guild.verificationLevel == "VERY_HIGH") {
			const verificationlevel = "Muito Alto";
		}

			let systemchannel = "Não definido"
		if(message.guild.systemChannelID != null) systemchannel = '<#' + message.guild.systemChannelID + ">"

		const embed = new Discord.MessageEmbed()
			.setThumbnail(message.guild.iconURL)
			.setAuthor(
			message.author.username,
			message.author.displayAvatarURL())
			.setColor("cyan")
			.addField("Nome do Servidor", `\`${message.guild.name}\``, true)
			.addField("ID do Servidor", message.guild.id, true)
			.addField(
			"Dono",
			`${guildOwner.username +
				"#" +
				guildOwner.discriminator || "❌ Dono Não Encontrado"}`,
			true
			)
			.addField(
			"ID do Dono",
			`${guildOwner.id || "❌ Dono Não Encontrado"}`,
			true
			)
			.addField("Data de Criação", `${new Date(message.guild.createdAt)}`, true)
			.addField("Tempo de Criação", `${days.toFixed(0)}`, true)
			.addField("Região", `${message.guild.region}`, true)
			.addField("Nível de Verificação", `${message.guild.verificationLevel.replace("NONE", "Nenhum").replace("LOW", "Baixo").replace("MEDIUM", "Médio").replace("VERY_HIGH", "Muito alto").replace("HIGH", "Alto")}`, true)
			.addField(
			"Quantidade de Canais de Texto",
			`${message.guild.channels.cache.filter(m => m.type === "text").size}`,
			true
			)
			.addField(
			"Quantidade de Canais de Voz",
			`${message.guild.channels.cache.filter(m => m.type === "voice").size}`,
			true
			)
			.addField("Quantidade de Membros", `${message.guild.memberCount}`, true)
			.addField(
			"Quantidade de Cargos",
			`${message.guild.roles.cache.size - 1}`,
			true
			)
	.addField("Canal de mensagens do Sistema", `${systemchannel}`)
		message.channel.send({ content: " ", embeds:[embed] });
	}
}