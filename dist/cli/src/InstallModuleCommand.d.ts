import { Command } from "./Command";
import { CommandSchema } from "./CommandSchema";
export declare class InstallModuleCommand implements Command {
    protected schema: CommandSchema;
    constructor();
    exec(args: any): number;
}
