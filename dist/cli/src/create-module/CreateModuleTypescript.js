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
var template_1 = require("@wildebeest/template");
var CreateModuleTypescript = (function () {
    function CreateModuleTypescript() {
        this.indexTemplate = new template_1.FileTemplate(this.getTemplatePath("ts/index.template.txt"));
        this.moduleTemplate = new template_1.FileTemplate(this.getTemplatePath("ts/module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new template_1.FileTemplate(this.getTemplatePath("ts/package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new template_1.FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
        });
        this.rootTemplates.push({
            template: new template_1.FileTemplate(this.getTemplatePath("ts/jest.template.txt")),
            fileName: 'jest.config.js'
        });
        this.rootTemplates.push({
            template: new template_1.FileTemplate(this.getTemplatePath("ts/tsconfig.template.txt")),
            fileName: 'tsconfig.json'
        });
        this.moduleTestTemplate = new template_1.FileTemplate(this.getTemplatePath("ts/module.test.template.txt"));
    }
    CreateModuleTypescript.prototype.getTemplatePath = function (fileName) {
        return __dirname + "/../../templates/" + fileName;
    };
    CreateModuleTypescript.prototype.create = function (folderName, moduleName) {
        console.info("Creting module: " + folderName);
        fs.mkdirSync(folderName);
        var folders = ['src', 'dist', 'tests'];
        for (var i = 0; i < folders.length; i++) {
            fs.mkdirSync(folderName + "/" + folders[i]);
        }
        var src = folderName + "/src";
        fs.writeFileSync(src + "/index.ts", this.indexTemplate.render({ ModuleName: moduleName }));
        fs.writeFileSync(src + "/" + moduleName + ".ts", this.moduleTemplate.render({ ModuleName: moduleName }));
        for (var i = 0; i < this.rootTemplates.length; i++) {
            console.info("Creting file: " + this.rootTemplates[i].fileName);
            fs.writeFileSync(folderName + "/" + this.rootTemplates[i].fileName, this.rootTemplates[i].template.render({}));
        }
        var tests = folderName + "/tests";
        fs.writeFileSync(tests + "/" + moduleName + ".test.ts", this.moduleTestTemplate.render({ ModuleName: moduleName }));
    };
    CreateModuleTypescript = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CreateModuleTypescript);
    return CreateModuleTypescript;
}());
exports.CreateModuleTypescript = CreateModuleTypescript;
//# sourceMappingURL=CreateModuleTypescript.js.map