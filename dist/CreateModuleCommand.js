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
var fs = require("fs");
var CommandSchema_1 = require("./CommandSchema");
var FileTemplate_1 = require("./template/FileTemplate");
var CreateModuleCommand = (function () {
    function CreateModuleCommand() {
        this.schema = new CommandSchema_1.CommandSchema(["name"]);
        this.indexTemplate = new FileTemplate_1.FileTemplate(this.getTemplatePath("index.template.txt"));
        this.moduleTemplate = new FileTemplate_1.FileTemplate(this.getTemplatePath("module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
        });
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("jest.template.txt")),
            fileName: 'jest.config.js'
        });
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("tsconfig.template.txt")),
            fileName: 'tsconfig.json'
        });
    }
    CreateModuleCommand.prototype.getTemplatePath = function (fileName) {
        return __dirname + "/../templates/" + fileName;
    };
    CreateModuleCommand.prototype.exec = function (args) {
        var commandArguments = this.schema.parseArgs(args);
        if (!commandArguments.has("name")) {
            throw "Name of new module is missing.";
        }
        var folderName = commandArguments.get("name");
        if (fs.existsSync(folderName)) {
            throw "Module already exists.";
        }
        console.info("Creting module: " + folderName);
        fs.mkdirSync(folderName);
        var folders = ['src', 'dist', 'tests'];
        for (var i = 0; i < folders.length; i++) {
            fs.mkdirSync(folderName + "/" + folders[i]);
        }
        var src = folderName + "/src";
        var moduleName = this.getPascalCase(folderName + "-module");
        fs.writeFileSync(src + "/index.ts", this.indexTemplate.render({ ModuleName: moduleName }));
        fs.writeFileSync(src + "/" + moduleName + ".ts", this.moduleTemplate.render({ ModuleName: moduleName }));
        for (var i = 0; i < this.rootTemplates.length; i++) {
            console.info("Creting file: " + this.rootTemplates[i].fileName);
            fs.writeFileSync(folderName + "/" + this.rootTemplates[i].fileName, this.rootTemplates[i].template.render({}));
        }
    };
    CreateModuleCommand.prototype.getPascalCase = function (text) {
        text = text.replace(new RegExp('[^a-zA-Z]', 'g'), '-').toLowerCase();
        var pascalCase = "";
        var toUpper = true;
        for (var i = 0; i < text.length; i++) {
            if (text[i] == '-') {
                toUpper = true;
                continue;
            }
            if (toUpper) {
                pascalCase += text[i].toUpperCase();
                toUpper = false;
            }
            else {
                pascalCase += text[i];
            }
        }
        return pascalCase;
    };
    CreateModuleCommand = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CreateModuleCommand);
    return CreateModuleCommand;
}());
exports.CreateModuleCommand = CreateModuleCommand;
//# sourceMappingURL=CreateModuleCommand.js.map