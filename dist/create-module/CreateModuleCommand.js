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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var fs = require("fs");
var CommandSchema_1 = require("../CommandSchema");
var CreateModuleTypescript_1 = require("./CreateModuleTypescript");
var CreateModuleEs6_1 = require("./CreateModuleEs6");
var PascalCaseFormater_1 = require("../string-formater/PascalCaseFormater");
var CreateModuleCommand = (function () {
    function CreateModuleCommand(pascalCaseFormater) {
        this.formater = pascalCaseFormater;
        this.schema = new CommandSchema_1.CommandSchema(["name"]);
        this.typeCreators = new Map();
        this.typeCreators.set("ts", new CreateModuleTypescript_1.CreateModuleTypescript());
        this.typeCreators.set("es6", new CreateModuleEs6_1.CreateModuleEs6());
    }
    CreateModuleCommand.prototype.exec = function (args) {
        var commandArguments = this.schema.parseArgs(args);
        if (!commandArguments.has("name")) {
            throw "Name of new module is missing.";
        }
        var folderName = commandArguments.get("name");
        if (fs.existsSync(folderName)) {
            throw "Module already exists.";
        }
        var moduleName = this.formater.format(folderName + "-module");
        var type = "ts";
        if (commandArguments.has("--type")) {
            type = commandArguments.get("--type");
        }
        this.typeCreators.get(type).create(folderName, moduleName);
    };
    CreateModuleCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("StringFormater")), __param(0, inversify_1.named("pascalCase")),
        __metadata("design:paramtypes", [PascalCaseFormater_1.PascalCaseFormater])
    ], CreateModuleCommand);
    return CreateModuleCommand;
}());
exports.CreateModuleCommand = CreateModuleCommand;
//# sourceMappingURL=CreateModuleCommand.js.map