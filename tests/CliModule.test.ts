import { Application } from '@wildebeest/js-modules';
import { CliModule, CommandService, CreateModuleCommand } from '../src';
import { InstallModuleCommand } from '../src/InstallModuleCommand';
import { MakeCommandCommand } from '../src/MakeCommandCommand';

let app: Application = new Application();
app.run([CliModule]);

test("register services", () => {
    expect(app.getContainer().get(CommandService)).toBeInstanceOf(CommandService);
    expect(app.getContainer().getNamed("Command", "make:module")).toBeInstanceOf(CreateModuleCommand);
    expect(app.getContainer().getNamed("Command", "install:module")).toBeInstanceOf(InstallModuleCommand);
    expect(app.getContainer().getNamed("Command", "make:command")).toBeInstanceOf(MakeCommandCommand);
});

test("run make:module test", () => {
    let commandService: CommandService = app.getContainer().get(CommandService);
    expect(commandService.exec("make:module", ["test"])).toBe(0);
});

test("run make:module missing component name", () => {
    let commandService: CommandService = app.getContainer().get(CommandService);
    expect(() => {
        commandService.exec("make:module", []);
    }).toThrow();
});