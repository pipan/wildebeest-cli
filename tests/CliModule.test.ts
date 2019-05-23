import { Application } from '@wildebeest/js-modules';
import { CliModule, CommandService, CreateModuleCommand, PascalCaseFormater } from '../src';
import { InstallModuleCommand } from '../src/InstallModuleCommand';
import { MakeCommandCommand } from '../src/MakeCommandCommand';

let app: Application = new Application();
app.run([CliModule]);

test("register services", () => {
    expect(app.getContainer().get(CommandService)).toBeInstanceOf(CommandService);
    expect(app.getContainer().getNamed("Command", "make:module")).toBeInstanceOf(CreateModuleCommand);
    expect(app.getContainer().getNamed("Command", "install:module")).toBeInstanceOf(InstallModuleCommand);
    expect(app.getContainer().getNamed("Command", "make:command")).toBeInstanceOf(MakeCommandCommand);
    expect(app.getContainer().getNamed("StringFormater", "pascalCase")).toBeInstanceOf(PascalCaseFormater);
})