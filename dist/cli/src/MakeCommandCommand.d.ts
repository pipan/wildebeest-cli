import { Command } from "./Command";
import { CommandSchema } from "./CommandSchema";
import { Template } from "@wildebeest/template";
import { StringFormater } from "@wildebeest/string";
export declare class MakeCommandCommand implements Command {
    protected schema: CommandSchema;
    protected fileTemplate: Template;
    protected formater: StringFormater;
    constructor(formater: StringFormater);
    exec(args: any): number;
}
