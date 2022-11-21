import { Eleceed } from "eleceed";
import { Events, Interaction } from "discord.js";

export default class InteractionCreate {
    public event = Events.InteractionCreate;

    public async run(client: Eleceed, interaction: Interaction) {
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


