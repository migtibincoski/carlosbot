module.exports = (client, interaction) => {
  client.db.set(`${interaction.guild.id}.inviteblocker`, true)
  interaction.reply("Setado com sucesso!")
}
