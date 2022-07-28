const nampis = require('nampis');
const Discord = require('discord.js');

module.exports = {
	name: 'cat',
	aliases: ['gato', 'gatinho', 'miau'],
	description: 'Vamos ver gatinhos... Todo mundo ama gatinhos!',
	category: 'fun',
	run: async (client, message, args) => {
		let verification = args[0] === 'gif';
		let type = verification ? 'gif' : 'jpg';

		const embed = new Discord.MessageEmbed()
			.setImage(await nampis.animals.cat())
			

		message.channel.send(embed);
	}
};
