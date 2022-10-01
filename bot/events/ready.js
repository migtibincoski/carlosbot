const fs = require("fs")
const path = require("path")
const utils = require("../utils") 
module.exports = {
  once: true,
  callback: async (client) => {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    `${file}`, `✅`;
  }
  
  let activities = [
    "Use " + client.prefix + "help para obter ajuda!",
    "Eu sou um excelente bot de diversão e moderação pro seu servidor, sabia? Me adicione com " +
    client.prefix +
    "invite !",
    "Você sabia que eu estou em constantes atualizações?"
  ];
  let types = ["PLAYING", "WATCHING", "LISTENING"];
  let i = 0;
  setInterval(() => {
    const numero = i++ % activities.length;
    client.user.setActivity(`${activities[numero]}`, {
      type: `${types[numero] || "PLAYING"}`
    });
  }, 60000);
  
  
  console.info("Cliente (BOT) Iniciado!")
  utils.sendConsole("**>> Cliente (BOT) Iniciado!**")
  /*app.listen(process.env.port || process.env.PORT || 8000, async () => {
    console.log("Servidor Web Iniciado")
    await utils.sendConsole("**>> Servidor Web Iniciado!**")
  });*/
  
}
}