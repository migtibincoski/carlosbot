const Discord = require("discord.js");

module.exports = {
	name: "meme",
	aliases: ['memes-em-imagens', 'pinterest-memes', 'memes'],
	description: "Veja memes do Pinterest!",
	run: async (client, message, args) => {
		const memes = [
		"https://i.pinimg.com/originals/44/24/c1/4424c161ca3aeebfb8a0c7b593e73f91.png",
		"https://i.pinimg.com/originals/8a/0c/3c/8a0c3ce245a23ed752edc2c298c5c3eb.jpg",
		"https://i.pinimg.com/236x/fa/81/fb/fa81fb46ea5a11d49f4cd6796e6771ea.jpg",
		"https://i.pinimg.com/236x/b5/32/7d/b5327df643f007be002d55f30ea7a3c5.jpg",
		"https://i.pinimg.com/236x/7e/a1/4f/7ea14ff73b004a15de087edce26bea76.jpg",
		"https://i.pinimg.com/236x/e6/fc/05/e6fc0581c810ceccfcd7f9fd3065b32e.jpg",
		"https://i.pinimg.com/236x/c6/58/0b/c6580b1db4e011998b19b3f3e3910ac7.jpg",
		"https://i.pinimg.com/236x/b8/e8/9c/b8e89cdd29da024bc86590759a90e699.jpg",
		"https://i.pinimg.com/236x/b6/d3/1d/b6d31d99fa0e30650642fff39012d7a3.jpg",
		"https://i.pinimg.com/236x/d9/01/7f/d9017f3e1f3227140c620157f6f21e6f.jpg",
		"https://i.pinimg.com/236x/d1/9d/23/d19d23310fe2c47bd806c521f2046668.jpg",
		"https://i.pinimg.com/236x/9e/2a/25/9e2a250b8deef2f6a1386d5b29e23f51.jpg",
		"https://i.pinimg.com/236x/c0/92/04/c0920492e41160d7438d4ade5575df2f.jpg",
		"https://i.pinimg.com/236x/7d/fd/bf/7dfdbf4b1ab5b2ecff400c2737ceecca.jpg",
		"https://i.pinimg.com/236x/06/6a/01/066a011041116cc31ee309f31da77248.jpg",
		"https://i.pinimg.com/236x/8d/ad/c6/8dadc6c1150eab0de6206cac5d92aaa3.jpg",
		"https://i.pinimg.com/236x/68/40/2f/68402f5f9138956c33c065623604007b.jpg",
		"https://i.pinimg.com/236x/52/a7/83/52a7835d48514d915d96871cd49b92bd.jpg",
		"https://i.pinimg.com/236x/67/c7/a4/67c7a453fa72aa8a5f4a161f40f04e5a.jpg",
		"https://i.pinimg.com/236x/bd/ad/a2/bdada22e0d1e1312fb6f7a02d7873c9d.jpg",
		"https://i.pinimg.com/236x/be/b5/40/beb540f89dc150f6c7842479d06fe928.jpg",
		"https://i.pinimg.com/236x/51/10/63/51106360bae772d279b8ba2585059091.jpg",
		"https://i.pinimg.com/236x/3b/8e/ca/3b8eca8db13b508a317926e5ff89abf0.jpg",
		"https://i.pinimg.com/236x/85/ca/f2/85caf2cf9c4067b901899df65b1aca10.jpg",
		"https://i.pinimg.com/236x/8b/50/b1/8b50b1780f28dcf7dac6c73d07420498.jpg",
		"https://i.pinimg.com/236x/54/ce/f4/54cef4020443e02ef4caccdae6fbeaf3.jpg",
		"https://i.pinimg.com/236x/9c/7a/49/9c7a4979c4e9ca3e74c8f6859054cbca.jpg",
		"https://i.pinimg.com/236x/60/e0/af/60e0af6a51b48f0a5e3ce3e0fa1d2d6a.jpg",
		"https://i.pinimg.com/564x/09/85/47/098547596ebd689fe9350078667a5dfc.jpg"
		];
		const rand = memes[Math.floor(Math.random() * memes.length)];
		const avatar = message.author.displayAvatarURL({ format: "png" });
		const embed = new Discord.MessageEmbed()
		.setTitle("🤣 Meme saindo...")
		.setDescription(`Não consegue ver a imagem? Clique [aqui](${rand}) e abra no seu navegador!`)
		.setColor("RANDOM")
		.setImage(rand)
		.setTimestamp()
		.setFooter(
		"Você também quer que eu envie um meme? Use o comando " +
			client.prefix +
			"meme"
		)
		.setAuthor(message.author.tag, avatar);
		await message.channel.send({ content: " ", embeds: [embed] });
	}
}