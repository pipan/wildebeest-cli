"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_modules_1 = require("@wildebeest/js-modules");
var fs = require("fs");
var CommandService_1 = require("./CommandService");
var CliModule_1 = require("./CliModule");
var app;
function getApp() {
    app = new js_modules_1.Application();
    var appModules = [CliModule_1.CliModule];
    app.run(appModules);
    return app;
}
function getConfig() {
    var modules = [];
    if (fs.existsSync('wildebeest.cli.json')) {
        var fileData = fs.readFileSync('wildebeest.cli.json');
        var config = JSON.parse(fileData);
        modules = config.modules;
    }
    else {
        throw "Config file not found";
    }
    return modules;
}
function dynamicImport(className, path) {
    return Promise.resolve().then(function () { return require(path); }).then(function (classes) {
        return classes[className];
    })
        .catch(function (e) {
        console.error("CLI main.ts dynamicImport function");
        console.error(e);
    });
}
function run(args) {
    var app = getApp();
    var commandService = app.getContainer().get(CommandService_1.CommandService);
    commandService.exec(args[2], args.slice(3));
}
exports.run = run;
//# sourceMappingURL=main.js.map