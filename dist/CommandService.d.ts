import { Command } from "./Command";
export declare class CommandService {
    protected commands: Map<string, Command>;
    constructor();
    addCommand(command: string, handler: Command): void;
    exec(command: string, args: Array<any>): void;
}
