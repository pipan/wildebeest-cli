import { Command } from "./Command";
import { CommandSchema } from "./CommandSchema";
import { Template } from "./template/Template";
import { StringFormater } from "./string-formater/StringFormater";
export declare class MakeCommandCommand implements Command {
    protected schema: CommandSchema;
    protected fileTemplate: Template;
    protected formater: StringFormater;
    constructor(formater: StringFormater);
    exec(args: any): void;
}
