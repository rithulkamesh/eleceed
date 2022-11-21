import { Eleceed } from "eleceed";
import "dotenv/config";
import Dash from "web";

(async () => {
    const bot = await new Eleceed().start();
    new Dash(bot).start();
})();