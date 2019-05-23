import { injectable } from "inversify";
import * as fs from 'fs';
import { Template } from "../template/Template";
import { FileTemplate } from "../template/FileTemplate";

@injectable()
export class CreateModuleTypescript
{
    protected indexTemplate: Template;
    protected moduleTemplate: Template;
    protected rootTemplates: Array<{template: Template, fileName: string}>;

    constructor()
    {
        this.indexTemplate = new FileTemplate(this.getTemplatePath("ts/index.template.txt"));
        this.moduleTemplate = new FileTemplate(this.getTemplatePath("ts/module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("ts/package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("ts/jest.template.txt")),
            fileName: 'jest.config.js'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("ts/tsconfig.template.txt")),
            fileName: 'tsconfig.json'
        });
    }

    private getTemplatePath(fileName: string): string
    {
        return __dirname + "/../../templates/" + fileName;
    }
    
    create(folderName: string, moduleName: string): void
    {
        console.info("Creting module: " + folderName);
        fs.mkdirSync(folderName);
        let folders: Array<string> = ['src', 'dist', 'tests'];
        for (let i = 0; i < folders.length; i++) {
            fs.mkdirSync(folderName + "/" + folders[i]);
        }
        let src: string = folderName + "/src";
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