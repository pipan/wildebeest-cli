import { Application } from '@wildebeest/js-modules';
import * as fs from "fs";
import { CommandService } from './CommandService';
import { CliModule } from './CliModule';

let errors: number = 0;

async function getModuleClasses(): Promise<Array<any>>
{
    let cliConfig: any = getConfig();
    let appModules: Array<any> = [CliModule];
    for (let key in cliConfig.modules) {
        try {
            appModules.push(await dynamicImport(key, cliConfig.modules[key]));
        } catch (e) {
            errors++;
            console.log("%s\x1b[33m%s\x1b[0m%s\x1b[33m%s\x1b[0m", "Cannot find module ", key, " in path ", cliConfig.modules[key]);
        }
    }
    return appModules;
}

function getConfig(): any
{
    let config = {modules: {}};
    let configFilePath: string = __dirname + '/../wildebeest.cli.json';
    if (fs.existsSync(configFilePath)) {
        let fileData: any = fs.readFileSync(configFilePath);
        config = JSON.parse(fileData);
    } else {
        throw new Error("Config file not found '" + configFilePath + "'.");
    }
    return config;
}

async function dynamicImport(className: string, path: string): Promise<any>
{
    let loadedClass: any = await import(path).then((classes: any) => {
        return classes[className];
    })
    return loadedClass;
}

export async function run(args: Array<any>)
{
    console.log("Loading CLI ...");
    let app = new Application();
    let appModules: Array<any> = await getModuleClasses();
    app.run(appModules);
    if (errors > 0) {
        console.log("%s\x1b[32m%s\x1b[0m%s\x1b[33m%s\x1b[0m", "CLI ", "loaded", " with ", errors + " errors");
    } else {
        console.log("%s\x1b[32m%s\x1b[0m", "CLI ", "loaded");
    }
    let commandService: CommandService = app.getContainer().get(CommandService);
    commandService.exec(args[2], args.slice(3));
}