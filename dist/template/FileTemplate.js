"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var StringTemplate_1 = require("./StringTemplate");
var FileTemplate = (function () {
    function FileTemplate(file) {
        if (!fs.existsSync(file)) {
            throw "File '" + file + "' does not exists.";
        }
        this.stringTemplate = new StringTemplate_1.StringTemplate(fs.readFileSync(file).toString());
    }
    FileTemplate.prototype.render = function (data) {
        return this.stringTemplate.render(data);
    };
    return FileTemplate;
}());
exports.FileTemplate = FileTemplate;
//# sourceMappingURL=FileTemplate.js.map