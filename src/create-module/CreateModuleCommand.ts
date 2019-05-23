import { Command } from "../Command";
import { injectable, inject, named } from "inversify";
import * as fs from 'fs';
import { CommandArguments } from "../CommandArguments";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
import { CreateModuleTypescript } from "./CreateModuleTypescript";
import { CreateModuleEs6 } from "./CreateModuleEs6";
import { StringFormater } from "../string-formater/StringFormater";
import { PascalCaseFormater } from "../string-formater/PascalCaseFormater";

@injectable()
export class CreateModuleCommand implements Command
{
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    protected formater: StringFormater;
    
    constructor(@inject("StringFormater") @named("pascalCase") pascalCaseFormater: PascalCaseFormater)
    {
        this.formater = pascalCaseFormater;
        this.schema = new CommandSchema(["name"]);
        this.typeCreators = new Map();
        this.typeCreators.set("ts", new CreateModuleTypescript());
        this.typeCreators.set("es6", new CreateModuleEs6());
    }
    
    exec(args: Array<any>): void
    {
        let commandArguments: CommandArguments = this.schema.parseArgs(args);
        if (!commandArguments.has("name")) {
            throw "Name of new module is missing."
        }
        let folderName: string = commandArguments.get("name");
        if (fs.existsSync(folderName)) {
            throw "Module already exists.";
        }

        let moduleName: string = this.formater.format(folderName + "-module");
        let type: string = "ts";
        if (commandArguments.has("--type")) {
            type = commandArguments.get("--type");
        }
        this.typeCreators.get(type).create(folderName, moduleName);
    }
}