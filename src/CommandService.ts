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

    public exec(command: string, args: Array<any>): void
    {
        if (!this.commands.has(command)) {
            console.log("%s\x1b[33m%s\x1b[0m%s", "Command ", command, " not found.");
            return;
        }
        console.log("%s\x1b[34m%s\x1b[0m", "Running command ", command);
        this.commands.get(command).exec(args);
    }
}