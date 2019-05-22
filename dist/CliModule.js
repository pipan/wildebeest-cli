"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandService_1 = require("./CommandService");
var CreateModuleCommand_1 = require("./create-module/CreateModuleCommand");
var CliModule = (function () {
    function CliModule() {
    }
    CliModule.prototype.getDependencies = function () {
        return [];
    };
    CliModule.prototype.register = function (container) {
        container.bind(CommandService_1.CommandService).toSelf().inSingletonScope();
        container.bind("Command").to(CreateModuleCommand_1.CreateModuleCommand).whenTargetNamed('create-module');
    };
    CliModule.prototype.boot = function (container) {
        var commandService = container.get(CommandService_1.CommandService);
        commandService.addCommand('create-module', container.getNamed("Command", "create-module"));
    };
    return CliModule;
}());
exports.CliModule = CliModule;
//# sourceMappingURL=CliModule.js.map