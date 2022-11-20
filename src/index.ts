import { Eleceed } from "eleceed";
import "dotenv/config";
import Dash from "web";

(async () => {
    const bot = await new Eleceed().start();
    const dash = new Dash(bot).start();
})();