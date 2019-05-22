export interface ModuleCreator {
    create(folderName: string, moduleName: string): void;
}
