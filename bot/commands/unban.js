const Discord = require("discord.js");

module.exports = {
	name: "unban",
	aliases: ['desbanir', 'deletar-ban', 'deletar-banimento'],
	args: true,
	usage: "<id do usuário a ser desbanido>",
	permissions: ['BAN_MEMBERS', 'KICK_MEMBERS'],
	run: async (client, message, args) => {
		const userUnban = `${args[0]}`;
		if (!userUnban) {
			message.reply("envie o **ID** de alguém para desbanir!");
			return;
		}
		try {
			message.guild.members.unban(userUnban);
			const success = new Discord.MessageEmbed()
			.setTitle("Desbanimento!")
			.setColor("#008000")
			.setDescription(
				`O usuário <@!${userUnban.user.id}> foi desbanido do servidor por <@!${message.author.id}>`
			);
			message.channel.send(success);
		} catch (err) {
			if(err == "TypeError: Cannot read property 'id' of undefined") return message.channel.send(":x:")

			const error = new Discord.MessageEmbed()
			.setTitle("Erro ao desbanir!")
			.setColor("#ff0000")
			.setDescription(
				"Eu não consegui desbanir o usuário devido ao seguinte erro: ```" +
				err +
				"```Tente colocar meu cargo no topo da lista e me dê a permissão de expulsar membros, obrigado!"
			);
			message.channel.send(error);
		}
	}
}