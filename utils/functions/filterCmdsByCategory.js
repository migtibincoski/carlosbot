module.exports = (client, categoria) => {
  return client.commands.filter((filtro) => filtro.category == categoria)
}