import { PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js"
import { Embed } from "../../utils/embed"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quarantine")
        .setDescription("Add a user into quarantine")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ModerateMembers)
        .addSubcommand(subcommand =>
            subcommand
                .setName("add")
                .setDescription("Add a user into quarantine")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("The user to quarantine")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("reason")
                        .setDescription("The reason for quarantining the user")
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove a user from quarantine")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("The user to remove from quarantine")
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction: any) {
        const logChannel = interaction.guild.channels.cache.get("1042058364949106698");
        if (interaction.options.getSubcommand() === "add") {
            const user: User = interaction.options.getUser("user");
            const reason = interaction.options.getString("reason");
            await interaction.guild.members.cache.get(user.id).roles.add("1042058363296559214");
            interaction.reply({ content: `Added ${user} to quarantine`, ephemeral: true });
            const embed = new Embed().UserLog(user.tag, "User Quarantined", reason ? reason : "N/A");
            logChannel.send({ embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "remove") {
            const user = interaction.options.getUser("user");
            await interaction.guild.members.cache.get(user.id).roles.remove("1042058363296559214");
            const embed = new Embed().UserLog(user.tag, "User un-quarantined", "N/A");
            logChannel.send({ embeds: [embed] });
            await interaction.reply({ content: `Removed ${user} from quarantine`, ephemeral: true });
        }

    }

}
