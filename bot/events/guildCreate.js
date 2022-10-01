module.exports = {
  once: false,
  callback: async (client, guild) => {
    await utils.sendConsole(`Fui adicionado em ${guild.name || "undefined"}`)
}
}