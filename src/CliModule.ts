import { Module } from "@wildebeest/js-modules";
import { Container } from "inversify";
import { CommandService } from "./CommandService";
import { Command } from "./Command";
import { CreateModuleCommand } from "./create-module/CreateModuleCommand";
import { InstallModuleCommand } from "./InstallModuleCommand";
import { StringFormatModule } from '@wildebeest/string';
import { TemplateModule } from '@wildebeest/template';
import { MakeCommandCommand } from "./MakeCommandCommand";

export class CliModule implements Module
{
    getDependencies(): Array<any>
    {
        return [StringFormatModule, TemplateModule];
    }

    register(container: Container): void
    {
        container.bind<CommandService>(CommandService).toSelf().inSingletonScope();
        container.bind<Command>("Command").to(CreateModuleCommand).whenTargetNamed('make:module');
        container.bind<Command>("Command").to(InstallModuleCommand).whenTargetNamed('install:module');
        container.bind<Command>("Command").to(MakeCommandCommand).whenTargetNamed('make:command');
    }

    boot(container: Container): void 
    {
        let commandService: CommandService = container.get(CommandService);
        commandService.addCommand('make:module', container.getNamed("Command", "make:module"));
        commandService.addCommand('install:module', container.getNamed("Command", "install:module"));
        commandService.addCommand('make:command', container.getNamed("Command", "make:command"));
    }
}