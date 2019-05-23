import { injectable, inject, named } from "inversify";
import { Command } from "./Command";
import { CommandArguments } from "./CommandArguments";
import { CommandSchema } from "./CommandSchema";
import { Template } from "./template/Template";
import { FileTemplate } from "./template/FileTemplate";
import * as fs from 'fs';
import { StringFormater } from "./string-formater/StringFormater";

@injectable()
export class MakeCommandCommand implements Command
{
    protected schema: CommandSchema;
    protected fileTemplate: Template;
    protected formater: StringFormater;

    constructor(@inject("StringFormater") @named("pascalCase") formater: StringFormater)
    {
        this.formater = formater;
        this.schema = new CommandSchema(['commandName']);
        this.fileTemplate = new FileTemplate(__dirname + "/../templates/ts/command.template.txt");
    }

    exec(args: any): void
    {
        let commandArguments: CommandArguments = this.schema.parseArgs(args);
        let commandName: string = commandArguments.get('commandName');
        let commandClassName: string = this.formater.format(commandName + "-command");
        fs.writeFileSync(commandClassName + ".ts", this.fileTemplate.render({commandClassName: commandClassName}));
        console.log("%s\x1b[32m%s\x1b[0m", "File created: ", commandClassName + ".ts");
    }
}