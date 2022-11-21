import { Message, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Embed } from "utils/embed";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge messages")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("The amount of messages to purge")
                .setRequired(true)
        )
    ,
    async execute(interaction: any) {
        const amount = interaction.options.getInteger("amount");
        await interaction.channel.bulkDelete(amount);
        const embed = new Embed().Log("Purge", `Purged ${amount} messages`);
        const logChannel = interaction.guild.channels.cache.get("1042058364949106698");
        logChannel.send({ embeds: [embed] });
        await interaction.reply({
            content: `Purged ${amount} messages`,
            ephemeral: true
        }) as Message

    }
}