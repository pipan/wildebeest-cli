"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandService_1 = require("./CommandService");
var CreateModuleCommand_1 = require("./create-module/CreateModuleCommand");
var InstallModuleCommand_1 = require("./InstallModuleCommand");
var string_1 = require("@wildebeest/string");
var template_1 = require("@wildebeest/template");
var MakeCommandCommand_1 = require("./MakeCommandCommand");
var CliModule = (function () {
    function CliModule() {
    }
    CliModule.prototype.getDependencies = function () {
        return [string_1.StringFormatModule, template_1.TemplateModule];
    };
    CliModule.prototype.register = function (container) {
        container.bind(CommandService_1.CommandService).toSelf().inSingletonScope();
        container.bind("Command").to(CreateModuleCommand_1.CreateModuleCommand).whenTargetNamed('make:module');
        container.bind("Command").to(InstallModuleCommand_1.InstallModuleCommand).whenTargetNamed('install:module');
        container.bind("Command").to(MakeCommandCommand_1.MakeCommandCommand).whenTargetNamed('make:command');
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