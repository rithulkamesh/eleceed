import { ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, SlashCommandBuilder, SlashCommandRoleOption, SlashCommandStringOption } from "discord.js";
import { Eleceed } from "eleceed";
import { Embed } from "utils/embed";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buttonrole")
        .setDescription("Create a button role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption((option: SlashCommandRoleOption) =>
            option
                .setName("role")
                .setDescription("The role to add")
                .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
            option
                .setName("emoji")
                .setDescription("The emoji to use")
                .setRequired(true)
        )
        .addStringOption((option: SlashCommandStringOption) =>
            option
                .setName("message")
                .setDescription("The message to send")
                .setRequired(true)
        )
    ,
    async execute(client: Eleceed, interaction: any) {
        const role = interaction.options.getRole("role");
        const message = interaction.options.getString("message");
        let buttonID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const check = client.db.reactionRoles.findFirst({ where: { buttonID } })
        while (check != null) {
            buttonID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
        client.db.reactionRoles.create({
            data: {
                buttonID,
                role: role.id,
                emoji: interaction.options.getString("emoji"),
                active: true
            }
        });
        const embed = new Embed()
            .setDescription(message)
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(buttonID)
                    .setLabel(role.name)
                    .setStyle(1)
                    .setEmoji(interaction.options.getString("emoji"))
            )


        await interaction.channel.send({ embeds: [embed], components: [row] });

        // Add a button to the message

    }
}