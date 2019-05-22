import { Command } from "./Command";
import { injectable } from "inversify";
import * as fs from 'fs';
import { CommandArguments } from "./CommandArguments";
import { CommandSchema } from "./CommandSchema";
import { Template } from "./template/Template";
import { FileTemplate } from "./template/FileTemplate";

@injectable()
export class CreateModuleCommand implements Command
{
    protected schema: CommandSchema;
    protected indexTemplate: Template;
    protected moduleTemplate: Template;
    protected rootTemplates: Array<{template: Template, fileName: string}>;

    constructor()
    {
        this.schema = new CommandSchema(["name"]);
        this.indexTemplate = new FileTemplate(this.getTemplatePath("index.template.txt"));
        this.moduleTemplate = new FileTemplate(this.getTemplatePath("module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("jest.template.txt")),
            fileName: 'jest.config.js'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("tsconfig.template.txt")),
            fileName: 'tsconfig.json'
        });
    }

    private getTemplatePath(fileName: string): string
    {
        return __dirname + "/../templates/" + fileName;
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

        console.info("Creting module: " + folderName);
        fs.mkdirSync(folderName);
        let folders: Array<string> = ['src', 'dist', 'tests'];
        for (let i = 0; i < folders.length; i++) {
            fs.mkdirSync(folderName + "/" + folders[i]);
        }
        let src: string = folderName + "/src";
        let moduleName: string = this.getPascalCase(folderName + "-module");
        fs.writeFileSync(src + "/index.ts", this.indexTemplate.render({ModuleName: moduleName}));
        fs.writeFileSync(src + "/" + moduleName + ".ts", this.moduleTemplate.render({ModuleName: moduleName}));
        for (let i = 0; i < this.rootTemplates.length; i++) {
            console.info("Creting file: " + this.rootTemplates[i].fileName);
            fs.writeFileSync(folderName + "/" + this.rootTemplates[i].fileName, this.rootTemplates[i].template.render({}));
        }
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