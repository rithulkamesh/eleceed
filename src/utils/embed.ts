import { EmbedBuilder } from "discord.js";

// Extend EmbedBuilder and add a default footer
export class Embed extends EmbedBuilder {
    constructor() {
        super();
        this.setFooter(
            {
                text: "Eleceed"
            }
        );
        this.setTimestamp();
        this.setAuthor({
            name: "https://rithul.dev",
            url: "https://rithul.dev",

        })
        this.setColor("Random")
    }

    public UserLog(user: string, action: string, reason: string) {
        this.setDescription(`**User:** ${user}\n**Action:** ${action}\n**Reason:** ${reason}`);
        this.setColor("#ffd500");
        return this;
    }
}
