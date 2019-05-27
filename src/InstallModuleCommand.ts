import { injectable } from "inversify";
import { Command } from "./Command";
import { CommandSchema } from "./CommandSchema";
import { CommandArguments } from "./CommandArguments";
import * as fs from 'fs';

@injectable()
export class InstallModuleCommand implements Command
{
    protected schema: CommandSchema;

    constructor()
    {
        this.schema = new CommandSchema(['moduleClassName', 'pathToModule']);
    }

    exec(args: any): number
    {
        let commandArguments: CommandArguments = this.schema.parseArgs(args);
        let configFilePath: string = __dirname + '/../wildebeest.cli.json';
        let configJson: any = {
            modules: {}
        };
        if (fs.existsSync(configFilePath)) {
            let config: string = fs.readFileSync(configFilePath).toString();
            configJson= JSON.parse(config);
        }
        
        let pathToModule: string = commandArguments.get('pathToModule');
        let moduleName: string = commandArguments.get('moduleClassName');
        configJson.modules[moduleName] = pathToModule;
        fs.writeFileSync(configFilePath, JSON.stringify(configJson));
        console.info("%s\x1b[32m%s\x1b[0m%s", "Module ", moduleName, " installed.");
        return 0;
    }
}