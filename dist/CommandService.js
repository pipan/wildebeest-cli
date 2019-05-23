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
var CommandService = (function () {
    function CommandService() {
        this.commands = new Map();
    }
    CommandService.prototype.addCommand = function (command, handler) {
        this.commands.set(command, handler);
    };
    CommandService.prototype.exec = function (command, args) {
        if (!this.commands.has(command)) {
            console.log("%s\x1b[33m%s\x1b[0m%s", "Command ", command, " not found.");
            return;
        }
        console.log("%s\x1b[34m%s\x1b[0m", "Running command ", command);
        this.commands.get(command).exec(args);
    };
    CommandService = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], CommandService);
    return CommandService;
}());
exports.CommandService = CommandService;
//# sourceMappingURL=CommandService.js.map