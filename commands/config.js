const Discord = require("discord.js");
const disbtn = require("discord.js")

module.exports = {
  name: "config",
  description: "Não use este comando, ele está em manutenção...",
  permissions: ['MANAGE_GUILD'],
	category: "configuration",
  run: async (client, message, args) => {
	  if(!message.guild.me.permissionsIn(message.channel).toArray().includes("ADMINISTRATOR")) return message.channel.send(":warning: Eita, <@!" + message.author + ">! Eu preciso da permissão de `Gerenciar Mensagens`!")
	  if(args.join(" ") == "view" || !args.join(" ")) {
	  const msg = await message.channel.send("<a:bolinhas_gif:870705042443886633> Carregando... <a:bolinhas_gif:870705042443886633>")

	let blockerInvite;
	let joinchannel;
	if(client.db.get(message.guild.id + "_inviteBlocker") == "on") {
		blockerInvite = "<:activ:862373374521114655> Ativado, use `" + client.prefix + "config inviteblocker` para desativar!"
	} else if(client.db.get(message.guild.id + "_inviteBlocker") == "off") {
		blockerInvite = "<:disactiv:862373770889920532> Desativado, use `" + client.prefix + "config inviteblocker` para ativar!"
	} else {
		blockerInvite = "<:disactiv:862373770889920532> Desativado, use `" + client.prefix + "config inviteblocker` para ativar!"
	}
	
	if(client.db.get(message.guild.id + "_joinchannel")) {
		joinchannel = "<#" + client.db.get(message.guild.id + "_joinchannel") + ">"
	} else if(client.db.get(message.guild.id + "_joinchannel") == "") {
		joinchannel = "Boas-vindas desabilitada, use `" + client.prefix + "config join_message`"
	} else {
		joinchannel = "Boas-vindas desabilitada, use `" + client.prefix + "config join_message`"
	}

    const embed = new Discord.MessageEmbed()
      .setTitle("Configurações de " + message.guild.name)
      .addField("InviteBlocker", blockerInvite)
	  .addField("Canal de boas-vindas", joinchannel)
    message.channel.send({ content: " ", embeds: [embed] })
	.then(msg.delete())
	  } else if (args[0] == "inviteblocker") {
		  const query = client.db.get(message.guild.id + "_inviteBlocker")

		  const enable = new disbtn.MessageButton()
		  .setStyle('SUCCESS')
		  .setLabel('Ativar InviteBlocker')
		  .setEmoji("854689180964618280", false) 
		  .setCustomId('enable_inviteblocker');

		  const disable = new disbtn.MessageButton()
		  .setStyle('DANGER')
		  .setLabel('Desativar InviteBlocker') 
		  .setEmoji("854694479646949406", false)
		  .setCustomId('disable_inviteblocker');

		  const cancel = new disbtn.MessageButton()
		  .setStyle('PRIMARY')
		  .setLabel('Cancelar') 
		  .setEmoji("867754485346598942", false)
		  .setCustomId('cancel_inviteblocker');

		  let type = "";

		  if (query == "on") {
			  enable.setDisabled()
			  type = "desativar";
		  } else if (query == "off") {
			  disable.setDisabled()
			  type = "ativar";
		  } else {
			  disable.setDisabled()
			  type = "ativar";
		  }

		  const row = new disbtn.MessageActionRow()
  		  .addComponents(enable, disable, cancel);
			
		  const inviteblocker = new Discord.MessageEmbed()
		  .setTitle("InviteBlocker")
		  .setDescription("O Juni InviteBlocker é um sistema que deleta automaticamente os links de convite para outros servidores, desde que os links comecem com `discord.gg`, `discord.io`, `discord.me`, `discord.li`, `discord.club` ou `discordapp.com`. Basta interajir com os botões " + type + " para ativar!")

		  message.channel.send({ content: " ", embeds: [inviteblocker], components: [row] });
	  } else if (args[0] == "join_message") {
		  const mensagem = args.join(" ").replace("join_message", "")
		  if (!mensagem) {
			  client.db.set(message.guild.id + "_joinmessage", "")
			  message.channel.send("Você precisa informar uma mensagem de boas-vindas! Caso você queira desativar, envie `" + client.prefix + "config join_message disable`")
		  }  
		  if (args[1] == "disable") {
			  message.channel.send("✅ Sucesso! O sistema de boas-vindas foi desligado! Use `" + client.prefix + "config join_message`")
		  }
	  }
  }
};
