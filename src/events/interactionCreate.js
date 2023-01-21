const {
  InteractionType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    const { user } = interaction;
    const { commands } = client;
    const { commandName } = interaction;
    const command = commands.get(commandName);

    var date = new Date();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`Support Server`)
        .setURL(`https://discord.gg/ztYgCrEPWD`)
        .setStyle(ButtonStyle.Link)
    );
    if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("[DEV] This button is empty");

      try {
        await button.execute(interaction, client, user);
        console.log(
          chalk.gray(`${date.toGMTString().replace(/^\S+\s/, "")} `) +
            chalk.cyanBright(
              `(B) ${customId} used by ${interaction.user.username} ${interaction.user.id} in ${interaction.guild.name} ${interaction.guild.id}`
            )
        );
      } catch (err) {
        console.error(err);

        const embed = new EmbedBuilder()
          .setAuthor({
            iconUrl: `https://cdn.discordapp.com/emojis/1005493779932925952.png`,
            name: `Looks like something went wrong`,
          })
          .setDescription(
            `**try again or please contact the support**`
          )
          .setColor(0xd55a5c);

        await interaction.followUp({
          embeds: [embed],
          components: [row],
          ephemeral: true,
        });
      }
      //if select menu
    } else if (interaction.isSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("[DEV] This menu is empty");

      try {
        await menu.execute(interaction, client, user);
        console.log(
          chalk.gray(`${date.toGMTString().replace(/^\S+\s/, "")} `) +
            chalk.cyanBright(
              `(S) ${customId} used by ${interaction.user.username} ${interaction.user.id} in ${interaction.guild.name} ${interaction.guild.id}`
            )
        );
      } catch (err) {
        console.error(err);

        const embed = new EmbedBuilder()
          .setAuthor({
            iconUrl: `https://cdn.discordapp.com/emojis/1005493779932925952.png`,
            name: `Looks like something went wrong`,
          })
          .setDescription(
            `**try again or please contact the support**`
          )
          .setColor(0xd55a5c);

        await interaction.reply({
          embeds: [embed],
          components: [],
          ephemeral: true,
        });
      }
    } else if (interaction.type == InteractionType.ModalSubmit) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("[DEV] This modal is empty");

      try {
        await modal.execute(interaction, client, user);
        console.log(
          chalk.gray(`${date.toGMTString().replace(/^\S+\s/, "")} `) +
            chalk.cyanBright(
              `(M) ${customId} used by ${interaction.user.username} ${interaction.user.id} in ${interaction.guild.name} ${interaction.guild.id}`
            )
        );
      } catch (err) {
        console.error(err);
        const embed = new EmbedBuilder()
          .setAuthor({
            iconUrl: `https://cdn.discordapp.com/emojis/1005493779932925952.png`,
            name: `Looks like something went wrong`,
          })
          .setDescription(
            `**try again or please contact the support**`
          )
          .setColor(0xd55a5c);

        await interaction.reply({
          embeds: [embed],
          components: [row],
          ephemeral: true,
        });
      }
    } else {
      //if slash command
      if (interaction.isChatInputCommand()) {
        if (!command) return;
        try {
          await command.execute(interaction, client, user);
          console.log(
            chalk.gray(`${date.toGMTString().replace(/^\S+\s/, "")} `) +
              chalk.cyanBright(
                `(/) ${commandName} used by ${interaction.user.username} ${interaction.user.id} in ${interaction.guild.name} ${interaction.guild.id}`
              )
          );
        } catch (err) {
          console.error(err);

          const embed = new EmbedBuilder()
            .setAuthor({
              iconUrl:
                "https://cdn.discordapp.com/emojis/1005493779932925952.png",
              name: `Looks like something went wrong`,
            })
            .setDescription(
              `**try again or please contact the support**`
            )
            .setColor(0xd55a5c);

          await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true,
          });
        }
      }
    }
  },
};
