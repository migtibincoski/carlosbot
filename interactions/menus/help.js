module.exports = (client, interaction) => {
  if(interaction.values[0] == "help_economia"){
    interaction.update({ content: "Comandos de Economia" })
  }
}
