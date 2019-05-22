import { Template } from "../template/Template";
export declare class CreateModuleTypescript {
    protected indexTemplate: Template;
    protected moduleTemplate: Template;
    protected rootTemplates: Array<{
        template: Template;
        fileName: string;
    }>;
    constructor();
    private getTemplatePath;
    create(folderName: string, moduleName: string): void;
    private getPascalCase;
}
