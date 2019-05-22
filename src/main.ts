import { Application } from '@wildebeest/js-modules';
import * as fs from "fs";
import { CommandService } from './CommandService';
import { CliModule } from './CliModule';

let app: Application;

function getApp(): Application
{
    app = new Application();
    // let modules = getConfig();
    let appModules: Array<any> = [CliModule];
    // let dynamicLoader: Array<Promise<any>> = [];
    // for (let key in modules) {
    //     dynamicLoader.push(
    //         dynamicImport(key, modules[key]).then((m: any) => {
    //             appModules.push(m);
    //         })
    //     );
        
    // }
    // return new Promise((resolve, reject) => {
    //     Promise.all(dynamicLoader).then((e: any) => {
    //         app.run(appModules);
    //         resolve(app);
    //     }).catch((e: any) => {
    //         console.error("CLI main.ts getApp function");
    //         console.error(e);
    //         reject(e);
    //     });
    // });
    app.run(appModules);
    return app;
}

function getConfig(): Array<string>
{
    let modules = [];
    if (fs.existsSync('wildebeest.cli.json')) {
        let fileData: any = fs.readFileSync('wildebeest.cli.json');
        let config: any = JSON.parse(fileData);
        modules = config.modules;
    } else {
        throw "Config file not found";
    }
    return modules;
}

function dynamicImport(className: string, path: string): Promise<any>
{
    return import(path).then((classes: any) => {
        return classes[className];
    })
    .catch((e: any) => {
        console.error("CLI main.ts dynamicImport function");
        console.error(e);
    });
}

export function run(args: Array<any>)
{
    let app: Application = getApp()
    let commandService: CommandService = app.getContainer().get(CommandService);
    commandService.exec(args[2], args.slice(3));
}