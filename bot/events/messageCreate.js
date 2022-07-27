module.exports = async message => {
    if (message.author.bot) return;
    if (!message.guild) return message.reply("Eu não posso executar comands via mensagem direta (DM)!");
    // if (client.db.get(message.guild.id + "_inviteBlocker") == true) {
    //     const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite|dsc.gg)\/.+[a-z]/gi;
    //     if (regex.exec(message.content)) {
    //         message.reply(`**você não pode postar link de outros servidores aqui!**`);
    //         return message.delete();
    //     }
    // }

    if (message.content.startsWith("<@" + client.user.id + ">") || message.content.startsWith("<@!" + client.user.id + ">")) return message.reply("o meu prefixo é `j.`, use `j.help` para ver todos os meus comandos!");
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return message.channel.send(`❌ Eita, <@!${message.author.id}>, tem certeza de que não é fake news? ***Este comando não existe!***  Veja todos os comandos disponíveis usando \`${client.prefix}help\`!`);
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions))
            return message.reply("você não tem as permissões necessárias! Permissões necessárias: \n`" +
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
            content: "Ocorreu um erro ao executar este comando! Mas não se preocupe que o erro logo será resolvido!"
        });
    }
}