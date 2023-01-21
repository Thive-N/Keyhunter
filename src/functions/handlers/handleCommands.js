const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }
    //clientID is the bot ID
    const clientId = "1066364504688054282";
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log(
        chalk.blueBright("Started refreshing application (/) commands.")
      );

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log(
        chalk.gray(`(/) commands have been reloaded `) +
          chalk.greenBright(`successfullly`)
      );
    } catch (error) {
      console.error(chalk.redBright(error));
    }
  };
};
