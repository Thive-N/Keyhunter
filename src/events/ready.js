//output to terminal
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [{ name: `keycaps`, type: ActivityType.Watching }],
      status: "online",
    });
    //setInterval(client.setPresence, 10 * 1000);
    console.log(
      chalk.white(`${client.user.tag} `) + chalk.gray(`is now `) + chalk.greenBright(`online ` + chalk.gray(`in `) + chalk.greenBright(`${client.guilds.cache.size} `) + chalk.gray(`guilds `))
    );
  },
};
