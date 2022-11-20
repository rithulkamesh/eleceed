import { Eleceed } from "eleceed";
import express from "express";

export default class Dash {
    private app = express();
    private bot: Eleceed;

    constructor(bot: Eleceed) {
        this.bot = bot;
    }

    public async start() {
        this.app.get("/post", (req, res) => {
            res.send("Hello World!");
            this.bot.verify();
        });
        this.app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    }
}