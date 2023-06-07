const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const Color = require('../../utils/Colors.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server.")
    .addUserOption((option) => option.setName('id').setDescription('Write the id of the user that you want to unban.').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('Attach a reason to the sanction, this step is optional.').setRequired(false)),
    async execute(interaction, client){
        const user = interaction.options.getUser("id");
        const reason = interaction.options.getString("reason");
        interaction.guild.members.unban(user);  

        const BanMessage = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.user.displayAvatarURL({ size: 2048, dynamic: true })}`, name: `${interaction.user.tag} (${interaction.user.id})` })
        .setColor(Color.Green)
        .setDescription(`**Member:** ${user} (${user.id})\n**Action:** Unban\n**Reason:** ${reason || "No reason was given for this sanction."}`)
        .setTimestamp();

        interaction.reply({ embeds: [BanMessage] });
    }
}