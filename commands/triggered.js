const Discord = require("discord.js");
const canvacord = require("canvacord")

module.exports = {
	name: "triggered",
	aliases: ['provocado', 'efeito-glitch'],
	description: "Você está irritado? Crie um GIF com __**efeito glitch**__! [Veja um exemplo!](https://cdn.discordapp.com/attachments/869538146931597342/870813637676245042/triggered.gif)",
	usage: "<menção do usuário (deixe vazio para fazer com o seu próprio perfil)>",
	run: async (client, message, args) => {
		let user;
		if(message.mentions.users.first()){
			user = message.mentions.users.first()
		} else {
			user = message.author
		}

  		const msg = await message.channel.send("<a:bolinhas_gif:870705042443886633> Carregando o GIF...")
        let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif")
        msg.delete() 
        message.channel.send(attachment)
	}
}