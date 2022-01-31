// declarações de variável
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],

  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]
})

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const database = require("simple-json-db")
client.db = new database("database.json")
client.prefix = ".";
const AsciiTable = require("ascii-table")

let bot = {}; 
const webdata = {
  navbar: ``
}
//nicialização
client.on("ready", () => {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));
  const table = new AsciiTable("Carregamento dos Arquivos");
  table.setHeading("Nome e Extensão do Arquivo", "Status");
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    table.addRow(`${file}`, `✅`);
  }
  console.log(table.toString());

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

  bot = client.user;
  
  app.listen(8000, servidor =>
    console.log(
      "READY!",
      "Servidor Web iniciado"
    )
  );
  client.on("debug", data =>

    client.channels.cache.get("924732014270218341").send(data)

  );
});

client.on("guildCreate", guild =>
  console.log(`Fui adicionado em ${guild.name || "undefined"}`)
);

client.on("messageCreate", async message => {
  // console.log("New message!")
  
  if (message.author.bot) return;
  if (!message.guild)
    return message.reply(
      "Eu não posso executar comands via mensagem direta (DM)!"
    );
  if (client.db.get(message.guild.id + "_inviteBlocker") == true) {
    const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite|dsc.gg)\/.+[a-z]/gi;
    if (regex.exec(message.content)) {
      message.reply(`**você não pode postar link de outros servidores aqui!**`);
      return message.delete();
    }
  }

  if (
    message.content.startsWith("<@" + client.user.id + ">") ||
    message.content.startsWith("<@!" + client.user.id + ">")
  )
    return message.reply(
      "o meu prefixo é `j.`, use `j.help` para ver todos os meus comandos!"
    );
  if (!message.content.startsWith(client.prefix)) return;
  const args = message.content
    .slice(client.prefix.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command)
    return message.channel.send(
      `❌ Eita, <@!${message.author.id}>, tem certeza de que não é fake news? ***Este comando não existe!***  Veja todos os comandos disponíveis usando \`${client.prefix}help\`!`
    );

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions))
      return message.reply(
        "você não tem as permissões necessárias! Permissões necessárias: \n`" +
        command.permissions
          .join("`, `")
          .replace("MANAGE_GUILD", "Gerenciar Servidor") +
        "`"
      );
  }
  if (command.args && !args.length) {
    let reply = `Você não deu todos os argumentos, ${message.author}!`;
    if (command.usage) {
      reply += `\nO uso correto é  \`${client.prefix}${commandName} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.run(client, message, args);
    console.log(`Comando ${command.name} executado em ${message.guild.name}`);
  } catch (error) {
    console.error(error);
    client.channels.cache.get("866438231033118720").send({
      content: `Ei! Um usuário foi executar o comando ${commandName},  que retornou um erro! Erro: \`\`\`${error}\`\`\``
    });
    message.reply({
      content:
        "Ocorreu um erro ao executar este comando! Mas não se preocupe que o erro logo será resolvido!"
    });
  }
});

client.on("interactionCreate", async interaction => {
  try {
    if (interaction.isButton()) {
      try {
        require(`./interactions/buttons/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else if (interaction.isSelectMenu()) {
      try {
        require(`./interactions/menus/${interaction.customId}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else if (interaction.isCommand()) {
      try {
        require(`./interactions/slash/${interaction.commandName}.js`)(
          client,
          interaction
        );
      } catch (err) {
        require(`./interactions/error.js`)(
          client,
          interaction,
          "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
          err +
          "```"
        );
      }
    } else {
      return require(`./interactions/error.js`)(
        client,
        interaction,
        "Ocorreu um erro desconhecido."
      );
    }
  } catch (err) {
    require(`./interactions/error.js`)(
      client,
      interaction,
      "Não foi possível concluir esta interação. Tente novamente mais tarde. \n Erro: ```" +
      err +
      "```"
    );
  }
});

// server (web dashboard)
const express = require("express");
const app = express();
const oauth2 = require("discord-oauth2");
const session = require("express-session");
//app.listen(8080, () => console.log("Server Started!"));
const oauthSettings = {
  clientId: process.env.DISCORD_BOT_ID,
  clientSecret: process.env.DISCORD_BOT_SECRET,
  oauthUri:
    `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_BOT_ID}&redirect_uri=https://carlosbot.miguel-tibincoski.repl.co/auth&response_type=code&scope=identify guilds guilds.join&prompt=none`,
  botOauthUri:
    " guilds guilds.join bot applications.commands",
  redirectUri: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/auth`
};
const oauth = new oauth2(oauthSettings);

// middlewares
app.set("view engine", "ejs");
app.use(express.static("src"));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,

    resave: false,
    saveUninitialized: false
  })
);
app.use(async (req, res, next) => {
  if (req.url.startsWith("/dashboard") || req.url.startsWith("/profile")) {
    if (!req.session.discordkey && !req.query.code)
      return res.redirect(oauthSettings.redirectUri);
  }
  next();
});
app.set("trust proxy", 1);


app.get("/", async (req, res) => {
  if (req.session["discordkey"] !== undefined) {
    res.render("index.ejs", {
      client: client,
      user: await oauth.getUser(req.session["discordkey"]),
      data: webdata
      
    });
  } else {
    res.render("index.ejs", {
      client: client,
      user: undefined,
      data: webdata
    });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    let guildas = [];
    const allServers = await oauth.getUserGuilds(req.session["discordkey"]);
    for (const servidor of allServers) {
      let mutualServer = client.guilds.cache.get(servidor.id);
      if (mutualServer) {
        guildas.push(servidor);
      }
    }
    res.render("dashboard.ejs", {
      client: client,
      user: await oauth.getUser(req.session["discordkey"]),
      guilds: guildas
    });
  } catch (err) {
    console.log(err);
    res.redirect("https://carlosbot.miguel-tibincoski.repl.co/login");
  }
});

app.get("/dashboard/:id", async (req, res) => {
  let guild = client.guilds.cache.get(req.params.id);
  if (!guild) {
    res.redirect("https://carlosbot.miguel-tibincoski.repl.co/dashboard");
  } else {
    res.render("guild.ejs", {
      client: client,
      user: await oauth.getUser(req.session["discordkey"]),
      guild: guild
    });
  }
});

app.get("/profile", async (req, res) => {
  res.render("profile.ejs", {
    client: client,
    user: await oauth.getUser(req.session["discordkey"])
  });
});

app.get("/profile/logout", async (req, res) => {
  if(req.session.discordkey != undefined){
    req.session.discordkey = undefined;
  }
  res.redirect("https://carlosbot.miguel-tibincoski.repl.co/")
});

app.get("/addbot", async (req, res) => {
  res.render("addbot.ejs");
});

app.get("/login", async (req, res) => res.redirect(oauthSettings.oauthUri));

app.get("/support", async (req, res) =>
  res.redirect("https://dsc.gg/")
);

app.get("/invite", async (req, res) => res.redirect(oauthSettings.botOauthUri));

app.get("/commands", async (req, res) => {
  let sessao = await oauth
    .getUser(req.session["discordkey"])
    .then(() =>
      res.render("commands.ejs", { commands: client.commands, user: sessao })
    )
    .catch(err =>
      res.render("commands.ejs", { commands: client.commands, user: undefined })
    );
});

app.get("/auth", async (req, res) => {
  try {
    if (req.query.code) {
      const tokenReq = await oauth.tokenRequest({
        code: req.query.code,
        scope: "identify guilds guilds.join",
        grantType: "authorization_code"
      });
      if (!tokenReq) return res.redirect(oauthSettings.oauthUri);
      req.session.discordkey = tokenReq.access_token;
      const user = await oauth.getUser(tokenReq.access_token);
      res.redirect("/dashboard");
    } else {
      return res.redirect(oauthSettings.oauthUri);
    }
  } catch (error) {

    console.log(error)
    return res.redirect(oauthSettings.oauthUri);
  }
});

app.get("*", (req, res) =>
  res.redirect("https://carlosbot.miguel-tibincoski.repl.co/"))

client.login(process.env.DISCORD_BOT_TOKEN);
