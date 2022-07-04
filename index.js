// Setup do node:events
const EventEmitter = require('node:events');
class myEmmiter extends EventEmitter {}
const events = new myEmmiter();
events.on('event', (error) => {
  console.error(error)
  utils.sendConsole(error)
});


const config = require("./config.json")
const fs = require("fs");
const Discord = require("discord.js");

const utils = require("./utils/autoload")
utils.sendConsole("--------------------------------------------------\n> > **__Iniciando o processo...__**")
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
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],

  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"]
})

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.prefix = ".";
//nicialização
client.on("ready", async () => {
  const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    (`${file}`, `✅`);
  };
  
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
  
  
  console.info("Cliente (BOT) Iniciado!")
  await utils.sendConsole("**>> Cliente (BOT) Iniciado!**")
  app.listen(process.env.port || 8000, async () => {
    console.log("Servidor Web Iniciado")
    await utils.sendConsole("**>> Servidor Web Iniciado!**")
  });
  
});
client.on("debug", async data => {
  if (/(Sending a heartbeat|Latency of)/i.test(data)) return null;
  await utils.sendConsole(data)
})
client.on("guildCreate", async guild => await utils.sendConsole(`Fui adicionado em ${guild.name || "undefined"}`));

client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.guild)
    return message.reply(
      "Eu não posso executar comands via mensagem direta (DM)!"
    );
  // if (client.db.get(message.guild.id + "_inviteBlocker") == true) {
  //     const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite|dsc.gg)\/.+[a-z]/gi;
  //     if (regex.exec(message.content)) {
  //         message.reply(`**você não pode postar link de outros servidores aqui!**`);
  //         return message.delete();
  //     }
  // }

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
          .join("`, `").replace("CREATE_INSTANT_INVITE", "Criar Convite Instantâneo").replace("KICK_MEMBERS", "Expulsar Membros").replace("BAN_MEMBERS", "Banir Membros").replace("ADMINISTRATOR", "Administrador").replace("MANAGE_CHANNELS", "Gerenciar Canais").replace("MANAGE_GUILD", "Gerenciar Servidor").replace("ADD_REACTIONS", "Adicionar Reações").replace("VIEW_AUDIT_LOG", "Ver Registro de Auditoria").replace("PRIORITY_SPEAKER", "Voz Prioritária").replace("STREAM", "Compartilhar Tela").replace("VIEW_CHANNEL", "Ver Canais").replace("SEND_MESSAGES", "Enviar Mensagens").replace("SEND_TTS_MESSAGES", "Enviar Mensagens TTS (Texto Para Voz)").replace("MANAGE_MESSAGES", "Gerenciar Mensagens").replace("EMBED_LINKS", "Incorporar Links").replace("ATTACH_FILES", "Enviar Arquivos").replace("READ_MESSAGE_HISTORY", "Ler Histórico de Mensagens").replace("MENTION_EVERYONE", "Mencionar Todos (Usar @everyone)").replace("USE_EXTERNAL_EMOJIS", "Usar Emojis Externos").replace("VIEW_GUILD_INSIGHTS", "Ver Insigths do Servidor").replace("CONNECT", "Conectar").replace("SPEAK", "Falar").replace("MUTE_MEMBERS", "Mutar Membros").replace("DEAFEN_MEMBERS", "Ensurdecer Membros").replace("MOVE_MEMBERS", "Mover Membros").replace("USE_VAD", "Usar Detecção de Atividade de Voz (VAD)").replace("CHANGE_NICKNAME", "Alterar o Próprio Apelido").replace("MANAGE_NICKNAMES", "Gerenciar Apelidos").replace("MANAGE_ROLES", "Gerenciar Cargos").replace("MANAGE_WEBHOOKS", "Gerenciar WebHooks").replace("MANAGE_EMOJIS_AND_STICKERS", "Gerenciar Emojis e Figurinhas do Servidor").replace("USE_APPLICATION_COMMANDS", "Usar Comandos de Aplicação (botões, Slash Commands, menus, etc)").replace("REQUEST_TO_SPEAK", "Pedir para Falar em Canais de Palco").replace("MANAGE_EVENTS", "Gerenciar Eventos").replace("MANAGE_THREADS", "Gerenciar Threads").replace("USE_PUBLIC_THREADS", "Usar Threads Públicas").replace("CREATE_PUBLIC_THREADS", "Criar Threads Públicas").replace("USE_PRIVATE_THREADS", "Usar Threads Privadas").replace("CREATE_PRIVATE_THREADS", "Criar Threads Privadas").replace("USE_EXTERNAL_STICKERS", "Usar Figurinhas Externas").replace("SEND_MESSAGES_IN_THREADS", "Enviar Mensagens em Threads").replace("START_EMBEDDED_ACTIVITIES", "Iniciar Atividades Incorporadas").replace("MODERATE_MEMBERS", "Moderar Membros") +
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
    console.info(`Comando ${command.name} executado em ${message.guild.name}`);
  } catch (error) {
    console.error(error);
    client.channels.cache.get("866438231033118720").send({
      content: `Ei! Um usuário foi executar o comando ${commandName},  que retornou um erro! Erro: \`\`\`${error}\`\`\``
    });
    message.reply({
      content: "Ocorreu um erro ao executar este comando! Mas não se preocupe que o erro logo será resolvido!"
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

const oauthSettings = {
  clientId: config.DISCORD_BOT_ID,
  clientSecret: config.DISCORD_BOT_SECRET,
  oauthUri: `https://discord.com/oauth2/authorize?client_id=${config.DISCORD_BOT_ID}&redirect_uri=${config.DOMAIN}/auth&response_type=code&scope=identify%20guilds%20guilds.join&prompt=none`,
  inviteUri: `https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_BOT_ID}&permissions=8&redirect_uri=${config.DOMAIN}/auth&response_type=code&scopes=bot%20applications.commands`,
  redirectUri: `${config.DOMAIN}/auth`,
  domain: config.DOMAIN
};
const oauth = new oauth2(oauthSettings);

// middlewares
app.set("view engine", "ejs");
app.use(express.static("src"));
app.use(
  session({
    secret: config.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(async (req, res, next) => {
  if (req.url.startsWith("/dashboard") || req.url.startsWith("/profile")) {
    if (!req.session.discordkey && !req.query.code)
      return res.redirect(oauthSettings.redirectUri);
  }

  /*let user = (await oauth.getUser(req.session['discordkey'])) || undefined
  user !== undefined ? user.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : undefined
  req.user = user;*/
  next();
});
app.set("trust proxy", 1);


app.get("/", async (req, res) => {
    res.render("index.ejs", {
     // client: client,
      user: req.user
    })
});

app.get("/dashboard", async (req, res) => {
  try {
    let guilds = [];
    const allServers = await oauth.getUserGuilds(req.session["discordkey"]);
    for (const servidor of allServers) {
      let mutualServer = client.guilds.cache.get(servidor.id);
      if (mutualServer) {
        guilds.push(servidor);
      }
    }
    let user = await oauth.getUser(req.session['discordkey'])
    user.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    res.render("dashboard.ejs", {
      client: client,
      user,
      guilds,
      siteData: {
        domain: config.DOMAIN,
        bot: client.user,
        sessionSecret: config.EXPRESS_SESSION_SECRET
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect(`${config.DOMAIN}/login`);
  }
});

app.get("/dashboard/:id", async (req, res) => {
  let guild = client.guilds.cache.get(req.params.id);
  if (!guild) {
    res.redirect(config.DOMAIN + "/dashboard");
  } else {
    res.render("guild.ejs", {
      client: client,
      user: await oauth.getUser(req.session["discordkey"]),
      guild: guild,
      siteData: {
        domain: config.DOMAIN,
        bot: client.user,
        sessionSecret: config.EXPRESS_SESSION_SECRET
      }
    });
  }
});

app.get("/profile", async (req, res) => {
  res.render("profile.ejs", {
    client: client,
    siteData: {
      domain: config.DOMAIN,
      bot: client.user,
      sessionSecret: config.EXPRESS_SESSION_SECRET
    },
    user: await oauth.getUser(req.session["discordkey"])
  });
});

app.get("/profile/logout", async (req, res) => {
  if (req.session.discordkey != undefined) {
    req.session.discordkey = undefined;
  }
  res.redirect(`${config.DOMAIN}`)
});

app.get("/addbot", async (req, res) => {
  res.render("addbot.ejs", {
    siteData: {
      oauthSettings,
      bot: client.user,
      sessionSecret: config.EXPRESS_SESSION_SECRET
    }
  });
});

app.get("/login", async (req, res) => res.redirect(oauthSettings.oauthUri));

app.get("/support", async (req, res) =>
  res.redirect("https://dsc.gg/"));

app.get("/invite", async (req, res) => res.redirect(oauthSettings.botOauthUri));

app.get("/commands", async (req, res) => {
  let sessao = await oauth
    .getUser(req.session["discordkey"])
    .then(() =>
      res.render("commands.ejs", {
        commands: client.commands,
        user: sessao
      })
    )
    .catch(err =>
      res.render("commands.ejs", {
        commands: client.commands,
        user: undefined
      })
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

app.get("*", ({ res }) => res.status(404).send('Sorry cant find that!'))

client.login(config.DISCORD_BOT_TOKEN);