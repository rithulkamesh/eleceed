import { Eleceed } from "eleceed";
import { readdirSync } from "fs";
import path from "path";

export default async function loadEvents(client: Eleceed) {
    const events = readdirSync(path.join(__dirname, "..", "events")).filter((file) => file.endsWith(".ts"));
    for (const file of events) {
        let Event = await import(path.join(__dirname, "..", "events", `${file}`));
        Event = new Event.default();
        if (Event.once) {
            client.once(Event.event, async (...args) => await Event.run(client, ...args));
        } else {
            client.on(Event.event, async (...args) => await Event.run(client, ...args));
        }
    }
}