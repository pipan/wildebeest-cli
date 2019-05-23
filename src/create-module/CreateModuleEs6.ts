import { injectable } from "inversify";
import * as fs from 'fs';
import { Template } from "../template/Template";
import { FileTemplate } from "../template/FileTemplate";

@injectable()
export class CreateModuleEs6
{
    protected indexTemplate: Template;
    protected moduleTemplate: Template;
    protected rootTemplates: Array<{template: Template, fileName: string}>;

    constructor()
    {
        this.indexTemplate = new FileTemplate(this.getTemplatePath("es6/index.template.txt"));
        this.moduleTemplate = new FileTemplate(this.getTemplatePath("es6/module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("es6/package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
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
        fs.writeFileSync(src + "/index.js", this.indexTemplate.render({ModuleName: moduleName}));
        fs.writeFileSync(src + "/" + moduleName + ".js", this.moduleTemplate.render({ModuleName: moduleName}));
        for (let i = 0; i < this.rootTemplates.length; i++) {
            console.info("Creting file: " + this.rootTemplates[i].fileName);
            fs.writeFileSync(folderName + "/" + this.rootTemplates[i].fileName, this.rootTemplates[i].template.render({}));
        }
    }
}