import { Command } from "../Command";
import { injectable } from "inversify";
import * as fs from 'fs';
import { CommandArguments } from "../CommandArguments";
import { CommandSchema } from "../CommandSchema";
import { ModuleCreator } from "./ModuleCreator";
import { CreateModuleTypescript } from "./CreateModuleTypescript";
import { CreateModuleEs6 } from "./CreateModuleEs6";

@injectable()
export class CreateModuleCommand implements Command
{
    protected schema: CommandSchema;
    protected typeCreators: Map<string, ModuleCreator>;
    
    constructor()
    {
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

        let moduleName: string = this.getPascalCase(folderName + "-module");
        let type: string = "ts";
        if (commandArguments.has("--type")) {
            type = commandArguments.get("--type");
        }
        this.typeCreators.get(type).create(folderName, moduleName);
    }

    private getPascalCase(text: string): string
    {
        text = text.replace(new RegExp('[^a-zA-Z]', 'g'), '-').toLowerCase();
        let pascalCase: string = "";
        let toUpper: boolean = true;
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '-') {
                toUpper = true;
                continue;
            }
            if (toUpper) {
                pascalCase += text[i].toUpperCase();
                toUpper = false;
            } else {
                pascalCase += text[i];   
            }
        }
        return pascalCase;
    }
}