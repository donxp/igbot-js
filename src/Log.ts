import * as config from "config";

export default class Log {

    public static info(message: string) {
        this.log("INFO", message);
    }

    public static warning(message: string) {
        this.log("WARNING", message);
    }

    public static success(message: string) {
        this.log("SUCCESS", message);
    }

    public static error(message: string) {
        this.log("ERROR", message);
    }

    private static log(tag: string, message: string) {
        const logLevel = config.get("log_level");
        const date = new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '');
        const formattedMessage = `[${date}] [${tag}]: ${message}`;

        if(logLevel === "console") {
            console.log(formattedMessage);
        } else if(logLevel === "file") {
            // File implementation
        }
    }
}