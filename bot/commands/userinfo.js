const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'userinfo',
	aliases: ['memberinfo', 'user', 'member'],
	description: 'Veja as informações de um usuário!',
	usage: '<usuário que você quer as informações>',
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const canvas = Canvas.createCanvas(700, 250);
		const applyText = (canvas, text) => {
			const context = canvas.getContext('2d');
			let fontSize = 70;
			do {
				context.font = `${(fontSize -= 10)}px sans-serif`;
			} while (context.measureText(text).width > canvas.width - 300);
			return context.font;
		};

		
const context = canvas.getContext('2d');
const imagem = client.db.get(user.id + "_profile_image")
		const background = await Canvas.loadImage(
			'https://raw.githubusercontent.com/discordjs/guide/v12/code-samples/popular-topics/canvas/11/wallpaper.jpg'
		);

		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		context.strokeStyle = '#74037b';
		context.strokeRect(0, 0, canvas.width, canvas.height);
		context.font = '28px sans-serif';
		context.fillStyle = '#ffffff';
		context.fillText('Informações de', canvas.width / 2.5, canvas.height / 3.5);
		context.font = applyText(canvas, `${message.author.username}`);

		context.fillStyle = '#ffffff';
		context.fillText(
			`${user.username}`,
			canvas.width / 2.5,
			canvas.height / 1.8
		);
		context.beginPath();
		context.arc(125, 125, 100, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();
		const avatar = await Canvas.loadImage(
			user.displayAvatarURL({ format: 'png' })
		);

		context.drawImage(avatar, 25, 25, 200, 200);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "profile.png");
		//console.log(canvas);
		//console.log(attachment);
		const embed = new Discord.MessageEmbed()
			.setTitle(`Informações de ${user.username}`)
			.addField("Tag do Discord", `${user.tag}`)
			.addField("Id de Usuário", `${user.id}`)
			.addField("Avatar", `[Clique aqui](${user.displayAvatarURL()})`)
			.addField("É um bot Discord?", `${user.bot ? "Sim" : "Não"}`)
			.setFooter("Em breve terá mais informações aqui. Aguarde!")
			.setThumbnail(user.displayAvatarURL())
			.attachFiles(attachment)
.setImage('attachment://profile.png');
		//console.log(embed);
		message.channel.send(embed);
	}
};
