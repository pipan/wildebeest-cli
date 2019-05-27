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
var CommandSchema_1 = require("./CommandSchema");
var template_1 = require("@wildebeest/template");
var fs = require("fs");
var MakeCommandCommand = (function () {
    function MakeCommandCommand(formater) {
        this.formater = formater;
        this.schema = new CommandSchema_1.CommandSchema(['commandName']);
        this.fileTemplate = new template_1.FileTemplate(__dirname + "/../templates/ts/command.template.txt");
    }
    MakeCommandCommand.prototype.exec = function (args) {
        var commandArguments = this.schema.parseArgs(args);
        var commandName = commandArguments.get('commandName');
        var commandClassName = this.formater.format(commandName + "-command");
        fs.writeFileSync(commandClassName + ".ts", this.fileTemplate.render({ commandClassName: commandClassName }));
        console.log("%s\x1b[32m%s\x1b[0m", "File created: ", commandClassName + ".ts");
        return 0;
    };
    MakeCommandCommand = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject("StringFormater")), __param(0, inversify_1.named("pascalCase")),
        __metadata("design:paramtypes", [Object])
    ], MakeCommandCommand);
    return MakeCommandCommand;
}());
exports.MakeCommandCommand = MakeCommandCommand;
//# sourceMappingURL=MakeCommandCommand.js.map