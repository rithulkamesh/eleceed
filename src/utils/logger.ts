import chalk from "chalk";

export default class Logger {
    /*
    * Custom and more beautiful implementation of a console logger.
    Format: 
    [HH:MM:SS] [TYPE] | [MESSAGE]

    @param {string} message - The message that needs to be displayed in the console.
    
    */
    public static error(message: string) {
        console.log(`[${this.getTime()}] [${chalk.red("ERROR")}] | ${message}`);
    }

    public static info(message: string) {
        console.log(`[${this.getTime()}] [${chalk.blue("INFO")}] | ${message}`);
    }

    public static warn(message: string) {
        console.log(`[${this.getTime()}] [${chalk.yellow("WARN")}] | ${message}`);
    }
    public static success(message: string) {
        console.log(`[${this.getTime()}] [${chalk.green("SUCCESS")}] | ${message}`);
    }

    private static getTime() {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toString().padStart(2, "0")}`;
    }

}