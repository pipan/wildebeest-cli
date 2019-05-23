import { Command } from "../Command";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
import { StringFormater } from "../string-formater/StringFormater";
import { PascalCaseFormater } from "../string-formater/PascalCaseFormater";
export declare class CreateModuleCommand implements Command {
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    protected formater: StringFormater;
    constructor(pascalCaseFormater: PascalCaseFormater);
    exec(args: Array<any>): void;
}
