import { Command } from "../Command";
import { injectable, inject, named } from "inversify";
import * as fs from 'fs';
import { CommandArguments } from "../CommandArguments";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
import { CreateModuleTypescript } from "./CreateModuleTypescript";
import { CreateModuleEs6 } from "./CreateModuleEs6";
import { StringFormater } from "@wildebeest/string";
import { Template } from "@wildebeest/template/src/Template";
import { FileTemplate } from "@wildebeest/template";

@injectable()
export class CreateModuleCommand implements Command
{
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    protected travisTemplate: Template;
    protected formater: StringFormater;
    
    constructor(@inject("StringFormater") @named("pascalCase") pascalCaseFormater: StringFormater)
    {
        this.formater = pascalCaseFormater;
        this.schema = new CommandSchema(["name"]);
        this.typeCreators = new Map();
        this.typeCreators.set("ts", new CreateModuleTypescript());
        this.typeCreators.set("es6", new CreateModuleEs6());
        this.travisTemplate = new FileTemplate(__dirname + "/../../templates/travis.template.txt");
    }
    
    exec(args: Array<any>): number
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
        if (commandArguments.has("--travis")) {
            fs.writeFileSync(folderName + "/.travis.yml", this.travisTemplate.render({}));
        }
        return 0;
    }
}