import { Eleceed } from "eleceed";
import express from "express";
import Logger from "utils/logger";
import bodyParser from "body-parser";

export default class Dash {
    private app = express();
    private bot: Eleceed;

    constructor(bot: Eleceed) {
        this.app.use(bodyParser.json())
        this.bot = bot;
    }

    public async start() {
        this.app.post("/verify", async (req, res) => {
            if (!req.body || !req.body.id) return res.status(404).send("Cannot POST /verify")
            await this.bot.verify(req.body.id);
            res.send("OK")
        });
        this.app.listen(3000, () => {
            Logger.info("Listening on port 3000");
        });
    }
}
