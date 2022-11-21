import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js"

module.exports = {
    data: new SlashCommandBuilder()
        .setName("simjoin")
        .setDescription("Simulate a join event")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction: any) {
        await interaction.client.emit("guildMemberAdd", interaction.member);
        await interaction.reply("Simulated join event", { ephemeral: true });
    }

}