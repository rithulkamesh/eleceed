import { Eleceed } from "eleceed";
import { readdirSync } from "fs";
import path from "path";
import { REST, Routes } from "discord.js";
import Logger from "utils/logger";

export default async function loadCommands(client: Eleceed) {
    const commands = [];
    for (const i of readdirSync(path.join(__dirname, "..", "commands"))) {
        for (const j of readdirSync(path.join(__dirname, "..", "commands", i))) {
            const command = await import(`../commands/${i}/${j}`);
            await client.commands.set(command.data.name, command);
            Logger.info("Found command " + command.data.name);
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);
    await rest.put(Routes.applicationCommands(client.user!.id), { body: commands });
    Logger.success("Loaded commands");

}