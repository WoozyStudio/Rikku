const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server, you can add a reason if you want.")
    .addUserOption((option) => option.setName('target').setDescription('Select the user you want to kick.').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('Attach a reason to the sanction, this step is optional.').setRequired(false)),
    async execute(interaction, client){
        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");
        interaction.guild.members.kick(user);    

        const KickMessage = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.user.displayAvatarURL({ size: 2048, dynamic: true })}`, name: `${interaction.user.tag} (${interaction.user.id})` })
        .setColor(0xFF5C5C)
        .setDescription(`**Member:** ${user} (${user.id})\n**Action:** Kick\n**Reason:** ${reason || "No reason was given for this sanction."} `)
        .setTimestamp();

        interaction.reply({ embeds: [KickMessage] });
    }
}