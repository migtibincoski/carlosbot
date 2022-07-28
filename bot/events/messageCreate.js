module.exports = async (client, message) => {
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
}