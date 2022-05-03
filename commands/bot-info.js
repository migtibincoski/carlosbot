const Discord = require('discord.js');
const moment = require('moment')();
moment.format('LLLL')
moment.locale("pt-br")
module.exports = {
	name: 'botinfo',
  category: "information",
	aliases: ['bot', 'about-me', ''],
	description: 'Veja as minhas informações!',
	run: async (client, message, args) => {
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let uptime = `Eu dormi à ${days.toFixed()} dias, ${hours.toFixed()} horas, ${minutes.toFixed()} minutos e ${seconds.toFixed()} segundos!`;
		const inline = true;
		const date = client.user.createdAt;
		const status = {
			online: '🟢 Online',
			idle: '🌙 Ausente',
			dnd: '⛔ Não pertubar',
			offline: '⚪ Offline'
		};
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setThumbnail(client.user.displayAvatarURL())
			.setTitle('Saiba mais sobre mim!')
			.addField('Meu Nome de Usuário', `${client.user.username}`, inline)
			.addField('Meu ID de Usuário', `${client.user.id}`, inline)
			.addField('Quantidade de Servidores', `${client.guilds.cache.size} servidores no total`, inline)
			.addField('Quantidade de Usuários', `${client.users.cache.size}`, inline)
			.addField('Tempo de Uptime', uptime, inline)
			.addField('Criado em', '12 de abril de 2021, às 12:05', inline)
			.addField('Quantidade de Comandos', `${client.commands.size} comandos no total`, inline)
			.addField("Dados Extras", "<:js_icon:905462630792171590> Livraria: `discord.js`\n<:nodejs_icon:905464976943226960> Linguagem: `JavaScript for Node.js`\n<:host_icon:905465619640647711> Host: [Replit.com](https://replit.com)\n<a:discord_animated_icon:905467261383487568> Link do meu Servidor: https://dsc.gg/izem-lab ou https://discord.gg/ballerini")
      .setTimestamp();
		message.channel.send({ content: " ", embeds: [embed] });
	}
};
