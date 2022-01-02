const Discord = require('discord.js');
const nampis = require('nampis');

module.exports = {
	name: 'conquista-xbox',
	description:
		'<:xbox_one:869576098646741052> Obtenha uma imagem de uma conquista do Xbox que você pode personalizar!',
	aliases: ['xbox-conquista', 'xbox'],
	args: true,
	usage: '<descrição da sua conquista do Xbox>',
	run: (client, message, args) => {
		const desc2 = args.join(' ');
		const conquista = new Discord.MessageEmbed()
			.setTitle('<:xbox_one:869576098646741052> Conquista do Xbox!')
			.setDescription(
				'O usuário ' +
					message.author.username +
					' desbloqueou a conquista **' +
					desc2 +
					'**'
			)
			.setImage(nampis.xbox(desc2))
			.setColor('GREEN');

		message.channel.send(conquista);
	}
};
