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
            return;
        }
        console.log(args);
        this.commands.get(command).exec(args);
    }
}