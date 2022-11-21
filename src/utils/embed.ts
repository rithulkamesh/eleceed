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
            name: "Moderation",
            url: "https://rithul.dev",
            iconURL: "https://cdn.discordapp.com/icons/1041770531193638974/59e92e5fe6a3a53ff0c526944494f280.webp"

        })
        this.setColor("Random")
    }

    public UserLog(user: string, action: string, reason: string) {
        this.setDescription(`**User:** ${user}\n**Action:** ${action}\n**Reason:** ${reason}`);
        this.setColor("#ffd500");
        return this;
    }

    public Log(action: string, desc: string) {
        this.setTitle(action);
        this.setDescription(desc);
        this.setColor("#00ff00");
        return this;
    }
}
