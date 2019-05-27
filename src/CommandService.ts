import { Command } from "./Command";
import { injectable } from "inversify";

@injectable()
export class CommandService
{
    protected commands: Map<string, Command>;

    constructor()
    {
        this.commands = new Map();
    }

    public addCommand(command: string, handler: Command)
    {
        this.commands.set(command, handler);
    }

    public exec(command: string, args: Array<any>): number
    {
        if (!this.commands.has(command)) {
            console.log("%s\x1b[33m%s\x1b[0m%s", "Command ", command, " not found.");
            return 1;
        }
        console.log("%s\x1b[34m%s\x1b[0m", "Running command ", command);
        return this.commands.get(command).exec(args);
    }
}