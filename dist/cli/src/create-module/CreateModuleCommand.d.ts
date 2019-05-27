import { Command } from "../Command";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
import { StringFormater } from "@wildebeest/string";
import { Template } from "@wildebeest/template/src/Template";
export declare class CreateModuleCommand implements Command {
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    protected travisTemplate: Template;
    protected formater: StringFormater;
    constructor(pascalCaseFormater: StringFormater);
    exec(args: Array<any>): number;
}
