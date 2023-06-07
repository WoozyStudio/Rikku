const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const Color = require('../../utils/Colors.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server, you can add a reason if you want.")
    .addUserOption((option) => option.setName('target').setDescription('Select the user you want to ban.').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('Attach a reason to the sanction, this step is optional.').setRequired(false))
    .addStringOption((option) => option.setName('appealable').setDescription('Select whether the sanction is appealable or not.').setRequired(false)
        .addChoices(
            {
                name: "Yes", value: "This sanction can be appealed."
            },
            {
                name: "No", value: "This sanction cannot be appealed."
            } 
        )),
    async execute(interaction, client){
        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");
        const appealable = interaction.options.getString("appealable");
        interaction.guild.members.ban(user);  

        const BanMessage = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.user.displayAvatarURL({ size: 2048, dynamic: true })}`, name: `${interaction.user.tag} (${interaction.user.id})` })
        .setColor(Color.Red)
        .setDescription(`**Member:** ${user} (${user.id})\n**Action:** Ban\n**Reason:** ${reason || "No reason was given for this sanction."}\n \n> ${appealable || "This sanction can be appealed."}`)
        .setTimestamp();

        interaction.reply({ embeds: [BanMessage] });
    }
}