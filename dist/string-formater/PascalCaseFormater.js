"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var PascalCaseFormater = (function () {
    function PascalCaseFormater() {
    }
    PascalCaseFormater.prototype.normalize = function (value) {
        value = value.replace(new RegExp('[^a-zA-Z]', 'g'), '-');
        var normalized = "";
        for (var i = 0; i < value.length; i++) {
            if (value[i] == value[i].toUpperCase()) {
                normalized += "-";
            }
            normalized += value[i];
        }
        return normalized.toLowerCase();
    };
    PascalCaseFormater.prototype.format = function (value) {
        var normalized = this.normalize(value);
        var pascalCase = "";
        var toUpper = true;
        for (var i = 0; i < normalized.length; i++) {
            if (normalized[i] == '-') {
                toUpper = true;
                continue;
            }
            if (toUpper) {
                pascalCase += normalized[i].toUpperCase();
                toUpper = false;
            }
            else {
                pascalCase += normalized[i];
            }
        }
        return pascalCase;
    };
    PascalCaseFormater = __decorate([
        inversify_1.injectable()
    ], PascalCaseFormater);
    return PascalCaseFormater;
}());
exports.PascalCaseFormater = PascalCaseFormater;
//# sourceMappingURL=PascalCaseFormater.js.map