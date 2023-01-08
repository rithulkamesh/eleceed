import { Eleceed } from "eleceed";
import { Events, GuildMember, Interaction } from "discord.js";

export default class InteractionCreate {
    public event = Events.InteractionCreate;

    public async run(client: Eleceed, interaction: Interaction) {

        // Check if the interaction is a button
        if (interaction.isButton()) {
            // Get the button ID
            const buttonID = interaction.customId;
            // Get the button from the database
            const button = await client.db.reactionRoles.findFirst({ where: { buttonID } });
            // Check if the button exists
            if (button != null) {
                // Get the role
                const role = interaction.guild?.roles.cache.get(button.role);
                // Check if the role exists
                if (role != null) {
                    // Check if the user has the role
                    if ((interaction.member as GuildMember).roles.cache.has(role.id)) {
                        // Remove the role
                        (interaction.member as GuildMember).roles.remove(role);
                        // Reply to the button
                        interaction.reply({ content: `Removed the ${role.name} role!`, ephemeral: true });
                    } else {
                        // Add the role
                        (interaction.member as GuildMember).roles.add(role);
                        // Reply to the button
                        interaction.reply({ content: `Added the ${role.name} role!`, ephemeral: true });
                    }
                }
            }

        }

        if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            //@ts-ignore
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};


