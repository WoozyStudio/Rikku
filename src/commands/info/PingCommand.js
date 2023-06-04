const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('I will respond with the ping bot in ms.'),
    async execute(interaction, client) {
        await interaction.reply({ content: `Pong! The bot ping is **${Date.now() - interaction.createdTimestamp}ms** and the API ping is **${client.ws.ping}ms**.` });
    }
}