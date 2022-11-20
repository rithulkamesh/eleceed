import { EmbedBuilder } from "discord.js";

// Extend EmbedBuilder and add a default footer
export class Embed extends EmbedBuilder {
    constructor() {
        super();
        this.setFooter(
            {
                text: "Eleceed",
                iconURL: "https://cdn.discordapp.com/avatars/1043848355433951273/8b0b2b2b0b2b0b2b0b2b0b2b0b2b0b2b.png",
            }
        );
        this.setTimestamp();
        this.setAuthor({
            name: "https://rithul.dev",
            url: "https://rithul.dev",

        })
    }
}
