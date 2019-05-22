import { Module } from "@wildebeest/js-modules";
import { Container } from "inversify";
import { CommandService } from "./CommandService";
import { Command } from "./Command";
import { CreateModuleCommand } from "./CreateModuleCommand";

export class CliModule implements Module
{
    getDependencies(): Array<any>
    {
        return [];
    }

    register(container: Container): void
    {
        container.bind<CommandService>(CommandService).toSelf().inSingletonScope();
        container.bind<Command>("Command").to(CreateModuleCommand).whenTargetNamed('create-module');
    }

    boot(container: Container): void 
    {
        let commandService: CommandService = container.get(CommandService);
        commandService.addCommand('create-module', container.getNamed("Command", "create-module"));
    }
}