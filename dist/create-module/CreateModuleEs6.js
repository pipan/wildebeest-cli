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
var FileTemplate_1 = require("../template/FileTemplate");
var CreateModuleEs6 = (function () {
    function CreateModuleEs6() {
        this.indexTemplate = new FileTemplate_1.FileTemplate(this.getTemplatePath("es6/index.template.txt"));
        this.moduleTemplate = new FileTemplate_1.FileTemplate(this.getTemplatePath("es6/module.template.txt"));
        this.rootTemplates = [];
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("es6/package.json.template.txt")),
            fileName: 'package.json'
        });
        this.rootTemplates.push({
            template: new FileTemplate_1.FileTemplate(this.getTemplatePath("gitignore.template.txt")),
            fileName: '.gitignore'
        });
    }
    CreateModuleEs6.prototype.getTemplatePath = function (fileName) {
        return __dirname + "/../../templates/" + fileName;
    };
    CreateModuleEs6.prototype.create = function (folderName, moduleName) {
        console.info("Creting module: " + folderName);
        fs.mkdirSync(folderName);
        var folders = ['src', 'dist', 'tests'];
        for (var i = 0; i < folders.length; i++) {
            fs.mkdirSync(folderName + "/" + folders[i]);
        }
        var src = folderName + "/src";
        fs.writeFileSync(src + "/index.js", this.indexTemplate.render({ ModuleName: moduleName }));
        fs.writeFileSync(src + "/" + moduleName + ".js", this.moduleTemplate.render({ ModuleName: moduleName }));
        for (var i = 0; i < this.rootTemplates.length; i++) {
            console.info("Creting file: " + this.rootTemplates[i].fileName);
            fs.writeFileSync(folderName + "/" + this.rootTemplates[i].fileName, this.rootTemplates[i].template.render({}));
        }
    };
    CreateModuleEs6 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CreateModuleEs6);
    return CreateModuleEs6;
}());
exports.CreateModuleEs6 = CreateModuleEs6;
//# sourceMappingURL=CreateModuleEs6.js.map