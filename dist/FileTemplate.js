"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileTemplate = (function () {
    function FileTemplate(template) {
        this.template = template;
    }
    FileTemplate.prototype.render = function (data) {
        var result = this.template;
        for (var key in data) {
            result = result.replace(new RegExp("%" + key + "%", 'g'), data[key]);
        }
        return result;
    };
    return FileTemplate;
}());
exports.FileTemplate = FileTemplate;
//# sourceMappingURL=FileTemplate.js.map