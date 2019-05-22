import { Command } from "./Command";
import { CommandSchema } from "./CommandSchema";
import { Template } from "./template/Template";
export declare class CreateModuleCommand implements Command {
    protected schema: CommandSchema;
    protected indexTemplate: Template;
    protected moduleTemplate: Template;
    protected rootTemplates: Array<{
        template: Template;
        fileName: string;
    }>;
    constructor();
    private getTemplatePath;
    exec(args: Array<any>): void;
    private getPascalCase;
}
