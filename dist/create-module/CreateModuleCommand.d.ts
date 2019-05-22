import { Command } from "../Command";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
export declare class CreateModuleCommand implements Command {
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    constructor();
    exec(args: Array<any>): void;
    private getPascalCase;
}
