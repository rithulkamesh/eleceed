import { Eleceed } from "eleceed";
import { EmbedBuilder, Events, GuildMember, TextChannel, VoiceChannel } from "discord.js";
import { Embed } from "utils/embed";

export default class GuildMemberAdd {
    public event = Events.GuildMemberAdd;

    public async run(client: Eleceed, member: GuildMember) {
        client.db.member.create({
            data: {
                id: member.id,
            }
        });


        const memCountChannel = client.channels.cache.get("1042079879480475758") as VoiceChannel;
        if (!memCountChannel) return;
        await memCountChannel.setName(`Humans: ${member.guild.memberCount - 1}`);

        const welcomeChannel = client.channels.cache.get("1044282612610506802") as TextChannel;
        const embed = new EmbedBuilder()
            .setDescription(`<:join:1044283866132791458> **${member.user.tag}** has joined the party! There are now ${member.guild.memberCount - 1} members in the server!`)
            .setColor("#00ff00");
        welcomeChannel.send({ embeds: [embed] });

    }
};


