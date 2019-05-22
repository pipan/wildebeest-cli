"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringTemplate = (function () {
    function StringTemplate(template) {
        this.template = template;
    }
    StringTemplate.prototype.render = function (data) {
        var result = this.template;
        for (var key in data) {
            result = result.replace(new RegExp("%" + key + "%", 'g'), data[key]);
        }
        return result;
    };
    return StringTemplate;
}());
exports.StringTemplate = StringTemplate;
//# sourceMappingURL=StringTemplate.js.map