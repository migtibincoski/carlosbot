const Discord = require("discord.js")
const ms = require("ms") 
module.exports = {  
	name: "daily",  
	description: "",  
	aliases: ['diario', 'recompensa-diaria'],  
	cooldown: 0,  
	category: 'economy',
	run: async (client, message, args) => {	 
const moment = require('moment'); 
		require('moment-duration-format')
		const daily = Math.floor(Math.random() * 900 - 100) + 100

let cooldown = client.db.get(`${message.author.id}_daily`) || Date.now() - (1000 * 60 * 60 * 24) // tempo

let time = 1000 * 60 * 60 * 24 - (Date.now() - cooldown)

if (cooldown !== null && time > 0) {
  let timeout = moment.duration(time).format('h[h]:m[min]:s[seg]')

  return message.channel.send(`${message.author}, aguarde \`${timeout}\``) // Aguarde 5m:00s
} else {
 message.reply(`você ganhou ${parseInt(daily)} JuniCoins hoje. Parabéns! Você pode voltar amanhã para pegar mais recompensas!`)
	client.db.set(message.author.id + "_daily", Date.now())
}
 
}
	}