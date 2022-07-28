const Discord = require("discord.js");
module.exports = {
	name: "upvote",
	description: "Vote em mim no Discord Bot List ou no Top.gg (se quiser, vote nos dois :) )!", 
	aliases: ['topgg', 'dbl', 'discord-bot-list', 'discordbotlist', 'vote', 'votar'],
	run: async (client, message, args) => {
		const embed = new Discord.MessageEmbed()
			.setTitle("Upvotes para mim!")
			.setDescription(
			"Você pode votar em mim no [Top.gg](https://top.gg/bot/831137997545275472) ou no [Discord Bot List](https://discord.ly/juni-bot) e me ajude a ser divulgado!"
			)
			.setThumbnail(client.user.displayAvatarURL())
			.setColor("RANDOM")

		message.channel.send(embed);
	}
}