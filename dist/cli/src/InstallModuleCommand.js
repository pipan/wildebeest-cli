"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var CommandSchema_1 = require("./CommandSchema");
var fs = require("fs");
var InstallModuleCommand = (function () {
    function InstallModuleCommand() {
        this.schema = new CommandSchema_1.CommandSchema(['moduleClassName', 'pathToModule']);
    }
    InstallModuleCommand.prototype.exec = function (args) {
        var commandArguments = this.schema.parseArgs(args);
        var configFilePath = __dirname + '/../wildebeest.cli.json';
        var configJson = {
            modules: {}
        };
        if (fs.existsSync(configFilePath)) {
            var config = fs.readFileSync(configFilePath).toString();
            configJson = JSON.parse(config);
        }
        var pathToModule = commandArguments.get('pathToModule');
        var moduleName = commandArguments.get('moduleClassName');
        configJson.modules[moduleName] = pathToModule;
        fs.writeFileSync(configFilePath, JSON.stringify(configJson));
        console.info("%s\x1b[32m%s\x1b[0m%s", "Module ", moduleName, " installed.");
        return 0;
    };
    InstallModuleCommand = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], InstallModuleCommand);
    return InstallModuleCommand;
}());
exports.InstallModuleCommand = InstallModuleCommand;
//# sourceMappingURL=InstallModuleCommand.js.map