"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandService_1 = require("./CommandService");
var CreateModuleCommand_1 = require("./create-module/CreateModuleCommand");
var InstallModuleCommand_1 = require("./InstallModuleCommand");
var PascalCaseFormater_1 = require("./string-formater/PascalCaseFormater");
var MakeCommandCommand_1 = require("./MakeCommandCommand");
var CliModule = (function () {
    function CliModule() {
    }
    CliModule.prototype.getDependencies = function () {
        return [];
    };
    CliModule.prototype.register = function (container) {
        container.bind(CommandService_1.CommandService).toSelf().inSingletonScope();
        container.bind("Command").to(CreateModuleCommand_1.CreateModuleCommand).whenTargetNamed('make:module');
        container.bind("Command").to(InstallModuleCommand_1.InstallModuleCommand).whenTargetNamed('install:module');
        container.bind("Command").to(MakeCommandCommand_1.MakeCommandCommand).whenTargetNamed('make:command');
        container.bind("StringFormater").to(PascalCaseFormater_1.PascalCaseFormater).inSingletonScope().whenTargetNamed("pascalCase");
    };
    CliModule.prototype.boot = function (container) {
        var commandService = container.get(CommandService_1.CommandService);
        commandService.addCommand('make:module', container.getNamed("Command", "make:module"));
        commandService.addCommand('install:module', container.getNamed("Command", "install:module"));
        commandService.addCommand('make:command', container.getNamed("Command", "make:command"));
    };
    return CliModule;
}());
exports.CliModule = CliModule;
//# sourceMappingURL=CliModule.js.map