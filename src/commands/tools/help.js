const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("list of commands & support"),
    async execute(interaction, client) {
      //create message
      const message = `> <@${interaction.user.id}> • **help**`;
      //create embed
      const embed = new EmbedBuilder()
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(
          `<@${client.user.id}> is an adventure-based RPG bot in ${client.guilds.cache.size} servers`
        )
        .addFields([
          {
            name: `<:s_magglass:1022250368530399332> Adventure`,
            value: ` • </adventure:1017497887556517908>\n • </inventory:1019440931566526566>\n • </shop:1019057604485447763>\n • </pet:0>\n • </health:1056030914720845905>`,
            inline: true,
          },
          {
            name: `<:s_stats:1019090071015669780> Economy`,
            value: ` • </daily:1017497887556517909>\n • </wallet:1017910633586499584>\n • </search:1051644929052516393>\n • </dig:1019291433229881505>\n • </vote:1051644929052516394>`,
            inline: true,
          },
          {
            name: `<:i_hearts:1019236812323037214> Social`,
            value: ` • </profile:1017965502716452894>\n • </give:1049504847768059924>\n • </gift:1020394515342831718>\n • </rep:0>`,
            inline: true,
          },
        ])
        .setFooter({
          text: `You can find more supprt in the discord • by using this bot you agree to our terms of service`,
        })
  
        .setColor(0x62b8f3);
      const support = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(`Invite`)
          .setURL(`https://discord.com/oauth2/authorize?client_id=1066364504688054282&permissions=8&scope=applications.commands%20bot`)
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel(`Website`)
          .setURL(`https://helio.lol`)
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel(`Support Server`)
          .setURL(`https://discord.gg/ztYgCrEPWD`)
          .setStyle(ButtonStyle.Link)
      );
      //send collective together
      await interaction.reply({
        content: message,
        embeds: [embed],
        components: [support],
      });
    },
  };
  