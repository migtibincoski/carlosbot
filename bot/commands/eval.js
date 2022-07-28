const Discord = require("discord.js");

module.exports = {
  name: "eval",
  category: "developer",
  args: true,
  usage: "<código a ser depurado>",
  permissions: ['MANAGE_GUILD'],
  run: async ({ message, args }) => {
    if (message.author.id == "741281375159582741" || message.author.id == "531215954395529219" || message.author.id == "855416135456653353" || message.author.id !== "847490861012746252" || message.author.id == "814543518655315998") {

      try {
        const response = eval(args.join(" ").replace("client.token", "client"))
        const embedsucesso = new Discord.MessageEmbed()
          .setTitle("Success")
          .setColor("#008000")
          .addField("Entrada (command): ", `\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField("Saída (output): ", `\`\`\`${response}\`\`\``)

        message.channel.send({ content: " ", embeds: [embedsucesso] })
      } catch (err) {
        const embederro = new Discord.MessageEmbed()
          .setTitle("Error")
          .setColor("#ff0000")
          .addField("Entrada (command): ", `\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField("Saída (output): ", `\`\`\`${err}\`\`\``)

        message.channel.send({ content: " ", embeds: [embederro] })
      }

    } else {
      return message.channel.send(":warning: Somente pessoas muito (mas muuito) legais podem usar este comando especial!");
    }
  }
}
