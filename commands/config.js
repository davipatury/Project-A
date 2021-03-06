// Comando resposanvel pela administracao do bot
const languagemanager = require("../utils/languagemanager");
const langmgr = new languagemanager();


exports.run = (client, message, args) => {

    /** Verifica se o membro possui permissão para administrar roles. */
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply('Você não pode fazer isto :c');

    if (args.length == 2)
    {
        const name = args[1];
        var langs = langmgr.getLanguages();
        if (args[0] == "addlang")
        {
            // Checamos se a linguagem nao existe no arquivo de configuracao
            if (!langs.includes(name))
            {
                // Checamos se a role existe no servidor
                if (message.guild.roles.find("name", name))
                {
                    // Se existir, apenas adicionamos a linguagem ao arquivo de configuracao
                    if (langmgr.addLanguage(name))
                    {
                        // Se nao houveram erros:
                        message.reply("Linguagem adicionada.");
                    }
                    else
                    {
                        // Se houver um erro...
                        message.reply("Algo de errado nao esta certo, nao consegui adicionar essa linguagem.");
                    }
                }
                else
                {
                    // Criamos a role no servidor
                    message.guild.createRole({name}).then(() => {
                        // adicionamos a linguagem ao arquivo de configuracao
                        if (langmgr.addLanguage(name))
                        {
                            // Se nao houveram erros:
                            message.reply("Linguagem adicionada.");
                        }
                        else
                        {
                            // Se houver um erro...
                            message.reply("Algo de errado nao esta certo, nao consegui adicionar essa linguagem.");
                        }
                    });
                }
            }
            else
            {
                // Linguagem existe
                message.reply("Essa linguagem ja existe!");
            }
        }
        else if (args[0] == "remlang")
        {
            // Checamos se a linguagem existe no arquivo de configuracao
            if (langs.includes(name))
            {
                // Checamos se a role existe no servidor
                var role = message.guild.roles.find("name", name);
                if (role)
                {
                    // Se existir, deletamos a role
                    role.delete().then(() => {
                        // Entao, removemos do arquivo
                        if (langmgr.removeLanguage(name))
                        {
                            // Se nao houverem erros:
                            message.reply("Linguagem removida");
                        }
                        else
                        {
                            // Se nao:
                            message.reply("Algo de errado nao esta certo, nao consegui remover essa linguagem.");
                        }
                    });
                }
                else
                {
                    // Se nao existir, apenas removemos a linguagem do arquivo
                    if (langmgr.removeLanguage(name))
                    {
                        // Se nao houverem erros:
                        message.reply("Linguagem removida");
                    }
                    else
                    {
                        // Se nao:
                        message.reply("Algo de errado nao esta certo, nao consegui remover essa linguagem.");
                    }
                }
            }
            else
            {
                // Linguagem existe
                message.reply("Essa linguagem nao existe!");
            }
        }
    }
    else
    {
        return message.reply(`?? Talvez isso possa ajuda-lo: \`\`\`${message.settings.PREFIX}${this.help.usage}\`\`\``);
    }
}

exports.conf = {

}

exports.help = {
    name:"config",
    categorie: "Moderação",
    description: "Altera as configuracoes do bot.",
    usage:"config [addlang (name|role)|remlang role]"
}
