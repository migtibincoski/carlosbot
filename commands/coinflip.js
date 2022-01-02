const Discord = require('discord.js');

module.exports = {
	name: 'coinflip',
	aliases: ['cara-ou-coroa'],
	category: 'fun',
	description: 'Jogue Cara ou Coroa, perfeito se você não tiver uma moeda!',
	run: async (client, message, args) => {
		const cara = new Discord.MessageButton()
			.setID('coinflip_cara')
			.setStyle('blurple')
			.setLabel('Cara')
			.setEmoji('🙂');

		const coroa = new Discord.MessageButton()
			.setID('coinflip_coroa')
			.setStyle('blurple')
			.setLabel('Coroa')
			.setEmoji('👑');

		const row = new Discord.MessageActionRow().addComponents([cara, coroa]);

		const embed = new Discord.MessageEmbed()
			.setTitle('Cara ou Coroa?')
			.setDescription('Escolha cara ou coroa e teste a sua sorte!')
			.setThumbnail('https://cdn.discordapp.com/emojis/873403262370476062.png')
			.setFooter(
				'Caso os botões não estejam aparecendo para você, veja se está usando a versão mais recente do app Discord. Como alternativa, acesse discord.com/app no seu navegador!'
			);
		message.channel.send(embed, row);
	}
};
